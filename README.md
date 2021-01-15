# :warning::warning: DEPRECATED :warning::warning:

This project, and it's related TestArmada projects, will no longer be supported. No further work from the owners will be done, and no PRs will be reviewed.

# Magellan-SeleniumGrid-Executor


[![Build Status](https://travis-ci.org/TestArmada/magellan-seleniumgrid-executor.svg?branch=master)](https://travis-ci.org/TestArmada/magellan-seleniumgrid-executor)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/TestArmada/magellan-seleniumgrid-executor/branch/master/graph/badge.svg)](https://codecov.io/gh/TestArmada/magellan-seleniumgrid-executor)

Executor for [Magellan](https://github.com/TestArmada/magellan) to run [nightwatchjs](http://nightwatchjs.org/) tests on SeleniumGrid. 

**PLEASE NOTE: Executor is only supported by magellan version 10.0.5 (first version to allow executor to define its own port rule) or higher**.

## What does this executor do
 1. It allows nightwatch to talk to given selenium grid hud
 2. It runs nightwatch test by forking it as magellan child process

## How To Use
Please follow the steps

 1. `npm install testarmada-magellan-seleniumgrid-executor --save`
 2. add following block to your `magellan.json` (if there isn't a `magellan.json` please create one under your folder root)
 ```javascript
 "executors": [
    "testarmada-magellan-seleniumgrid-executor"
 ]
 ```
 3. `./node_modules/.bin/magellan ----help` to see if you can see the following content printed out
 ```
 Executor-specific (testarmada-magellan-seleniumgrid-executor)
   --seleniumgrid_browser=chrome        Run tests in chrome, firefox, etc.
   --seleniumgrid_browsers=b1,b2,..     Run multiple browsers in parallel.
   --seleniumgrid_host=localhost        Host for selenium grid (exclusive with seleniumgrid_url).
   --seleniumgrid_port=4444             Port for selenium grid (exclusive with seleniumgrid_url).
   --seleniumgrid_url=http://localhost:4URL for selenium grid (exclusive with seleniumgrid_host and seleniumgrid_port).
   --seleniumgrid_list_browsers         List the available browsers configured.
 ```
Congratulations, you're all set. 

## Customize selenium grid parameters
### `--seleniumgrid_host` and `--seleniumgrid_port`

`--seleniumgrid_port` is required to configure magellan to use a fixed selenium port for selenium grid for all workers, `--seleniumgrid_host` and `--seleniumgrid_port` will be translate to `selenium_host` and `selenium_port` in `nightwatch.json` eventually.

### `--seleniumgrid_url` is not supported for now

## Example
To run test on seleniumgrid with chrome
```console
$ ./node_modules/.bin/magellan --seleniumgrid_browser chrome --seleniumgrid_host ${GRID_HOST} --seleniumgrid_port ${GRID_PORT} --test xxx 
```

## License
Documentation in this project is licensed under Creative Commons Attribution 4.0 International License. Full details available at https://creativecommons.org/licenses/by/4.0
