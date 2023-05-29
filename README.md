# Step Up

Slutprojekt i kursen Dynamisk Webbutveckling av Daniel Vanpalo, Martina Kreivi, Jenny Weijland, Lucas Alfredsson och Simon Eriksson

## Webbshop med databas

Ett skolprojekt där vi fått en existerande webbshop för front-end och skulle koppla denna till en databas med hjälp av `MongoDb` och `Express`.

Kod basen var redan uppbyggd med `React`, `TypeScript`, `YUP`, `Formik` och `React-Bootstrap`.

## Starta Projektet

- `cd server`
- `npm run dev`

- `cd client`
- `npm run dev`
- `npm install`

### Krav för Godkänt

- [x] Alla sidor skall vara responsiva.
- [x] Arbetet ska implementeras med en React frontend och en Express backend.
- [ ] Express backenden ska ha validering på samtliga endpoints.
- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet.
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet.
- [ ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm)
- [x] Man ska kunna logga in som administratör i systemet.
- [x] Inga Lösenord får sparas i klartext i databasen.
- [ ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen.
- [ ] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan.
- [ ] Administratörer ska kunna se en lista på alla gjorda beställningar.
- [ ] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera.
- [ ] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori.
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten.
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas.
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält.
