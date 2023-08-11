#!/bin/bash

if [ -d ./dist/ ]; then
 rm -fr dist/
fi;

mkdir -p dist/