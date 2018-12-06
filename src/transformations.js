import _ from 'lodash';

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
  const counts = Object.fromEntries(
    data.map(item => [item.timestamp, item.count]),
  );
  console.log('counts', Object.values(counts).reduce((a, b) => a + b, 0));
  const filledData = Array.from(
    new Set([..._.range(start, end, binsize), ...Object.keys(counts)]),
  ).map(timestamp => ({
    timestamp: timestamp * 1,
    count: counts[timestamp * 1] || 0,
  }));

  console.log('filledData', filledData);

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
    .map(a => a[1])
    .map(item => {
      const binStart = new Date(
        Math.floor(item.timestamp * 1 / binsize) * binsize,
      );
      const binEnd = new Date(
        Math.floor(item.timestamp * 1 / binsize) * binsize + binsize,
      );
      const months = [
        'Jan',
        'Feb',
        'Már',
        'Ápr',
        'Máj',
        'Jún',
        'Júl',
        'Aug',
        'Szep',
        'Okt',
        'Nov',
        'Dec',
      ];
      return {
        bucket: `${binStart.getFullYear()} ${
          months[binStart.getMonth()]
        } ${binStart.getDate()} - ${
          months[binEnd.getMonth()]
        } ${binEnd.getDate()}`,
        ...item,
      };
    });

  console.log(value.reduce((a, b) => a + b.count, 0));
  console.log(data.reduce((a, b) => a + b.count, 0));

  console.log(value);

  return value;
};
