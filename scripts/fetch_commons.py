#!/usr/bin/env python3
"""Fetch freely-licensed images from Wikimedia Commons.

Two modes (Commons only hosts free content — anything returned is CC / PD):

  search   : stdin = JSON [[id, query], ...]
             -> writes candidates JSON {id: [{i,title,width,license,thumburl,mime}]}
             -> prints a scannable candidate list to stderr for human selection

  download : stdin = JSON [[id, thumburl, ext], ...]
             -> downloads each thumburl to <outdir>/<id><ext>
"""
import json, sys, os, time, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "vancouver-made-hall-of-fame/1.0 (research reference gallery; contact feelmoreplants@gmail.com)"

def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def candidates(query, limit=8, min_w=500):
    params = {
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": query, "gsrnamespace": "6", "gsrlimit": str(limit),
        "prop": "imageinfo", "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": "1500",
    }
    data = api_get(params)
    pages = (data.get("query") or {}).get("pages") or {}
    items = sorted(pages.values(), key=lambda p: p.get("index", 999))
    out = []
    for p in items:
        ii = (p.get("imageinfo") or [None])[0]
        if not ii or ii.get("mime") not in ("image/jpeg", "image/png"):
            continue
        if ii.get("width", 0) < min_w:
            continue
        meta = ii.get("extmetadata", {})
        out.append({
            "title": p.get("title", "").replace("File:", ""),
            "width": ii.get("width"), "mime": ii.get("mime"),
            "thumburl": ii.get("thumburl"),
            "license": (meta.get("LicenseShortName", {}) or {}).get("value", ""),
            "source": ii.get("descriptionurl"),
        })
    return out

def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)

def main():
    mode = sys.argv[1]
    if mode == "search":
        out_json = sys.argv[2]
        queries = json.load(sys.stdin)
        result = {}
        for _id, query in queries:
            try:
                cands = candidates(query)
            except Exception as e:
                cands = []
                print(f"! {_id}: {e}", file=sys.stderr)
            result[_id] = cands
            print(f"\n=== {_id}  ({query})", file=sys.stderr)
            if not cands:
                print("   (no candidates)", file=sys.stderr)
            for i, c in enumerate(cands):
                print(f"   [{i}] {c['width']}px {c['license'][:12]:12} {c['title'][:70]}", file=sys.stderr)
        with open(out_json, "w") as f:
            json.dump(result, f, indent=2)
        print(f"\nwrote {out_json}", file=sys.stderr)
    elif mode == "download":
        outdir = sys.argv[2]
        manifest_path = sys.argv[3]
        os.makedirs(outdir, exist_ok=True)
        sel = json.load(sys.stdin)  # [[id, thumburl, ext], ...]
        manifest = {}
        for _id, url, ext in sel:
            dest = os.path.join(outdir, _id + ext)
            try:
                n = download(url, dest)
                manifest[_id] = {"ok": True, "file": _id + ext, "bytes": n}
                print(f"  + {_id}{ext} {n//1024}KB", file=sys.stderr)
            except Exception as e:
                manifest[_id] = {"ok": False, "error": str(e)}
                print(f"  ! {_id}: {e}", file=sys.stderr)
            time.sleep(1.5)  # respect Wikimedia rate limits
        with open(manifest_path, "w") as f:
            json.dump(manifest, f, indent=2)
        ok = sum(1 for v in manifest.values() if v.get("ok"))
        print(f"\nDONE: {ok}/{len(sel)} -> {outdir}", file=sys.stderr)

if __name__ == "__main__":
    main()
