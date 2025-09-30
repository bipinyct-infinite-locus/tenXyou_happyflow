CSV-Driven: Each row in users.csv runs signup → login → happy flow with unique emails.

Parallel: Uses test.describe.parallel() + fullyParallel: true for concurrent execution.

Workers Control: workers in config sets max parallel users and can be adjusted according to the number of CSV users.

Scale Easily: Add CSV rows + adjust workers to test more users—no code changes needed.
