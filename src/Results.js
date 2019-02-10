import React from 'react';
import {Pagination, Modal, Button} from 'react-bootstrap';
import get_pages from './pagination';
import config from './config.json';
import {
  result_count_by_date,
  bin,
  formatBinName,
  formatBinNameShort,
} from './transformations';
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';

const joinHighlightParts = parts => parts.join('&nbsp;[&hellip;]&nbsp;');
const getHighlightPart = input =>
  joinHighlightParts(Array.isArray(input) ? input : [input]);

const getHighlightParts = highlight =>
  [highlight.bill_title, highlight.text]
    .filter(i => i !== undefined)
    .map(getHighlightPart);

const formatHighlight = highlight =>
  joinHighlightParts(getHighlightParts(highlight));

const binsize = 5184000000 * 3;

const Results = ({
  results,
  page,
  navigate_to_page,
  hitOpen,
  open_modal,
  close_modal,
  term,
}) =>
  results.hits.total > 0 ? (
    <div>
      <div style={{margin: 'auto', width: 600}}>
        <AreaChart
          width={600}
          height={300}
          data={bin(binsize)(result_count_by_date(results))}
          margin={{top: 5, right: 20, bottom: 80, left: 5}}>
          <Area
            type="monotone"
            dataKey="count"
            name="Felszólalások száma"
            fill="#ebebeb"
            stroke="#ebebeb"
            dot={false}
            activeDot={false}
            fillOpacity={0.5}
            strokeOpacity={1}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <XAxis
            tick={{fill: '#ebebeb'}}
            type="number"
            dataKey="timestamp"
            angle={-45}
            textAnchor="end"
            domain={['dataMin', 'dataMax']}
            minTickGap={-35}
            tickCount={100}
            ticks={bin(binsize)(result_count_by_date(results)).map(
              i => i.timestamp,
            )}
            tickFormatter={formatBinNameShort(binsize)}
          />
          <YAxis tick={{fill: '#ebebeb'}} />
          <Tooltip
            cursor={{stroke: 'red', strokeWidth: 1}}
            labelStyle={{color: 'black'}}
            labelFormatter={formatBinName(binsize)}
            separator=": "
          />
        </AreaChart>
      </div>
      <h2>
        {results.hits.total} találat &quot;{term}&quot; kulcsszóra:
      </h2>
      {results.hits.hits.map((result, index) => (
        <article className="result" key={result._id}>
          <h1>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                open_modal(index);
              }}>
              {result._source.speaker} &mdash;
              <b>
                {Array.isArray(result._source.topic)
                  ? result._source.topic.join(', ')
                  : result._source.topic}
              </b>
            </a>
            <span className="meta">
              {result._source.date}, ({result._source.session},
              {result._source.sitting_type})
            </span>
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html:
                formatHighlight(result.highlight) ||
                result._source.text.slice(0, 150),
            }}
          />
          <span className="source">
            Forrás: <a href={result._source.url}>{result._source.url}</a>
          </span>
        </article>
      ))}
      <div>
        <Pagination>
          {get_pages(config.page_size, results.hits.total)
            .filter(
              number =>
                Math.min(
                  number,
                  Math.abs(number - page),
                  Math.abs(
                    Math.ceil(results.hits.total / config.page_size) - number,
                  ),
                ) < 3,
            )
            .reduce(
              (a, b) =>
                a.length === 0
                  ? a.concat([b])
                  : a.slice(-1)[0] + 1 === b
                  ? a.concat([b])
                  : a.concat(['...', b]),
              [],
            )
            .map(number =>
              number === '...' ? (
                <Pagination.Ellipsis key={Math.random()} />
              ) : (
                <Pagination.Item
                  key={number}
                  active={number * 1 === page * 1}
                  onClick={() => navigate_to_page(number)}>
                  {number + 1}
                </Pagination.Item>
              ),
            )}
        </Pagination>
      </div>

      <Modal show={hitOpen !== null} onHide={close_modal}>
        {hitOpen !== null && (
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>
                {results.hits.hits[hitOpen]._source.speaker} &mdash;
                <b>
                  {Array.isArray(results.hits.hits[hitOpen]._source.topic)
                    ? results.hits.hits[hitOpen]._source.topic.join(', ')
                    : results.hits.hits[hitOpen]._source.topic}
                </b>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                {results.hits.hits[hitOpen]._source.date}, (
                {results.hits.hits[hitOpen]._source.session},{' '}
                {results.hits.hits[hitOpen]._source.sitting_type})
              </p>
              <p>{results.hits.hits[hitOpen]._source.text}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={close_modal}>
                Bezárás
              </Button>
            </Modal.Footer>
          </React.Fragment>
        )}
      </Modal>
    </div>
  ) : null;

export default Results;
