<!-- Logo -->
<div align="center">
  <p style="color: #05968f; font-size: 180px; margin-bottom: -20px; font-weight: 600;">M</p>
  <h1 align="center">Museosovellus</h1>
</div>

- [Projektista](#projektista)
  - [Actions](#actions)
  - [Käytetyt teknologiat](#käytetyt-teknologiat)
  - [Muut resurssit](#muut-resurssit)
- [Asennus](#asennus)
- [Käyttöliittymä](#käyttöliittymä)
- [Tekijät](#tekijät)


## Projektista
Museosovellus on Ohjelmistoprojekti II -kurssilla luotu sovellus, jonka tarkoitus on helpoittaa sekä museoissa käymistä että uusien museoiden löytämistä. Museosovellukseen on listattu yli 150 suomalaista museota.

Museosovelluksesta voit helposti löytää uusia museoita joko yksinkertaisen listan tai kartan kautta. Sovellusta voi käyttää ilman käyttäjätunnusta, mutta halutessasi voit luoda käyttäjätunnuksen ja lisätä museoita erilaisiin listoihin, kuten suosikkeihin.

### Actions
Projektissa on käytössä [GitHub Actions workflow][main.yml-url], joka suorittaa asetetut testit automaattisesti main ja dev brancheissa pushilla sekä pull requestilla. Tärkeää onkin, että ennen pushia suorittaisi testit lokaalisti `npm test` -komennolla.

### Käytetyt teknologiat
- [![React-Native][React-Native]][React-Native-url]
- [![Expo][Expo]][Expo-url]
- [![Firebase][Firebase]][Firebase-url]

### Muut resurssit
- [![Museotilasto][Museotilasto]][Museotilasto-url]  
Museotilasto, Museovirasto. [CC BY 4.0][CC-BY-4.0-url].

## Asennus
1. Kloonaa repository
  ```sh
  git clone https://github.com/Museosovellus/MuseoFrontend.git
  ```

2. Asenna tarvittavat paketit
  ```sh
  npm install
  ```

3. Luo projektin juureen `.env` -tiedosto, johon lisäät seuraavat tiedot Firebase Realtime tietokannastasi
  ```
  API_KEY=
  AUTH_DOMAIN=
  DATABASE_URL=
  PROJECT_ID=
  STORAGE_BUCKET=
  MESSAGING_SENDER_ID=
  APP_ID=
  MEASUREMENT_ID=
  ```

4. Sovelluksen käynnistys
  ```sh
  npx expo start
  ```
5. Skannaa terminaaliin tuleva QR-koodi kamerasovelluksella (iOS) tai Expo-sovelluksella (Android)

## Käyttöliittymä
<img src="./assets/img/etusivu.png" width="49%" height="49%" />
<img src="./assets/img/lista.png" width="49%" height="49%" />
<img src="./assets/img/museo.png" width="49%" height="49%" />
<img src="./assets/img/kartta.png" width="49%" height="49%" />
<img src="./assets/img/kirjaudu.png" width="49%" height="49%" />
<img src="./assets/img/kaydyt.png" width="49%" height="49%" />

## Tekijät
* [Karri Helokumpu](https://github.com/Karri966)
* [Aaro Miikkulainen](https://github.com/aarokkeli)
* [Tatu Paukkeri](https://github.com/taturaattori)
* [Daniela Pietikäinen](https://github.com/danielahelmi)
* [Lauri Reis](https://github.com/laurireis)

[⬆️ Takaisin ylös](#projektista)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React-Native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-Native-url]: https://reactnative.dev/
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]: https://expo.dev/ 
[Firebase]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[Firebase-url]: https://firebase.google.com/
[Museotilasto]: https://img.shields.io/badge/museotilasto-%2320232a.svg?style=for-the-badge
[Museotilasto-url]: https://www.museotilasto.fi/
[CC-BY-4.0-url]: https://creativecommons.org/licenses/by/4.0/deed.fi
[main.yml-url]: https://github.com/Museosovellus/MuseoFrontend/blob/main/.github/workflows/main.yml