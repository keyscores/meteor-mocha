#!/bin/sh
echo "Placing root files into dummy_app for testing"
rsync -av --relative --exclude='tests/' ./ tests/dummy_app/packages/meteor-mocha
cd tests/dummy_app/
npm run test
