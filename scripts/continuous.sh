#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
BIN_DIR=$(npm bin)
KARMA="$BIN_DIR/karma"

echo '{}' > $PROJECT_DIR/.jest-test-results.json

$KARMA start $PROJECT_DIR/karma.test.config.js --no-single-run --browsers Chrome "$@"
