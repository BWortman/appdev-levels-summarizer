# AppDevLevels Summarizer

A Node.js based console app used to summarize data contained in AppDevLevels evaluation documents.

## Overview

These instructions will cover usage information for the app.

## Prerequisites

- Install [Git](https://git-scm.com/downloads).
- Install [Node](https://nodejs.org/en/download/) (tested on version 6.9.2)
- Clone the Git repository to your local machine.

## How To

- Unless otherwise noted, all terminal commands must be issued from the project's root directory.

### Install project libraries

```bash
npm install
```

### Lint the code

```bash
npm run lint
```

### Run tests

Note that this will lint the code before running tests. No tests will run if lint errors are found.

```bash
npm test
```

### Run the app

To display usage information:

```bash
npm start -- --help
```
 
To run the app using default values:

```bash
npm start
```

To run the app using a specified source directory and target output file:

```bash
node ./app/index.js "--src=C:/Users/brian/Desktop/evals" "--targ=./levels-summary.xlsx"
```

## Troubleshooting

### API or Test Commands Don't Work Due To Missing Dependencies

* Re-run `npm install` to verify that your dependencies are up to date.

### Everything Is Hosed!

Sometimes you just need to completely clean your development environment before starting over from the beginning. The following commands will help you start from a "clean slate":

```bash
# Blow away the node_modules folder:
rm -rf node_modules
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.
