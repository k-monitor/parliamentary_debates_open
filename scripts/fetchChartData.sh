#!/usr/bin/env bash

rm -rf ./src/chartData
for i in `cat`; do ./scripts/fetchChartForKeyword.sh "`echo $i | sed 's/¡/ /g'`"; done < <(cat src/homepage_keywords.json | jq ".[]" -r | sed 's/ /¡/g')
jq -s add ./src/chartData/*.json > ./src/ChartData.json
rm -rf ./src/chartData
