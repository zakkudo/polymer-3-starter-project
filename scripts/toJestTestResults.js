
/**
 * @private
 */
function cleanupLog(log) {
    return log.filter((l) => {
        return !l.includes('<Jasmine>');
    }).map((l) => {
        return l.replace(/.*webpack:\/\/\/\.(.[^)]*)/, 'at ($1');
    });
}

/**
 * @private
 */
function toAssertionResults(tests) {
    let suiteStatus;
    let suiteStartTime = new Date().getTime();
    let suiteEndTime = suiteStartTime;
    const assertionResults = Object.keys(tests).map((testname) => {
        const test = tests[testname];

        if (!test.status) {
            return null;
        }

        const fullName = testname;
        const status = test.status.toLowerCase();
        const startTime = suiteStartTime;
        const endTime = suiteEndTime + test.time;
        const failureMessages = cleanupLog(test.log);

        if (!suiteStatus) {
            suiteStatus = status;
        } else if (status === 'failed') {
            suiteStatus = status;
        }

        suiteEndTime = endTime;

        return {
            fullName,
            status,
            startTime,
            failureMessages,
            endTime,
        };
    }).filter((t) => t);

    return {
        status: suiteStatus || 'passed',
        startTime: suiteStartTime,
        endTime: suiteEndTime,
        assertionResults,
    };
}

/**
 * Converts karma json test results to a format understandable by
 * libraries that consume jest test results. This helper function expects
 * the results to be generated by <code>karma-json-reporter</code>.
 * @param {Object} testResults - Karma json test results
 */
module.exports = function karmaToJest(testResults) {
    const files = testResults;
    const jestTestResults = {
        testResults: Object.keys(files).map((filename) => {
            const tests = files[filename];
            const {assertionResults, startTime, endTime, status} = toAssertionResults(tests);

            return {
                assertionResults,
                'coverage': {},
                endTime,
                'name': filename,
                startTime,
                status,
            };
        }),
    };

    return jestTestResults;
}
