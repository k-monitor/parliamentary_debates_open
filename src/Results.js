import React from 'react';
import {Pagination} from 'react-bootstrap';
import get_pages from './pagination';
import config from './config.json';
import {
  result_count_by_date,
  bin,
  formatBinName,
  formatBinNameShort,
} from './transformations';
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

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

const Results = ({results, page, navigate_to_page}) =>
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
            dot={false}
            activeDot={false}
            fillOpacity={1}
            strokeOpacity={0}
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
            labelFormatter={formatBinName(binsize)}
            separator=": "
          />
        </AreaChart>
      </div>
      <h2>{results.hits.total} találat:</h2>
      {results.hits.hits.map(result => (
        <article className="result" key={result._id}>
          <h1>
            <a href="#">
              {result._source.speaker} &mdash;{' '}
              <b>
                {Array.isArray(result._source.topic)
                  ? result._source.topic.join(', ')
                  : result._source.topic}
              </b>
            </a>
            <span className="meta">
              {result._source.date}, ({result._source.session},{' '}
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
            .map(
              number =>
                number === '...' ? (
                  <Pagination.Ellipsis key={Math.random()} />
                ) : (
                  <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => navigate_to_page(number)}>
                    {number + 1}
                  </Pagination.Item>
                ),
            )}
        </Pagination>
      </div>
    </div>
  ) : null;

export default Results;
