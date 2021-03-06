#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
SCRIPT_DIR="$PROJECT_DIR/scripts"
BIN_DIR=$(npm bin)
STORYBOOK="$BIN_DIR/start-storybook"

echo '{}' > $PROJECT_DIR/.jest-test-results.json

$SCRIPT_DIR/apply-test-results.js 2>&1 > /dev/null&
$SCRIPT_DIR/continuous.sh 2>&1 > /dev/null&

$STORYBOOK -p 6006 -c $PROJECT_DIR/.develop -s $PROJECT_DIR "$@"

