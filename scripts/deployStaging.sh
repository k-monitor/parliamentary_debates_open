#!/usr/bin/env bash

mv package.json package.json_; cat package.json_  | jq '.homepage = ""' > package.json; rm package.json_
CI=false yarn build
mv ./build/index.html ./build/200.html
surge --project ./build --domain staging-${TRAVIS_PULL_REQUEST}-parldata.surge.sh

curl -H "Authorization: token ${GH_TOKEN}" -X POST \
    -d "{\"body\": \"Deployed to staging: https://staging-${TRAVIS_PULL_REQUEST}-parldata.surge.sh\"}" \
    "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
