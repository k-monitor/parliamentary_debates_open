import React from 'react';
import BillboardChart from "react-billboardjs";
import { counts } from './transformations'
import { Row, Col, Pagination, Button } from 'react-bootstrap';
import get_pages from './pagination'
import config from './config.json'

const Results = ({ results, page, navigate_to_page }) => (
  results.hits.total > 0 ? (<div>
  <h2>{results.hits.total} találat:</h2>
  {results.hits.hits.map(result => (
    <article className="result" key={ result._id }>
      <h1>
        <a href="#">{result._source.speaker} &mdash; <b>{
            Array.isArray(result._source.topic)
              ? result._source.topic.join(', ')
              : result._source.topic
        }</b></a>
        <span className="meta">{result._source.date},  ({result._source.session}, {result._source.sitting_type})</span>
      </h1>
      <p dangerouslySetInnerHTML={{__html: result.highlight.text}} />
      <span className="source">
        Forrás: <a href={result._source.url}>{result._source.url}</a>
      </span>
    </article>
  ))}
    <div>
        <Pagination>
            {get_pages(config.page_size, results.hits.total)
              .filter(number => Math.min(number, Math.abs(number - page), Math.abs(Math.ceil(results.hits.total / config.page_size)- number)) < 4)
              .map(number => (
                <Pagination.Item key={number} active={number === page}
                  onClick={() => navigate_to_page(number)}>
                    {number + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    </div>
  </div>) : null
)


export default Results
