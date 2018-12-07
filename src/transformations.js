import _ from 'lodash';
function fromEntries(iterable) {
  return [...iterable].reduce(
    (obj, {0: key, 1: val}) => Object.assign(obj, {[key]: val}),
    {},
  );
}

export const buckets_to_map = buckets =>
  buckets.length
    ? Object.assign(
        {},
        {[buckets[0].key]: buckets[0].doc_count},
        buckets_to_map(buckets.slice(1)),
      )
    : {};

export const result_count_by_date = results =>
  results.aggregations.terms.buckets
    .map(term => term.dates.buckets)
    .reduce((a, b) => a.concat(b), [])
    .sort((a, b) => -(a - b))
    .map(bucket => ({
      timestamp: bucket.key,
      bucket: bucket.key_as_string,
      count: bucket.doc_count,
    }));

export const bin = binsize => data => {
  const start = Math.min(...data.map(({timestamp}) => timestamp));
  const end = Math.max(...data.map(({timestamp}) => timestamp));
  const counts = fromEntries(data.map(item => [item.timestamp, item.count]));
  const filledData = Array.from(
    new Set([..._.range(start, end, binsize), ...Object.keys(counts)]),
  ).map(timestamp => ({
    timestamp: timestamp * 1,
    count: counts[timestamp * 1] || 0,
  }));

  const value = Object.entries(
    filledData
      .map(datapoint => ({
        bin: Math.floor(datapoint.timestamp / binsize) * binsize,
        ...datapoint,
      }))
      .reduce((a, b) => {
        const key = b.bin;
        if (a[key] === undefined) {
          a[key] = {
            count: 0,
            timestamp: b.timestamp,
          };
        }
        a[key].count += b.count;
        return a;
      }, {}),
  )
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

  return value;
};

const months = [
  'jan',
  'feb',
  'már',
  'ápr',
  'máj',
  'jún',
  'júl',
  'aug',
  'szep',
  'okt',
  'nov',
  'dec',
];

export const formatBinName = binsize => timestamp => {
  const binStart = new Date(Math.floor(timestamp * 1 / binsize) * binsize);
  const binEnd = new Date(
    Math.floor(timestamp * 1 / binsize) * binsize + binsize,
  );

  return `${binStart.getFullYear()}. ${
    months[binStart.getMonth()]
  } ${binStart.getDate()}. – ${binEnd.getFullYear()}. ${
    months[binEnd.getMonth()]
  } ${binEnd.getDate()}.`;
};

export const formatBinNameShort = binsize => timestamp => {
  const binMiddle = new Date(
    Math.floor(
      (Math.floor(timestamp * 1 / binsize) * binsize +
        binsize +
        Math.floor(timestamp * 1 / binsize) * binsize) /
        2,
    ),
  );
  return `${binMiddle.getFullYear()}. ${months[binMiddle.getMonth()]}`;
};
