#!/bin/bash
mkdir -p dist/ && watchify index.js -o dist/bundle.js -dv &
nodemon --exec npm run babel-node -- dist/bundle.js