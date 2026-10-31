# Leie & Garasje Bodø — nettsted (utkast)

Statisk nettsted for utleie av bil, båt, verktøy og snøfreser på uke eller sesong, pluss vinterlagring og verkstedplass i garasjen. Kunden henter hos oss; service, vedlikehold og forsikring er inkludert; kunden betaler drivstoff og bompenger.

## Sider

| Fil | Innhold |
| --- | --- |
| `index.html` | Forside: pris i første skjerm, fire løfter, tre steg, utstyrskort (uke/sesong), «dette betaler du selv», sesongabonnement, garasje, bedrift, henting, FAQ |
| `utstyr.html` | Utstyrsliste med spesifikasjoner, «inkludert», ledig fra, pris per uke/sesong |
| `priser.html` | Enkeltleie vs sesongabonnement, pristabell, bookingskjema |
| `garasje.html` | Dekkhotell, vinterlagring MC/bil, verkstedplass («skru selv»), regler, forespørselsskjema |
| `assets/style.css` | Felles stil (Inter, blå aksent) |

## Versjon 2 (`v2/`)

Samme innhold i markedsplass-stil etter mønster av bildelingstjenester: søkefelt i første skjerm (hva, fra, til, uke/sesong), tre fordeler, kort med spesifikasjons-chips og pris, «Sesongen nå», fire steg, «Hvorfor leie hos oss», garasjepanel, FAQ og bunntekst med kolonner. `v2/utstyr.html` er en resultatside med filtre. Åpnes på `/v2/`.

Engelsk versjon av v2 ligger i `v2/en/` (samme fire sider). Språkvelgeren NO | EN i toppmenyen bytter til samme side på det andre språket; sidene har `hreflang`-lenker for søkemotorer. Plassholderne er på engelsk der: `[PRICE]`, `[ADDRESS]`, `[HOURS]`, `[PHONE]`, `[EMAIL]`, `[ORG NO]`, `[INSURER]`, `[AMOUNT]`, `[NUMBER]`, `[DATE]`, `[MODEL]`.

## Versjon 3 (`v3/`) – sesongdelt, tre språk

Forsiden er delt i Vinter (nov–apr, mørk blå) og Sommer (mai–okt, grønn/sand). Valget styrer hvilke kort som vises, fargetemaet og abonnementsblokken. Tre språk – norsk, engelsk, russisk – uten egne sider: all tekst ligger i `v3/assets/i18n.js` (én nøkkel per tekst), og `v3/assets/app.js` bytter språk og sesong uten å laste siden på nytt. Valget huskes i nettleseren; `?lang=en&sesong=sommer` i adressen overstyrer. Illustrasjonene ligger som ett SVG-symbolark øverst i hver side (`v3/assets/pics.svg.html`).

Sider: `index.html`, `utstyr.html` (kategorifilter + sesong), `priser.html` (tabell + bookingskjema), `garasje.html` (forespørselsskjema).

### Hva som må kobles på før lansering

| Funksjon | Hvor i koden | Hva som trengs |
| --- | --- | --- |
| Priser og «ledig fra» | `[PRIS]`, `[DATO]`, `[ANTALL]` i alle sider; `data-price="0"` på kortene i `utstyr.html` | Prisliste per utstyr (uke og sesong) og lagerbeholdning. Helst som én JSON-fil (`v3/assets/data.json`) som sidene leser – da oppdateres alt ett sted |
| Bookingskjema | `v3/priser.html`, `#bookform` – `submit` logger i konsollen og viser en demo-dialog | Betalingsløsning: Vipps Checkout (krever Vipps-bedriftsavtale + API-nøkler) og/eller Stripe for kort. Og et sted bookingen lagres: enkleste er et bookingsystem med API (Booqable, Rentman, Sharefox – norsk) eller Airtable/Google Sheets via et lite endepunkt |
| Tilgjengelighetskalender | Datofeltene i skjemaet er vanlige `<input type=date>` | Samme bookingsystem – det vet hvilke datoer som er opptatt |
| Garasjeforespørsel | `v3/garasje.html`, `#garasjeform` – demo-dialog | E-postmottaker. Formspree eller Netlify Forms gir dette uten egen server; ellers samme backend som booking |
| «Logg inn» | Lenke til `#` | BankID-innlogging (Signicat, Criipto) eller enklere: kun SMS-kode ved booking, ingen konto |
| Sortering «pris, lav til høy» | `utstyr.html`, `#sortering` – virker når `data-price` er fylt | Priser fra punktet over |
| Kart | `[KART]` i `index.html` | Adresse → Google Maps-embed eller OpenStreetMap-iframe |
| Forsikring | `[FORSIKRINGSSELSKAP]`/`[INSURER]` i v2 | Navn på selskap og egenandel |
| Bompenger | Tekst om AutoPASS | Avtale om AutoPASS-brikke i bilene og rutine for viderefakturering |
| Språk | `v3/assets/i18n.js` | Gjennomlesing av engelsk og russisk av en som kjenner bransjen; nøkkelen `seo_title` styrer sidetittelen |
| Domene | GitHub Pages på `alskov1992.github.io/leie-garasje-bodo/` | Eget domene (f.eks. `leiegarasje.no`): en `CNAME`-fil i repoet + DNS hos registraren |

## Før lansering

- Erstatt alle `[PRIS]`, `[ADRESSE]`, `[TID]`, `[TELEFON]`, `[E-POST]`, `[ORG.NR]`, `[MODELL]`, `[DATO]`, `[BELØP]`, `[ANTALL]`.
- Illustrasjonene (skisse-stil, inline SVG) ligger i `assets/sketch-defs.html` og er limt inn øverst i hver side; bytt dem med egne bilder (`<img>`) om ønskelig.
- Koble skjemaene i `priser.html` og `garasje.html` til Vipps Checkout / et skjema-backend; nå er de kun visuelle.
- Bytt firmanavnet «Leie & Garasje Bodø» (plassholder) til det registrerte navnet.
- Legg inn vilkår og personvern (lenkene i bunnteksten peker på `#`).

## Kjør lokalt

Åpne `index.html` i nettleseren, eller:

```
python3 -m http.server 8000
```

og gå til http://localhost:8000.
