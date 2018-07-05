#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
BIN_DIR=$(npm bin)
STORYBOOK="$BIN_DIR/start-storybook"

echo '{}' > $PROJECT_DIR/.jest-test-results.json

$STORYBOOK -p 6006 -c $PROJECT_DIR/.demo -s $PROJECT_DIR "$@"
