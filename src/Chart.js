import React from 'react';
import {
  result_count_by_date,
  bin,
  formatBinName,
  formatBinNameShort,
  formatBinNameMini,
} from './transformations';
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';

const binsize = 5184000000 * 3;

const Chart = props => (
  <div style={props.style}>
    <AreaChart
      width={props.width}
      height={props.height}
      data={bin(binsize)(result_count_by_date(props))}
      margin={
        props.mini
          ? {top: 5, right: 10, bottom: 20, left: 5}
          : {top: 5, right: 20, bottom: 80, left: 5}
      }>
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
        angle={props.mini ? 0 : -45}
        textAnchor="end"
        domain={['dataMin', 'dataMax']}
        minTickGap={props.mini ? 10 : -35}
        tickCount={100}
        ticks={bin(binsize)(result_count_by_date(props)).map(i => i.timestamp)}
        tickFormatter={
          props.mini ? formatBinNameMini(binsize) : formatBinNameShort(binsize)
        }
      />
      {!props.mini && <YAxis tick={{fill: '#ebebeb'}} />}
      {!props.mini && (
        <Tooltip
          cursor={{stroke: 'red', strokeWidth: 1}}
          labelStyle={{color: 'black'}}
          labelFormatter={formatBinName(binsize)}
          separator=": "
          itemStyle={{color: 'black'}}
        />
      )}
    </AreaChart>
  </div>
);

export default Chart;
