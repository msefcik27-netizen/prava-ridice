# Práva řidiče — PWA (prototyp)

Instalovatelná PWA aplikace poskládaná podle screenshotů beta verze.

## Obsah
- `index.html` — celá aplikace (všechny obrazovky, logika)
- `manifest.webmanifest` — nastavení instalace na plochu
- `sw.js` — service worker (offline režim + příprava na push notifikace)
- `icons/` — ikony aplikace

## Jak spustit
PWA potřebuje běžet přes http(s), ne přes soubor. Lokálně:

```
cd prava-ridice
python3 -m http.server 8080
```
Otevři http://localhost:8080 (na mobilu ve stejné síti přes IP počítače).

## Nasazení
Nahraj celou složku na jakýkoliv statický hosting (Vercel, Netlify, GitHub Pages).
Přes HTTPS půjde appka „Přidat na plochu" a fungují notifikace.

## Co je hotové
- 5 záložek: Přehled, Služby, Průvodce, Zprávy, Profil
- Bodový stav 0–12 s barevným rizikem, notifikace podle bodů, konzultační karta při 12 bodech
- Služby s detailem, Průvodce s vyhledáváním a filtrem kategorií
- Kalkulačka alkoholu (4 kroky) — Widmarkův vzorec s korekcí
- Formulář nezávazné konzultace (telefon, zpráva, přílohy, souhlas)
- Předplatné + pole pro promo kód
- Výzva „Přidat na plochu" (Android/desktop i návod pro iOS)

## Co ještě potřebuje backend (další krok)
- Reálné odesílání konzultace a napojení telefonu/advokáta
- Ověření promo kódů a platby (Stripe)
- Server pro web push notifikace (VAPID klíče)
