#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
BIN_DIR=$(npm bin)
KARMA="$BIN_DIR/karma"

$KARMA start $PROJECT_DIR/karma.test.config.js --no-single-run --browsers Chrome "$@"
