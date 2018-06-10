import React from 'react';
import { Panel, Button } from 'react-bootstrap';

const Help = (props) => (
  props.show ? (<Panel bsStyle="info">
    <Panel.Body>
      <p>Ez az oldal azért jött létre, hogy az újságírók számára könnyebben kereshetővé váljanak a magyar országgyűlés felszólalásai 1990-től napjainking.</p>

      <p>A keresőmezőbe írt szó vagy szavak alapján a megjelenő találatok megjelenítik az adott felszólalás szövegét, a felszólaló nevét, a felszólalás címét, a dátumát, a parlament oldalán található szöveghez vezető linket, és azt, hogy melyik ülésszakban hangzott el a beszéd.</p>

      <p>A találati lista szűkíthető:</p>
      <ul>
        <li>további keresőszavak megadásával;</li>
        <li>egy vagy több felszólaló kiválasztásával;</li>
        <li>dátum szerinti pontosítással az év (YYYY), a hónap (MM) és a nap (DD) megadásával, vagy a mezőbe kattintva a legördülő naptár segítségével.</li>
      </ul>
      <Button bsStyle="primary" onClick={props.toggle}>Elrejtés</Button>
    </Panel.Body>
  </Panel>) : (
    <Button onClick={props.toggle}>Súgó mutatása</Button>
  )
);

export default Help;
