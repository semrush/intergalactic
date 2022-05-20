#!/usr/bin/env bash

node ./server/main.js &
nginx-debug -g 'daemon off;'