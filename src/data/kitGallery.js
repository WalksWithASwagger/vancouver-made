// Best Kits — a hall of fame of the world's greatest jersey designs, protest and
// otherwise. Companion to hallOfFame.js; rendered as the second tab on the same
// page. Same entry shape. Images are Wikimedia Commons CC/PD (kit/match/museum
// photos); a few rights-locked icons (Mexico '98 Aztec, Arsenal "bruised banana",
// USA '94 denim) remain reference cards that link to source.

export const categories = [
  { id: 'intl-classics',  label: 'International Classics', blurb: 'National kits that became flags.' },
  { id: 'club-icons',     label: 'Club Icons',            blurb: 'The crests you can draw from memory.' },
  { id: 'keeper-weird',   label: 'Goalkeeper & Weird',    blurb: 'The maximalists. The outliers.' },
  { id: 'protest-kits',   label: 'Protest & Activist',    blurb: 'The shirt as a statement.' },
  { id: 'modern-fashion', label: 'Modern & Fashion',      blurb: 'When kits became culture.' },
]

const KG = '/kit-gallery'
const HOF = '/hall-of-fame'

export const entries = [
  // ── INTERNATIONAL CLASSICS ────────────────────────────────────────────────
  {
    id: 'kg-brazil-1970', title: 'Brazil 1970 — Canarinho', category: 'intl-classics', year: '1970',
    src: `${KG}/kit-brazil-1970.jpg`, rights: 'CC BY-SA 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Museu_do_Futebol,_Camisa_sele%C3%A7%C3%A3o_brasileira_Pel%C3%A9_(1970).jpg',
    why: 'Pelé’s actual 1970 shirt. Yellow + green trim so total it replaced the flag — the most photographed kit ever made.',
    tags: ['canarinho', 'icon', 'museum'],
  },
  {
    id: 'kg-netherlands-1988', title: 'Netherlands 1988 — Geometric Orange', category: 'intl-classics', year: '1988',
    src: `${KG}/kit-netherlands-1988.jpg`, rights: 'CC0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:EK_voetbal_in_West_Duitsland;_Nederland_tegen_Ierland_1_Van_Basten,_Rijkaard,_R._Koeman,_E._Koeman,_Gullit_en_Van_Breukelen.jpg',
    why: 'Van Basten’s Euro ’88 winners in adidas’ jagged tonal geometry — the kit that made abstract pattern a default move for a decade.',
    tags: ['adidas', 'pattern', 'euro88'],
  },
  {
    id: 'kg-argentina-1986', title: 'Argentina 1986 — Maradona’s Albiceleste', category: 'intl-classics', year: '1986',
    src: `${KG}/kit-argentina-1986.jpg`, rights: 'Public domain — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Giusti_maradona_copa_andas.jpg',
    why: 'The sky-blue-and-white stripes Maradona lifted the cup in. A national flag turned into a shirt, carried on shoulders.',
    tags: ['albiceleste', 'maradona', 'stripes'],
  },
  {
    id: 'kg-croatia-1998', title: 'Croatia — The Checkerboard', category: 'intl-classics', year: '1998',
    src: `${KG}/kit-croatia-1998.jpg`, rights: 'CC BY 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Croatia%27s_post-match_huddle_after_the_2018_FIFA_World_Cup_Final.jpg',
    why: 'The red-and-white šahovnica draped over the shoulders — a national symbol worn whole. Debuted 1998, still unmistakable.',
    tags: ['checkerboard', 'flag', 'identity'],
  },
  {
    id: 'kg-italy-1990', title: 'Italy 1990 — Azzurri', category: 'intl-classics', year: '1990',
    src: `${KG}/kit-italy-1990.jpg`, rights: 'CC BY 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Maglia_di_toto_schillaci_indossata_in_italia-svizzera_il_31-03-1990,_02.JPG',
    why: 'Schillaci’s actual Italia ’90 shirt. Deep azzurro, clean numerals — the host kit of the most stylish World Cup ever staged.',
    tags: ['azzurri', 'italia90', 'museum'],
  },
  {
    id: 'kg-cameroon-1990', title: 'Cameroon — Indomitable Lions', category: 'intl-classics', year: '1990',
    src: `${KG}/kit-cameroon.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Puma_Cameroon_national_football_team_home_jersey.JPG',
    why: 'Green, red and gold worn by the side that stunned Italia ’90 — and later the sleeveless kit FIFA banned, forcing the undershirt era.',
    tags: ['africa', 'green', 'banned'],
  },
  {
    id: 'kg-zaire-1974', title: 'Zaire 1974 — The Leopards', category: 'intl-classics', year: '1974',
    src: `${KG}/kit-zaire-1974.jpg`, rights: 'CC BY-SA 3.0 de — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-N0622-0031,_Fu%C3%9Fball-WM,_Zaire_-_Brasilien_0-3.jpg',
    why: 'First Black African nation at a World Cup, green with a leopard-paw crest. The political backstory made the shirt a document of its moment.',
    tags: ['history', 'africa', 'crest'],
  },
  {
    id: 'kg-japan', title: 'Japan — Samurai Blue', category: 'intl-classics', year: '1998',
    src: `${KG}/kit-japan-1998.jpg`, rights: 'CC BY 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Japan_national_team_players_huddling_in_Columbus.jpg',
    why: 'A blue so specific it got a name. Japan’s kits turned origami, waves and flame into recurring graphic language.',
    tags: ['samurai-blue', 'graphic'],
  },
  {
    id: 'kg-jamaica', title: 'Jamaica — Reggae Boyz', category: 'intl-classics', year: '1998',
    src: `${KG}/kit-jamaica.jpg`, rights: 'CC BY-SA 2.5 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:HK_Stadium_football_Jamaica_Olympic_Team.JPG',
    why: 'Black, green and gold — the flag as a kit, the Reggae Boyz as the friendliest story of France ’98. Colour as joy.',
    tags: ['colourway', 'flag'],
  },
  {
    id: 'kg-mexico-1998', title: 'Mexico 1998 — Aztec Calendar', category: 'intl-classics', year: '1998',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Mexico_national_football_team',
    why: 'Aba Sport printed the entire Aztec sun stone across the shirt — heritage pattern as the whole graphic. Still the bar for it.',
    tags: ['aztec', 'pattern', 'heritage'],
  },
  {
    id: 'kg-germany-1990', title: 'West Germany 1990 — The Flag Sash', category: 'intl-classics', year: '1990',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Germany_national_football_team',
    why: 'adidas ran the black-red-gold flag as a painterly chevron across white. Worn by the ’90 world champions — restraint and nerve at once.',
    tags: ['adidas', 'flag', 'champions'],
  },
  {
    id: 'kg-denmark-1986', title: 'Denmark 1986 — Hummel Halves', category: 'intl-classics', year: '1986',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Denmark_national_football_team',
    why: 'Hummel’s half-and-half red/white pinstripes with chevron sleeves — a perennial “best kit ever” pick, and the DNA they later faded in protest.',
    tags: ['hummel', 'pinstripe'],
  },
  {
    id: 'kg-usa-1994', title: 'USA 1994 — Denim', category: 'intl-classics', year: '1994',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/United_States_men%27s_national_soccer_team',
    why: 'A stonewashed-denim-look home shirt for the home World Cup. So American it loops back to brilliant — host-nation kitsch, fully committed.',
    tags: ['americana', 'host', 'denim'],
  },

  // ── CLUB ICONS ────────────────────────────────────────────────────────────
  {
    id: 'kg-acmilan', title: 'AC Milan — Rossoneri', category: 'club-icons', year: '1899',
    src: `${KG}/kit-acmilan.jpg`, rights: 'CC BY 2.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:AC_Milan_Maglia_200809.jpg',
    why: 'Red for the devil, black to strike fear into opponents. Broad red-black stripes that have meant the same thing for 125 years.',
    tags: ['stripes', 'serie-a'],
  },
  {
    id: 'kg-barcelona', title: 'FC Barcelona — Blaugrana', category: 'club-icons', year: '1899',
    src: `${KG}/kit-barcelona.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fcb-2005-2006-home-shirt.jpg',
    why: 'Deep blue and garnet — "més que un club." A colourway so tied to Catalan identity it carried UNICEF on the front instead of a sponsor.',
    tags: ['blaugrana', 'identity'],
  },
  {
    id: 'kg-boca', title: 'Boca Juniors — Oro y Cielo', category: 'club-icons', year: '1907',
    src: `${KG}/kit-boca.jpg`, rights: 'CC BY 2.5 AR — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Museo_boca_juniors_camisetas.jpg',
    why: 'Blue with a gold band — chosen, legend says, from the flag of the next ship into La Boca. A working-class crest, worn like armour.',
    tags: ['argentina', 'band'],
  },
  {
    id: 'kg-ajax-1971', title: 'Ajax 1971 — Cruyff’s Broad Stripe', category: 'club-icons', year: '1971',
    src: `${KG}/kit-ajax-1971.jpg`, rights: 'CC0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Europacup_I._Ajax_tegen_Liverpool_5-1,_Johan_Cruijff_in_duel,_Bestanddeelnr_919-8589.jpg',
    why: 'The single wide red panel down a white shirt — Total Football’s uniform. Cruyff made it the most copied template in club football.',
    tags: ['cruyff', 'total-football'],
  },
  {
    id: 'kg-celtic-hoops', title: 'Celtic — The Hoops', category: 'club-icons', year: '1903',
    src: `${KG}/kit-celtic-hoops.jpg`, rights: 'CC BY 2.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Celtic_team_-_November_2010.jpg',
    why: 'Green-and-white horizontal hoops — chosen to make players look bigger and bond a club founded to feed Glasgow’s Irish poor.',
    tags: ['hoops', 'glasgow'],
  },
  {
    id: 'kg-river-plate', title: 'River Plate — The Sash', category: 'club-icons', year: '1901',
    src: `${KG}/kit-river-plate.jpg`, rights: 'CC BY-SA 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Camiseta_River_de_Am%C3%A9rico_Gallego_1985_(1).jpg',
    why: 'A single red diagonal sash across white — la banda. One stroke that turned a plain shirt into one of football’s most elegant marks.',
    tags: ['sash', 'argentina', 'elegant'],
  },
  {
    id: 'kg-fiorentina', title: 'Fiorentina — La Viola', category: 'club-icons', year: '1926',
    src: `${KG}/kit-fiorentina.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Villarreal_-_Fiorentina_summer_2013_(edited).jpg',
    why: 'The only purple in the canon — born from a laundry accident, kept out of pure defiance. Colour as a whole club’s personality.',
    tags: ['viola', 'unique'],
  },
  {
    id: 'kg-napoli', title: 'Napoli — Maradona’s Azzurri', category: 'club-icons', year: '1987',
    src: `${KG}/kit-napoli.jpg`, rights: 'CC BY-SA 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jersey_of_Diego_Maradona.jpg',
    why: 'Maradona’s actual sky-blue Napoli shirt. The kit a whole city built a shrine around — proof a jersey can become a relic.',
    tags: ['maradona', 'azzurri', 'relic'],
  },
  {
    id: 'kg-marseille', title: 'Olympique de Marseille — Blanc', category: 'club-icons', year: '1899',
    src: `${KG}/kit-marseille.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Maillot_domicile_OM_Olympique_de_Marseille_2006-2007.png',
    why: 'Pure white with sky-blue trim — almost no club wears all-white at home. OM made plainness into swagger.',
    tags: ['white', 'minimal'],
  },
  {
    id: 'kg-juventus', title: 'Juventus — Bianconeri', category: 'club-icons', year: '1903',
    src: `${KG}/kit-juventus.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Edgar_Davids_(Juventus_F.C.,_no._26)_clashing_with_Gennaro_Gattuso_(A.C._Milan)_-_20030528.jpg',
    why: 'Black-and-white stripes borrowed from Notts County in 1903. Austere, severe, instantly readable — the look of a winning machine.',
    tags: ['stripes', 'austere'],
  },
  {
    id: 'kg-inter', title: 'Inter — Nerazzurri', category: 'club-icons', year: '1908',
    src: `${KG}/kit-inter.jpg`, rights: 'Public domain — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:1960s_Inter_Milan_-_Luis_Su%C3%A1rez_Miramontes.jpg',
    why: 'Blue-and-black stripes for a club founded on the idea that anyone could play. The Grande Inter of the ’60s wore them like a uniform of empire.',
    tags: ['stripes', 'milan'],
  },
  {
    id: 'kg-roma', title: 'AS Roma — Giallorossi', category: 'club-icons', year: '1927',
    src: `${KG}/kit-roma.jpg`, rights: 'CC BY 2.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:AS_Roma_players.jpg',
    why: 'The deep maroon-red and gold of the city itself — the colours of imperial Rome, worn as civic pride.',
    tags: ['giallorossi', 'civic'],
  },
  {
    id: 'kg-liverpool', title: 'Liverpool — All Red', category: 'club-icons', year: '1964',
    src: `${KG}/kit-liverpool.jpg`, rights: 'CC BY 2.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Anfield_dressing_room.jpg',
    why: 'Shankly turned the shorts and socks red too — "all red, to make us look bigger." Psychology stitched into the kit.',
    tags: ['all-red', 'shankly'],
  },
  {
    id: 'kg-psg', title: 'Paris Saint-Germain — The Hechter', category: 'club-icons', year: '1973',
    src: `${KG}/kit-psg.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Psg-2008-2009-away-shirt.jpg',
    why: 'Designer Daniel Hechter’s centre red stripe on navy, flanked in white — a fashion man’s kit, decades before football discovered fashion.',
    tags: ['hechter', 'paris', 'stripe'],
  },
  {
    id: 'kg-arsenal-banana', title: 'Arsenal 1991–93 — Bruised Banana', category: 'club-icons', year: '1991',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Arsenal_F.C.',
    why: 'Yellow with black-and-blue zigzags — adidas at its most fearless. The away shirt that proved change kits could be the main event.',
    tags: ['adidas', 'away', 'cult'],
  },
  {
    id: 'kg-newcastle', title: 'Newcastle United — Magpies', category: 'club-icons', year: '1894',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Newcastle_United_F.C.',
    why: 'Black-and-white stripes wide as piano keys, chosen to echo the magpie. A one-club city’s entire identity in two colours.',
    tags: ['stripes', 'magpies'],
  },

  // ── GOALKEEPER & WEIRD ────────────────────────────────────────────────────
  {
    id: 'kg-campos', title: 'Jorge Campos — The Human Highlighter', category: 'keeper-weird', year: '1994',
    src: `${KG}/kit-campos.jpg`, rights: 'CC BY 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jorge_Campos_in_2016.jpg',
    why: 'Mexico’s keeper designed his own kits — neon zigzags so loud they read as op-art. Proof the rulebook never said "be tasteful."',
    tags: ['goalkeeper', 'neon', 'self-designed'],
  },
  {
    id: 'kg-gk-maximalism', title: '1990s Goalkeeper Maximalism', category: 'keeper-weird', year: '1990s',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Goalkeeper_(association_football)',
    why: 'For one glorious decade the keeper’s jersey had no rules — fractals, fluoro, paint-splatter. Football’s wildest design playground.',
    tags: ['goalkeeper', 'pattern', 'fluoro'],
  },

  // ── PROTEST & ACTIVIST ────────────────────────────────────────────────────
  {
    id: 'kg-denmark-hummel-2022', title: 'Denmark 2022 — Invisible Sponsors', category: 'protest-kits', year: '2022',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://www.sportspro.com/news/sponsorship-marketing/denmark-kit-hummel-qatar-2022-world-cup-human-rights-dbu/',
    why: 'Hummel faded its own logo and famous chevrons into the shirt colour for Qatar — and a third kit in black, "the colour of mourning." The purest protest kit there is.',
    tags: ['qatar', 'erasure', 'hummel'],
  },
  {
    id: 'kg-bohemian', title: 'Bohemian FC — Dublin’s Conscience', category: 'protest-kits', year: '2023',
    src: `${KG}/kit-bohemian.jpg`, rights: 'CC BY 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jordan_Flores_(Bohemian_FC_vs_Cork_City_03.11.2023_-_Dalymount).jpg',
    why: 'A fan-owned club that turns away kits into causes — Palestine, Bob Marley, Refugees Welcome. The shirt as a rolling act of solidarity.',
    tags: ['fan-owned', 'solidarity', 'dublin'],
  },
  {
    id: 'kg-clapton', title: 'Clapton CFC — No Pasarán', category: 'protest-kits', year: '2018',
    src: `${KG}/kit-clapton.jpg`, rights: 'CC BY-SA 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Brentford_vs._Clapton_Community_(2022).jpg',
    why: 'East-London, fan-owned, in the colours of the Spanish Republic with "No Pasarán" on the chest. An anti-fascist shirt that sold out worldwide.',
    tags: ['antifascist', 'fan-owned'],
  },
  {
    id: 'kg-forest-green', title: 'Forest Green Rovers — Carbon-Neutral', category: 'protest-kits', year: '2021',
    src: `${KG}/kit-forest-green.jpg`, rights: 'CC BY 2.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Visiting_Forest_Green_Rovers_Football_Club_(49200478226).jpg',
    why: 'The world’s first UN-certified carbon-neutral club, with kits spun from recycled plastic and coffee-ground bamboo. The shirt as ecological argument.',
    tags: ['eco', 'recycled', 'material'],
  },
  {
    id: 'kg-stpauli', title: 'FC St. Pauli — Totenkopf', category: 'protest-kits', year: '1980s',
    src: `${HOF}/st-pauli-supporters.jpg`, rights: 'CC BY-SA — Wikimedia Commons',
    sourceUrl: 'https://en.wikipedia.org/wiki/FC_St._Pauli',
    why: 'Brown shirts, a skull the fans adopted, anti-fascist politics baked into the badge since the ’80s. Club identity as permanent resistance.',
    tags: ['antifascist', 'punk', 'badge'],
  },
  {
    id: 'kg-dulwich', title: 'Dulwich Hamlet — Pink & Blue', category: 'protest-kits', year: '2016',
    src: `${KG}/kit-dulwich.jpg`, rights: 'CC BY 2.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dulwich_Hamlet_FC_supporters_16_04_2016-8294.jpg',
    why: 'A non-league club whose pink-and-navy became shorthand for anti-racist, pro-refugee, pro-LGBTQ football. Colour as a moral position.',
    tags: ['community', 'inclusive', 'non-league'],
  },
  {
    id: 'kg-palestine-nt', title: 'Palestine — Playing Under Occupation', category: 'protest-kits', year: '2019',
    src: `${HOF}/palestine-team-2019.jpg`, rights: 'CC BY-SA — Wikimedia Commons',
    sourceUrl: 'https://en.wikipedia.org/wiki/Palestine_national_football_team',
    why: 'To field a national team in red, white, green and black under contested statehood is the statement — before a ball is kicked.',
    tags: ['palestine', 'nation', 'statehood'],
  },
  {
    id: 'kg-celtic-palestine', title: 'Celtic — The Palestine Flags', category: 'protest-kits', year: '2016',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Green_Brigade',
    why: 'Celtic’s Green Brigade flew Palestinian flags against an Israeli side, took the UEFA fine, then crowd-funded ~£176k for Palestinian charities.',
    tags: ['palestine', 'ultras', 'fine-as-fundraiser'],
  },

  // ── MODERN & FASHION ──────────────────────────────────────────────────────
  {
    id: 'kg-venezia', title: 'Venezia FC — Football as Fashion House', category: 'modern-fashion', year: '2020',
    src: `${KG}/kit-venezia.jpg`, rights: 'CC BY-SA 4.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stadio_Olimpico_Lazio_Rome-Venezia_FC_03.jpg',
    why: 'A second-tier side designed kits like a Venetian fashion label — black, gold, tailoring, restraint. Showed a crest can carry couture, not sponsors.',
    tags: ['fashion', 'minimal', 'cult'],
  },
  {
    id: 'kg-nigeria-2018', title: 'Nigeria 2018 — Naija', category: 'modern-fashion', year: '2018',
    src: `${KG}/kit-nigeria-2018.jpg`, rights: 'CC BY-SA 3.0 — Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:FWC_2018_-_Group_D_-_NGA_v_ISL_-_Photo_66.jpg',
    why: 'Green eagle-wing zigzags that took three million pre-orders — Nike’s most pre-ordered shirt ever. The kit that proved a jersey can be pure culture.',
    tags: ['nike', 'hype', 'culture'],
  },
  {
    id: 'kg-blokecore', title: 'Blokecore — The Shirt as Heritage', category: 'modern-fashion', year: '2020s',
    src: `${KG}/kit-blokecore.jpg`, rights: 'No restrictions — Wikimedia Commons',
    sourceUrl: 'https://en.wikipedia.org/wiki/Blokecore',
    why: 'Vintage and bootleg shirts worn as streetwear, detached from the club. Proof a jersey keeps meaning even when the loyalty is stripped out.',
    tags: ['streetwear', 'vintage', 'bootleg'],
  },
  {
    id: 'kg-scarf', title: 'The Football Scarf', category: 'modern-fashion', year: 'ongoing',
    src: `${KG}/kit-scarf.jpg`, rights: 'CC BY-SA 4.0 — Wikimedia Commons',
    sourceUrl: 'https://en.wikipedia.org/wiki/Supporters%27_scarf',
    why: 'The oldest piece of fan kit — held overhead, it turns thousands of individuals into one graphic. The pre-internet identity object, still unbeaten.',
    tags: ['scarf', 'terrace', 'identity'],
  },
  {
    id: 'kg-palermo', title: 'Palermo — Rosanero', category: 'modern-fashion', year: '1907',
    src: null, rights: 'Reference only — rights-restricted',
    sourceUrl: 'https://en.wikipedia.org/wiki/Palermo_F.C.',
    why: 'Pink and black — chosen, the story goes, to mirror a team’s sweet-and-bitter fortunes. The boldest colour choice in the men’s game, worn without apology.',
    tags: ['pink', 'bold', 'sicily'],
  },
]

export default { categories, entries }
