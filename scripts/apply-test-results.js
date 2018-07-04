#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const watch = require('node-watch');
const destinationPath = path.join(__dirname, '..', '.test-results.json');
const sourcePath = path.join(__dirname, '..', '.test-results.tmp.json');

if (!fs.existsSync(sourcePath)) {
    fs.writeFileSync(sourcePath, '{}', {encoding: 'utf8'});
}

if (!fs.existsSync(destinationPath)) {
    fs.writeFileSync(destinationPath, '{}', {encoding: 'utf8'});
}

function makeComparable(files) {
    return Object(files) === files && Object.keys(files).sort().reduce((accumulator, filename) => {
        const tests = files[filename];

        if (!Object(tests) === tests) {
            return false;
        }

        return accumulator.concat(Object.keys(tests).sort().map((testname) => {
            const test = tests[testname];

            if (!Object(test) === test || !test.hasOwnProperty('status')) {
                return false;
            }

            const status = test.status;

            return `${filename}:${testname}:${status}`;
        }));
    }, []).filter((t) => t).join(', ');
}

watch(sourcePath, {recursive: false}, function(evt, name) {
    let sourceContents = '{}';
    let sourceComparable = '';
    let destinationContents = '';
    let destinationComparable = '';

    try {
        sourceContents = JSON.parse(String(fs.readFileSync(sourcePath)));
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
