import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const About = props => (
  <Modal show={props.show} onHide={props.toggle}>
    <Modal.Header closeButton>
      <Modal.Title>Súgó</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>
        A parlamenti képviselői felszólalások átláthatóságát növelni kívánó
        projekt célja az újságírók munkájának megkönnyítése. Ez a honlap egy
        eszköz azon újságíróknak, kutatóknak vagy bárkinek, akik szeretnék szó
        szerint idézni valamelyik választott képviselő parlamenti keretek között
        elhangzott mondatait.
      </p>

      <p>
        A projektet önkéntesek készítették a [K-Monitor](http://k-monitor.hu/)
        szárnyai alatt a [Global Legislative Openness
        Week](http://openparlweek.org/) keretében a [Mozilla Open Leadership
        Program](https://mozilla.github.io/leadership-training/) támogatásával.
        A projekt technikai részletei megtalálhatók a [projekt Github
        oldalán.](https://github.com/k-monitor/parldata) Ha szeretnél
        csatlakozni, [ezekben a
        feladatokban](https://github.com/k-monitor/parldata/blob/master/CONTRIBUTING.md)
        várunk segítséget.
      </p>

      <p>
        A felszólalások szövegeit a parlament honlapjáról Scrapy-vel
        szüreteltük, a szövegeket Spacy-vel dolgoztuk fel, az adatbázis pedig
        Elasticsearch-ön fut.
      </p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={() => props.toggle()}>
        Bezárás
      </Button>
    </Modal.Footer>
  </Modal>
);

export default About;
