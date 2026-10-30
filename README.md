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
