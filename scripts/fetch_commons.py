#!/usr/bin/env python3
"""Fetch freely-licensed images from Wikimedia Commons by search query.

For each (id, query) it asks the Commons API for the top image files, picks the
first usable raster (jpg/png, wide enough), downloads a ~1500px thumbnail, and
records the licence + source page. Commons only hosts free content, so anything
returned is CC / PD / similar. Prints a JSON manifest to stdout.
"""
import json, sys, os, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "vancouver-made-hall-of-fame/1.0 (research reference gallery; contact feelmoreplants@gmail.com)"

def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def find_image(query, min_w=600):
    params = {
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": query, "gsrnamespace": "6", "gsrlimit": "10",
        "prop": "imageinfo", "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": "1500",
    }
    data = api_get(params)
    pages = (data.get("query") or {}).get("pages") or {}
    # search keeps order via index
    items = sorted(pages.values(), key=lambda p: p.get("index", 999))
    for p in items:
        ii = (p.get("imageinfo") or [None])[0]
        if not ii:
            continue
        mime = ii.get("mime", "")
        if mime not in ("image/jpeg", "image/png"):
            continue
        if ii.get("width", 0) < min_w:
            continue
        meta = ii.get("extmetadata", {})
        return {
            "title": p.get("title"),
            "thumburl": ii.get("thumburl"),
            "descriptionurl": ii.get("descriptionurl"),
            "width": ii.get("width"),
            "mime": mime,
            "license": (meta.get("LicenseShortName", {}) or {}).get("value", ""),
            "artist_html": (meta.get("Artist", {}) or {}).get("value", ""),
        }
    return None

def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)

def main():
    # args: outdir manifest.json  (queries read from stdin as JSON list of [id, query])
    outdir = sys.argv[1]
    manifest_path = sys.argv[2]
    os.makedirs(outdir, exist_ok=True)
    queries = json.load(sys.stdin)
    manifest = {}
    for _id, query in queries:
        try:
            hit = find_image(query)
        except Exception as e:
            print(f"  ! {_id}: API error {e}", file=sys.stderr)
            manifest[_id] = {"ok": False, "error": str(e), "query": query}
            continue
        if not hit or not hit["thumburl"]:
            print(f"  - {_id}: NO HIT  ({query})", file=sys.stderr)
            manifest[_id] = {"ok": False, "query": query}
            continue
        ext = ".png" if hit["mime"] == "image/png" else ".jpg"
        fname = _id + ext
        try:
            n = download(hit["thumburl"], os.path.join(outdir, fname))
        except Exception as e:
            print(f"  ! {_id}: download error {e}", file=sys.stderr)
            manifest[_id] = {"ok": False, "error": str(e), "query": query}
            continue
        manifest[_id] = {
            "ok": True, "file": fname, "bytes": n,
            "license": hit["license"], "source": hit["descriptionurl"],
            "commons_title": hit["title"], "query": query,
        }
        print(f"  + {_id}: {fname} {n//1024}KB [{hit['license']}]  <- {hit['title']}", file=sys.stderr)
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    ok = sum(1 for v in manifest.values() if v.get("ok"))
    print(f"\nDONE: {ok}/{len(queries)} downloaded -> {outdir}", file=sys.stderr)

if __name__ == "__main__":
    main()
