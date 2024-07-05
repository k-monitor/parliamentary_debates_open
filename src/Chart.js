import React from 'react';
import { connect } from 'react-redux';
import {
  result_count_by_date,
  bin,
  formatBinName,
  formatBinNameMini,
} from './transformations';
import { XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { navigate_to_search } from './store/modules/search';

const dayInMs = 1000 * 60 * 60 * 24;
const binsize = dayInMs * 30

const Chart = props => {
  const onMonthClick = data => {
    const binStart = new Date(Math.floor((data.timestamp * 1) / binsize) * binsize);
    const binEnd = new Date(Math.floor((data.timestamp * 1) / binsize) * binsize + binsize);
    const startDate = `${binStart.getFullYear()}.${String(binStart.getMonth() + 1).padStart(2, 0)}.${binStart.getDate()}`;
    const endDate = `${binEnd.getFullYear()}.${String(binEnd.getMonth() + 1).padStart(2, 0)}.${binEnd.getDate()}`;

    props.navigate_to_search({
      ...props.search,
      start_date: startDate,
      end_date: endDate
    })
  }

  const onYearClick = timestamp => {
    const year = new Date(timestamp).getFullYear();
    props.navigate_to_search({
      ...props.search,
      start_date: `${year}.01.01`,
      end_date: `${year}.12.31`,
    })
  }

  return (
    <div style={props.style}>
      <BarChart
        width={props.width}
        height={props.height}
        data={bin(binsize)(result_count_by_date(props))}
        margin={
          props.mini
            ? { top: 5, right: 10, bottom: 20, left: 5 }
            : { top: 5, right: 20, bottom: 80, left: 5 }
        }>
        <Bar
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
          onClick={onMonthClick}
        />
        <XAxis
          tick={{ fill: '#ebebeb' }}
          type="number"
          dataKey="timestamp"
          angle={props.mini ? 0 : -60}
          textAnchor="end"
          domain={['dataMin', 'dataMax']}
          minTickGap={props.mini ? 10 : -15}
          tickCount={100}
          ticks={bin(binsize)(result_count_by_date(props)).map(i => i.timestamp)}
          tickFormatter={
            formatBinNameMini(binsize)
          }
          onClick={data => onYearClick(data.value)}
        />
        {!props.mini && <YAxis tick={{ fill: '#ebebeb' }} />}
        {!props.mini && (
          <Tooltip
            cursor={{ stroke: 'red', strokeWidth: 1 }}
            labelStyle={{ color: 'black' }}
            labelFormatter={formatBinName(binsize)}
            separator=": "
            itemStyle={{ color: 'black' }}
          />
        )}
      </BarChart>
    </div>
  );
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = {
  navigate_to_search,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
