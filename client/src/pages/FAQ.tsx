import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";

export function FAQ() {
  return (
    <Accordion >
      <h2>Frequently Asked Questions (FAQ)</h2>

      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Vad är er returpolicy om skorna inte passar eller om jag inte är nöjd
          med dem?
        </Accordion.Header>
        <Accordion.Body>
          Vår returpolicy tillåter kunder att returnera oanvända skor inom 30
          dagar efter köpet. Om skorna är använda eller skadade kan vi inte
          acceptera en retur. Mer detaljerad information återkommer vi med.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Hur hanterar ni reklamationer?</Accordion.Header>
        <Accordion.Body>
          Vid reklamationer hanterar vi varje fall individuellt för att se till
          att kunden är nöjd. Vi kan erbjuda reparation, utbyte eller
          återbetalning beroende på situationen och skornas skick. Kontakta oss
          via vår kundtjänst så hjälper vi dig vidare. (För tillfället
          urfunktion)
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>
          Vad är er returpolicy om skorna inte passar eller om jag inte är nöjd
          med dem?
        </Accordion.Header>
        <Accordion.Body>
          Vår returpolicy tillåter kunder att returnera oanvända skor inom 30
          dagar efter köpet. Om skorna är använda eller skadade kan vi inte
          acceptera en retur. Mer detaljerad information återkommer vi med.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>
          Hur ofta finns det kampanjer tillgängliga hos er?
        </Accordion.Header>
        <Accordion.Body>
          Vi har kampanjer och erbjudanden tillgängliga från tid till annan. För
          att hålla dig uppdaterad om våra senaste erbjudanden, rekommenderar vi
          att du håller utkik när vi finns på sociala medier.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>
          Har ni några rekommendationer för hur jag kan ta hand om mina skor för
          att de ska hålla längre?
        </Accordion.Header>
        <Accordion.Body>
          För att skorna ska hålla längre rekommenderar vi att du undviker att
          använda dem i extrema väderförhållanden, rengör dem regelbundet och
          förvarar dem på en torr plats när de inte används.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="5">
        <Accordion.Header>
          Hur ofta finns det kampanjer tillgängliga hos er?
        </Accordion.Header>
        <Accordion.Body>
          Vi har kampanjer och erbjudanden tillgängliga från tid till annan. För
          att hålla dig uppdaterad om våra senaste erbjudanden, rekommenderar vi
          att du håller utkik när vi finns på sociala medier.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header>
          Kan jag få hjälp med att välja rätt skor baserat på mina behov och
          preferenser?
        </Accordion.Header>
        <Accordion.Body>
          Absolut! Våra kunniga medarbetare hjälper gärna till att välja rätt
          skor utifrån dina behov och preferenser. Kontakta oss via vår
          kundtjänst eller besök en av våra butiker för personlig hjälp.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="7">
        <Accordion.Header>
          Hur lång är garantitiden för era skor?
        </Accordion.Header>
        <Accordion.Body>
          Vår garanti för skor sträcker sig vanligtvis över 1 år från
          köptillfället. Mer detaljerad information om garantin kommer att
          finnas på vår hemsida inom snar framtid.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="8">
        <Accordion.Header>
          Vilka leveransalternativ erbjuder ni till era kunder?
        </Accordion.Header>
        <Accordion.Body>
          Vi samarbetar med flera budtjänster för att kunna erbjuda våra kunder
          olika alternativ. Några av de budtjänster vi samarbetar med inkluderar
          DHL, Postnord, Budbee och Instabox. Genom att ha ett brett urval av
          budtjänster kan våra kunder välja den som passar deras behov bäst,
          oavsett om det handlar om snabb leverans eller lägre kostnader.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="9">
        <Accordion.Header>
          Kan jag spåra min beställning när den har skickats?
        </Accordion.Header>
        <Accordion.Body>
          Ja, du kan spåra din beställning när den har skickats. Du får ett
          spårningsnummer via e-post när vi har skickat dina skor.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="10">
        <Accordion.Header>
          Erbjuder ni någon form av bonusprogram eller poängsystem för
          återkommande kunder?
        </Accordion.Header>
        <Accordion.Body>
          Vi erbjuder bonusprogram för våra återkommande kunder. Mer information
          om vårt lojalitetsprogram finns på vår hemsida.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}