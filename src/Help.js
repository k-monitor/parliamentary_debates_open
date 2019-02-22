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
        A keresőmezőbe írt szó vagy szavak alapján a megjelenő találatok
        megjelenítik az adott felszólalás szövegét, a felszólaló nevét, a
        felszólalás címét, a dátumát, a parlament oldalán található szöveghez
        vezető linket, és azt, hogy melyik ülésszakban hangzott el a beszéd.
      </p>

      <p>A találati lista szűkíthető:</p>
      <ul>
        <li>további keresőszavak megadásával;</li>
        <li>egy vagy több felszólaló kiválasztásával;</li>
        <li>
          dátum szerinti pontosítással az év (YYYY), a hónap (MM) és a nap (DD)
          megadásával, vagy a mezőbe kattintva a legördülő naptár segítségével.
        </li>
      </ul>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={() => props.toggle()}>
        Bezárás
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Help;
