#!/bin/bash
mkdir -p dist/ && watchify app/main.js -t [ babelify --presets [ es2015 react stage-0 ] ] -o dist/bundle.js -dv &
nodemon --ignore './app' --exec babel-node ./server.js