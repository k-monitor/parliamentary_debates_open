#!/usr/bin/env bash
#
# Builds the static site that replaces the retired app: every URL on
# parlament.k-monitor.hu redirects to https://parlamonitor.k-monitor.hu/.
#
# There is nothing to bundle any more, so the "build" is a copy of public/.
# It deliberately does not run react-scripts: that would inject the app bundle
# into the redirect page and overwrite service-worker.js with a Workbox
# precache worker, resurrecting the cached old app for returning visitors.

set -euo pipefail

cd "$(dirname "$0")/.."

rm -rf build
mkdir build
cp -R public/. build/

# GitHub Pages serves 404.html for any path it does not have a file for, which
# covers the old app's routes (/parliamentary_debates_open, ?term=... and co).
cp public/index.html build/404.html

echo "Redirect site built in ./build"
