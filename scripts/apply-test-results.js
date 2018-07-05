#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const watch = require('node-watch');
const destinationPath = path.resolve(__dirname, '..', '.jest-test-results.json');
const sourcePath = path.resolve(__dirname, '..', '.karma-test-results.json');
const toJestTestResults = require('./toJestTestResults');

if (!fs.existsSync(sourcePath)) {
    fs.writeFileSync(sourcePath, '{}', {encoding: 'utf8'});
}

if (!fs.existsSync(destinationPath)) {
    fs.writeFileSync(destinationPath, '{}', {encoding: 'utf8'});
}

function makeComparable(contents = {}) {
    const testResults = contents.testResults || {};

    return testResults.reduce((accumulator, suite) => {
        const assertionResults = suite.assertionResults || [];

        return accumulator.concat(assertionResults.map((test) => {
            const fullName = test.fullName;
            const status = test.status;
            const failureMessages = test.failureMessages.join(':') || 'none';

            return `${suite.name}:${fullName}:${status}:${failureMessages}`;
        }));
    }, []).sort().join(', ');
}


watch(sourcePath, {recursive: false}, function(evt, name) {
    let sourceContents = '{}';
    let sourceComparable = '';
    let destinationContents = '';
    let destinationComparable = '';

    try {
        sourceContents = toJestTestResults(JSON.parse(String(fs.readFileSync(sourcePath))));
        sourceComparable = makeComparable(sourceContents);
    } catch (e) {
    }

    try {
        destinationContents = JSON.parse(String(fs.readFileSync(destinationPath)));
        destinationComparable = makeComparable(destinationContents);
    } catch (e) {
    }

    if (sourceComparable !== destinationComparable) {
        fs.writeFileSync(destinationPath, JSON.stringify(sourceContents, null, 4), {encoding: 'utf8'});

    }
});
