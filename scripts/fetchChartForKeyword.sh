#!/usr/bin/env bash

mkdir -p ./src/chartData/
echo $1
curl -XGET https://parldata-search.westeurope.cloudapp.azure.com/parldata/_search/template\? -H "Content-Type: application/json" -d "{\"id\": \"filtered_query_v2\",\"params\": {\"q\": \"$1\"}}" | jq "{\"$1\": {\"aggregations\": {\"terms\": {\"buckets\": .aggregations.terms.buckets}}}}" > ./src/chartData/$1.json
