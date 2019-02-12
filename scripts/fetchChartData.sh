#!/usr/bin/env bash

rm -rf ./src/chartData
for i in `cat`; do ./scripts/fetchChartForKeyword.sh $i; done < <(cat src/homepage_keywords.json | jq ".[]" -r)
jq -s add ./src/chartData/*.json > ./src/ChartData.json
rm -rf ./src/chartData
