export default {
    testEnvironment: 'node',
    transform: {},
    verbose: true,
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
    coverageDirectory: './coverage',
};
