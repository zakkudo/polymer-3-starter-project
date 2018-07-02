#!/bin/bash

set -e

BIN_DIR=$(npm bin)
WEBPACK="$BIN_DIR/webpack-dev-server"

$WEBPACK

