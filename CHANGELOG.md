# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="7.0.0"></a>
# [7.0.0](https://github.com/mu-lib/mu-jquery-loom/compare/v6.0.1...v7.0.0) (2017-10-24)


### Bug Fixes

* bump deps ([634433e](https://github.com/mu-lib/mu-jquery-loom/commit/634433e))
* loom.crank should not deep call ([#2](https://github.com/mu-lib/mu-jquery-loom/issues/2)) ([98c8ee2](https://github.com/mu-lib/mu-jquery-loom/commit/98c8ee2))


### BREAKING CHANGES

* With this commit `loom.crank` no longer call inner
widgets, just on the current element(s)



<a name="6.0.1"></a>
## [6.0.1](https://github.com/mu-lib/mu-jquery-loom/compare/v6.0.0...v6.0.1) (2017-06-16)


### Bug Fixes

* UMD fixes ([ec8c873](https://github.com/mu-lib/mu-jquery-loom/commit/ec8c873))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/mu-lib/mu-jquery-loom/compare/v5.0.5...v6.0.0) (2017-05-07)


### Features

* normalize array result ([b79b041](https://github.com/mu-lib/mu-jquery-loom/commit/b79b041))


### BREAKING CHANGES

* `undefined` results are now mapped to `[]`.



<a name="5.0.5"></a>
## [5.0.5](https://github.com/mu-lib/mu-jquery-loom/compare/v5.0.4...v5.0.5) (2017-05-07)


### Bug Fixes

* fix unstable test ([157559e](https://github.com/mu-lib/mu-jquery-loom/commit/157559e))



<a name="5.0.4"></a>
## [5.0.4](https://github.com/mu-lib/mu-jquery-loom/compare/v5.0.3...v5.0.4) (2017-05-07)


### Bug Fixes

* don't wire if no widget ([a24d813](https://github.com/mu-lib/mu-jquery-loom/commit/a24d813))
* return undefined from callback ([9997c69](https://github.com/mu-lib/mu-jquery-loom/commit/9997c69))



<a name="5.0.3"></a>
## [5.0.3](https://github.com/mu-lib/mu-jquery-loom/compare/v5.0.2...v5.0.3) (2017-05-04)


### Bug Fixes

* bump deps ([9e1c884](https://github.com/mu-lib/mu-jquery-loom/commit/9e1c884))



<a name="5.0.2"></a>
## [5.0.2](https://github.com/mu-lib/mu-jquery-loom/compare/v5.0.1...v5.0.2) (2017-04-25)


### Bug Fixes

* bumped devDeps ([db587e2](https://github.com/mu-lib/mu-jquery-loom/commit/db587e2))



<a name="5.0.1"></a>
## [5.0.1](https://github.com/mu-lib/mu-jquery-loom/compare/v5.0.0...v5.0.1) (2017-04-25)


### Bug Fixes

* bump devDeps ([278fd8e](https://github.com/mu-lib/mu-jquery-loom/commit/278fd8e))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/mu-lib/mu-jquery-loom/compare/v4.0.2...v5.0.0) (2017-04-25)


### Features

* expr matches woven elements ([5ac9afa](https://github.com/mu-lib/mu-jquery-loom/commit/5ac9afa))


### BREAKING CHANGES

* `mu-jquery-loom/expr` now includes woven widgets.



<a name="4.0.2"></a>
## [4.0.2](https://github.com/mu-lib/mu-jquery-loom/compare/v4.0.1...v4.0.2) (2017-04-23)


### Bug Fixes

* bumped deps ([cc5332e](https://github.com/mu-lib/mu-jquery-loom/commit/cc5332e))
* use native .map ([c765a5b](https://github.com/mu-lib/mu-jquery-loom/commit/c765a5b))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/mu-lib/mu-jquery-loom/compare/v4.0.0...v4.0.1) (2017-04-23)


### Bug Fixes

* expr regexp error ([b674fb9](https://github.com/mu-lib/mu-jquery-loom/commit/b674fb9))
* expr should not match woven ([afe304e](https://github.com/mu-lib/mu-jquery-loom/commit/afe304e))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.8...v4.0.0) (2017-04-22)


### Bug Fixes

* loom.crank should only get first argument as default param. ([559076c](https://github.com/mu-lib/mu-jquery-loom/commit/559076c))
* remove selector from loom ([ef242eb](https://github.com/mu-lib/mu-jquery-loom/commit/ef242eb))
* rename twist ([3b618c2](https://github.com/mu-lib/mu-jquery-loom/commit/3b618c2))


### Features

* added expr ([667b3c3](https://github.com/mu-lib/mu-jquery-loom/commit/667b3c3))


### BREAKING CHANGES

* Renamed `twist` to `wire`. Also removed `twist` from `loom`.
* The signature of `jquery.loom` has changed.



<a name="3.0.8"></a>
## [3.0.8](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.7...v3.0.8) (2017-04-20)


### Bug Fixes

* bumped deps ([f3b673c](https://github.com/mu-lib/mu-jquery-loom/commit/f3b673c))



<a name="3.0.7"></a>
## [3.0.7](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.6...v3.0.7) (2017-04-13)


### Bug Fixes

* test fixes ([c7a4fa0](https://github.com/mu-lib/mu-jquery-loom/commit/c7a4fa0))



<a name="3.0.6"></a>
## [3.0.6](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.5...v3.0.6) (2017-04-12)


### Bug Fixes

* use $.guid instead of interal counter for weave ([812f5f3](https://github.com/mu-lib/mu-jquery-loom/commit/812f5f3))



<a name="3.0.5"></a>
## [3.0.5](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.4...v3.0.5) (2017-04-08)


### Bug Fixes

* bumped deps ([4161676](https://github.com/mu-lib/mu-jquery-loom/commit/4161676))



<a name="3.0.4"></a>
## [3.0.4](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.3...v3.0.4) (2017-04-08)


### Bug Fixes

* bumped deps ([84452b1](https://github.com/mu-lib/mu-jquery-loom/commit/84452b1))



<a name="3.0.3"></a>
## [3.0.3](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.2...v3.0.3) (2017-04-07)


### Bug Fixes

* remove peerDep ([881898f](https://github.com/mu-lib/mu-jquery-loom/commit/881898f))



<a name="3.0.2"></a>
## [3.0.2](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.1...v3.0.2) (2017-04-07)


### Bug Fixes

* bumped deps ([9443f66](https://github.com/mu-lib/mu-jquery-loom/commit/9443f66))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/mu-lib/mu-jquery-loom/compare/v3.0.0...v3.0.1) (2017-04-06)


### Bug Fixes

* bump deps ([76f1b28](https://github.com/mu-lib/mu-jquery-loom/commit/76f1b28))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/mu-lib/mu-jquery-loom/compare/v1.1.2...v3.0.0) (2017-04-06)


### Features

* initialize triggerd with complete callback ([4965486](https://github.com/mu-lib/mu-jquery-loom/commit/4965486))


### BREAKING CHANGES

* with the upgrade of mu-jquery-widget arrays are unwrapped.



<a name="1.1.2"></a>
## [1.1.2](https://github.com/mu-lib/mu-jquery-loom/compare/v1.1.1...v1.1.2) (2016-10-19)


### Bug Fixes

* UMD fixes ([9984e28](https://github.com/mu-lib/mu-jquery-loom/commit/9984e28))
* use provided jQuery ([b6e9c53](https://github.com/mu-lib/mu-jquery-loom/commit/b6e9c53))
* **packaging:** bumped deps ([a2a9c48](https://github.com/mu-lib/mu-jquery-loom/commit/a2a9c48))
* **packaging:** jQuery versions ([2261787](https://github.com/mu-lib/mu-jquery-loom/commit/2261787))
* **tests:** update constructors ([2c899d0](https://github.com/mu-lib/mu-jquery-loom/commit/2c899d0))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/mu-lib/mu-jquery-loom/compare/v1.1.0...v1.1.1) (2016-10-12)


### Bug Fixes

* **packaging:** Updated package.json and bumped deps ([37b10e8](https://github.com/mu-lib/mu-jquery-loom/commit/37b10e8))
* **tests:** test cleanup ([2e3ca0b](https://github.com/mu-lib/mu-jquery-loom/commit/2e3ca0b))
* UMD fix and formatting ([7d440ac](https://github.com/mu-lib/mu-jquery-loom/commit/7d440ac))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/mu-lib/mu-jquery-loom/compare/v1.0.1...v1.1.0) (2016-09-26)


### Features

* **jquery.loom:** added jquery.loom ([f207af1](https://github.com/mu-lib/mu-jquery-loom/commit/f207af1))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mu-lib/mu-jquery-loom/compare/v1.0.0...v1.0.1) (2016-09-26)


### Bug Fixes

* **deps:** bumped mu-jquery-wire to 5.2.0 ([f52b823](https://github.com/mu-lib/mu-jquery-loom/commit/f52b823))
* **jquery.crank:** fix package name ([86f32e8](https://github.com/mu-lib/mu-jquery-loom/commit/86f32e8))
* **tests:** correct script includes ([fa9a6f3](https://github.com/mu-lib/mu-jquery-loom/commit/fa9a6f3))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mu-lib/mu-jquery-loom/compare/v0.1.0...v1.0.0) (2016-09-23)


### Features

* **packaging:** Renamed mu-jquery-component to mu-jquery-loom ([22e8f07](https://github.com/mu-lib/mu-jquery-loom/commit/22e8f07))


### BREAKING CHANGES

* packaging: Because of the package rename developers will have to
update their code to reflect the rename.



<a name="0.1.0"></a>
# [0.1.0](https://github.com/mu-lib/mu-jquery-component/compare/v0.0.1...v0.1.0) (2016-09-22)


### Features

* **jquery.twist:** added support for configurable object creation ([#1](https://github.com/mu-lib/mu-jquery-component/issues/1)) ([ce1a195](https://github.com/mu-lib/mu-jquery-component/commit/ce1a195))



<a name="0.0.1"></a>
## [0.0.1](https://github.com/mu-lib/mu-jquery-component/compare/v0.0.0...v0.0.1) (2016-09-14)



<a name="0.0.0"></a>
# 0.0.0 (2016-09-13)
