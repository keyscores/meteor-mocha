# CHANGELOG

## 0.2.0

* Bump aldeed:browser-tests to fix PhantomJS testing and add support for showing Electron window
* Run tests in series by default with TEST_PARALLEL=1 option to start running client tests while server tests are still running (previous behavior). This is kind of a breaking change, but we decided that a minor version bump was sufficient since it does not break anything.

## 0.1.0

* Added support for running client tests in various browsers
