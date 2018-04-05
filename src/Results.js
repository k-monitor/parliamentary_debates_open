import React from 'react';
import BillboardChart from "react-billboardjs";
import { counts } from './transformations'
import { Row, Col, Pagination, Table, Button } from 'react-bootstrap';
import get_pages from './pagination'
import config from './config.json'

const Results = ({ results, page, navigate_to_page }) => (
  <div>
  <h2>{results.hits.total} találat:</h2>
  <Table responsive>
    <thead>
      <tr>
        <th>Dátum</th>
        <th>Ülésszak</th>
        <th>Ülés típusa</th>
        <th>Felszólaló</th>
        <th></th>
      </tr>
    </thead>
    <tbody>{
        results.hits.hits.map(result => (
          <tr key={ result._id }>
            <td>{result._source.date}</td>
            <td>{result._source.session}</td>
            <td>{result._source.sitting_type}</td>
            <td>{result._source.speaker}</td>
            <td><Button bsSize="xsmall">Részletek</Button></td>
          </tr>
        ))
      }</tbody>
  </Table>

    <div>
        <Pagination>
            {get_pages(config.page_size, results.hits.total).map(number => (
                <Pagination.Item key={number} active={number === page}
                  onClick={() => navigate_to_page(number)}>
                    {number + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    </div>
  </div>
)


export default Results
