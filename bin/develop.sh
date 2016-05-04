#!/bin/bash
mkdir -p dist/
esw app/** & watchify app/main.js -t [ babelify --presets [ es2015 react stage-0 ] ] -o dist/bundle.js -dv & nodemon --ignore 'app/' --ignore 'dist/' --exec babel-node ./server.js