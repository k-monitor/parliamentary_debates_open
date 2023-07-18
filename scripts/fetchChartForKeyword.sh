#!/usr/bin/env bash

mkdir -p ./src/chartData/
keyword=`echo $1 | sed 's/\"/\\\"/g'`
fname=$(( ( RANDOM % 100000 )  + 1 ))
echo $keyword
curl -XGET https://parldata-search.westeurope.cloudapp.azure.com/parldata/_search/template\? -H "Content-Type: application/json" -d "{\"id\": \"filtered_query_v2\",\"params\": {\"q\": \"$keyword\"}}" | jq "{\"$keyword\": {\"aggregations\": {\"terms\": {\"buckets\": .aggregations.terms.buckets}}}}" > ./src/chartData/$fname.json
