#!/bin/bash

set -e

BIN_DIR=$(npm bin)
STORYBOOK="$BIN_DIR/start-storybook"

$STORYBOOK -p 6006

