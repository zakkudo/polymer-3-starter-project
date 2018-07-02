#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
SCRIPT_DIR="$PROJECT_DIR/scripts"
BIN_DIR=$(npm bin)
STORYBOOK="$BIN_DIR/build-storybook"
WEBPACK="$BIN_DIR/webpack"

echo -e "\nCLEANING -------------------\n"

$SCRIPT_DIR/clean.sh

echo -e "\nBUILDING COVERAGE -------------------\n"
$SCRIPT_DIR/cover.sh

echo -e "\nBUILDING DEMO -------------------\n"
$STORYBOOK -o demo

echo -e "\nBUILDING DOCUMENTATION -------------------\n"
$SCRIPT_DIR/document.sh

echo -e "\nBUILDING PROJECT -------------------\n"
$WEBPACK
