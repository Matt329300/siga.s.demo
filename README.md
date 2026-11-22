# Siga Siga – strona bistro (demo)

Statyczna strona małego bistro z kuchnią bliskowschodnią: Warszawa, Mokotów, ul. Willowa 9.
Napisana w czystym HTML, CSS i JS, bez frameworków i bez kroku budowania.

## Uruchomienie lokalnie

Wystarczy otworzyć `index.html` w przeglądarce. Wygodniej jest jednak uruchomić prosty serwer, bo wtedy działa np. mapa Google:

```bash
npx serve .
# albo
python -m http.server 8000
```

## Struktura

| Plik | Zawartość |
|---|---|
| `index.html` | cała strona: hero, menu PL/EN z kartą i winami, „Jak u nas jest”, opinie, godziny + kontakt |
| `style.css` | style (mobile-first) |
| `script.js` | menu nawigacji, status „otwarte teraz” (czas warszawski), przełącznik języka menu |
| `karta-druk.html` | karta w wersji do druku (A4) → `karta-siga-siga.pdf` |
| `img/` | zdjęcia; źródło każdego zdjęcia jest w `img/ZRODLA.md` |
| `WERYFIKACJA.md` | skąd pochodzi każda informacja na stronie i co trzeba jeszcze potwierdzić z lokalem |

## Przed publikacją

- Wpisz docelową domenę zamiast `https://example.com/` (canonical, Open Graph).
- Potwierdź z lokalem i autorami zgodę na zdjęcia (szczegóły w `img/ZRODLA.md`).
- Potwierdź oznaczenia wege/wegańskie i sposób rezerwacji (`WERYFIKACJA.md`).
- Przy nowej karcie zaktualizuj sekcję menu w `index.html` oraz `karta-druk.html`.

## GitHub Pages

Strona jest statyczna, więc działa od razu na GitHub Pages. W ustawieniach repozytorium wybierz:
*Settings → Pages → Deploy from a branch → `main` / root*.
