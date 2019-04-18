import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const Help = props => (
  <Modal show={props.show} onHide={props.toggle}>
    <Modal.Header closeButton>
    </Modal.Header>

    <Modal.Body>
      <p>
        Ez az oldal azért jött létre, hogy az újságírók számára könnyebben
        kereshetővé váljanak a magyar országgyűlés felszólalásai 1990-től
        napjainking.
      </p>

      <p>
        A keresőmezőbe írt szóra vagy szavakra az enter gomb megnyomása után
        megjelennek a találatok,amelyek tartalmazzák az adott keresőkifejezésre
        felszólalás szövegét, a felszólaló nevét, a felszólalás címét,
        a dátumát, a parlament oldalán található szöveghez vezető linket, és azt,
        hogy melyik ülésszakban hangzott el a beszéd.
        Ahogy a kezdőoldalon található kártyák példái mutatják, komplex keresőkifejezések is
        alkothatók az AND (és) és az OR (vagy) kötőszavakkal. Ha a több szóból álló
        keresőkifejezést idézőjelbe tesszük, akkor csak és kizárólag az azt a
        kifejezést tartalmazó találatokat adja vissza az oldal.
        A kezdőoldalra az oldal címére kattintva juthatunk vissza.
      </p>

      <p>A találati lista szűkíthető:</p>
      <ul>
        <li>további keresőszavak megadásával;</li>
        <li>komplex keresőkifejezések megadásával;</li>
        <li>egy vagy több felszólaló kiválasztásával;</li>
        <li>
          dátum szerinti pontosítással az év (YYYY), a hónap (MM) és a nap (DD)
          megadásával, vagy a mezőbe kattintva a legördülő naptár segítségével.
        </li>
      </ul>

      <p>
        Az oldal önkéntes programozók munkájának köszönhetően jött létre. Kedvet kaptál részt venni a projektben? Ötleted, fejlesztési javaslatod van? Az oldallal kapcsolatos megjegyzéseket az info@k-monitor.hu email címre várjuk.
      </p>

      <p>
        Támogasd a K-Monitort! – <a href="http://k-monitor.hu/tamogatas">http://k-monitor.hu/tamogatas</a>
      </p>

    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={() => props.toggle()}>
        Bezárás
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Help;
