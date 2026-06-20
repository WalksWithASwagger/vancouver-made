// MADE ON — THE RECEIPTS. The public-record spine of the whole collection.
// "Every claim on the garment carries its citation on the hem." This is that data.
// Source: MADEON pitch deck / board (Kris Krüg). Each still needs a primary-source
// link before final publish — `confirm: true` flags what to verify.

export const receipts = [
  {
    id: 'R-COST',
    stat: '$685M–$729M',
    claim: 'gross BC cost for seven World Cup games',
    detail: '$242M of it security; up to $114M net to BC taxpayers (May 2026 update)',
    source: 'Government of BC update · CBC · Globe and Mail, May 2026',
    confirm: false,
  },
  {
    id: 'R-PRIVATE',
    stat: 'public vs private',
    claim: 'California host cities funded most of their hosting budget privately — BC went nearly 100% public',
    detail: 'SF Bay Area: ~US$45M operating cost, mostly private sponsors + a ticket surcharge (federal money still covers security/transit)',
    source: 'Globe and Mail, June 2026',
    confirm: false,
  },
  {
    id: 'R-FORSAKEN',
    stat: '“forsaken twice”',
    claim: 'the Oppal inquiry found the women were forsaken twice — by society and by the police',
    detail: 'a “blatant failure”; the VPD “utterly failed” to warn women in the DTES',
    source: 'Forsaken — Missing Women Commission of Inquiry (Oppal), 2012',
    confirm: false,
  },
  {
    id: 'R-2010',
    stat: 'doubled',
    claim: 'homelessness in Vancouver more than doubled before the 2010 Olympics (628 → 1,576, +134%)',
    detail: '1,400+ DTES low-income/SRO units lost despite a “no displacement” pledge; street homelessness rose ~373%',
    source: 'UBC Olympic Games Impact report (2009) · Pivot Legal',
    confirm: false,
  },
  {
    id: 'R-HOGANS',
    stat: "Hogan's Alley",
    claim: "Black neighbourhood paved for the viaduct the Cup drives its fans across",
    detail: 'displaced by city action over decades',
    source: 'City of Vancouver anti-Black cultural redress record',
    confirm: true,
  },
]

export default receipts
