#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
SCRIPT_DIR="$PROJECT_DIR/scripts"
BIN_DIR=$(npm bin)
KARMA="$BIN_DIR/karma"

echo '{}' > $PROJECT_DIR/.test-results.json

$KARMA start $PROJECT_DIR/karma.test.config.js --single-run "$@"
