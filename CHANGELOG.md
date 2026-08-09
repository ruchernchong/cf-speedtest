## [1.0.3](https://github.com/ruchernchong/cf-speedtest/compare/v1.0.2...v1.0.3) (2026-02-28)


### Bug Fixes

* **docker:** run containers as non-root user ([ad0472b](https://github.com/ruchernchong/cf-speedtest/commit/ad0472be3f6d5527cd409d9f6c5b4ee390b8145e))

## [2.0.1](https://github.com/ruchernchong/cfspeed/compare/v2.0.1...v2.0.1) (2026-08-09)


### ⚠ BREAKING CHANGES

* remove Node/npm packaging and switch CI to Go-only
* Exported types (Stats, Metadata, ServerLocation) removed. Re-exports Results from @cloudflare/speedtest instead.

### Features

* remove Node/npm packaging and switch CI to Go-only ([57db909](https://github.com/ruchernchong/cfspeed/commit/57db90921a09dfb51eeaa011593bd0abf84a9532))
* replace manual speed test with @cloudflare/speedtest ([62a31e6](https://github.com/ruchernchong/cfspeed/commit/62a31e695ceccdbe7c0dc4412d1e29882446f112))


### Bug Fixes

* **docker:** run containers as non-root user ([ad0472b](https://github.com/ruchernchong/cfspeed/commit/ad0472be3f6d5527cd409d9f6c5b4ee390b8145e))
* import math for Jitter absolute delta ([72c84ec](https://github.com/ruchernchong/cfspeed/commit/72c84ec64e820af955648090d0a69fa6f1b253f6))
* import sync for color OnceValue detection ([23fe797](https://github.com/ruchernchong/cfspeed/commit/23fe797f620b50c199491596d1df1014c133ce67))
* publish prebuilt binaries after empty v2.0.0 release ([0a79d5f](https://github.com/ruchernchong/cfspeed/commit/0a79d5f4b737d648db3500994566a9e8307dca4b))
* suppress transferSize errors from @cloudflare/speedtest in Node.js ([3e67222](https://github.com/ruchernchong/cfspeed/commit/3e67222c2acfa9aafa9f93a58df84a1f8d6a60e8))
* update Cloudflare API endpoints and add install options ([b7cd877](https://github.com/ruchernchong/cfspeed/commit/b7cd87797c04f4860b0d0d608ee45eb8629fde00))
* use /v2 module path so go install [@latest](https://github.com/latest) works ([a930161](https://github.com/ruchernchong/cfspeed/commit/a930161ecf97ce12fa1b3379f9d97aa61888196c))
* use hostname for Cloudflare trace URL ([2e89dc2](https://github.com/ruchernchong/cfspeed/commit/2e89dc23c76706be81fd3a5207d032cf6dd12d7f))

## [2.0.1](https://github.com/ruchernchong/cf-speedtest/compare/v2.0.0...v2.0.1) (2026-08-09)


### Bug Fixes

* publish prebuilt binaries after empty v2.0.0 release ([0a79d5f](https://github.com/ruchernchong/cf-speedtest/commit/0a79d5f4b737d648db3500994566a9e8307dca4b))

## [2.0.0](https://github.com/ruchernchong/cf-speedtest/compare/v1.0.3...v2.0.0) (2026-08-09)


### ⚠ BREAKING CHANGES

* remove Node/npm packaging and switch CI to Go-only

### Features

* remove Node/npm packaging and switch CI to Go-only ([57db909](https://github.com/ruchernchong/cf-speedtest/commit/57db90921a09dfb51eeaa011593bd0abf84a9532))


### Bug Fixes

* import math for Jitter absolute delta ([72c84ec](https://github.com/ruchernchong/cf-speedtest/commit/72c84ec64e820af955648090d0a69fa6f1b253f6))
* import sync for color OnceValue detection ([23fe797](https://github.com/ruchernchong/cf-speedtest/commit/23fe797f620b50c199491596d1df1014c133ce67))
* use hostname for Cloudflare trace URL ([2e89dc2](https://github.com/ruchernchong/cf-speedtest/commit/2e89dc23c76706be81fd3a5207d032cf6dd12d7f))

## [1.0.2](https://github.com/ruchernchong/cf-speedtest/compare/v1.0.1...v1.0.2) (2026-02-28)


### Bug Fixes

* update Cloudflare API endpoints and add install options ([b7cd877](https://github.com/ruchernchong/cf-speedtest/commit/b7cd87797c04f4860b0d0d608ee45eb8629fde00))

## [1.0.1](https://github.com/ruchernchong/cf-speedtest/compare/v1.0.0...v1.0.1) (2026-02-28)


### Bug Fixes

* suppress transferSize errors from @cloudflare/speedtest in Node.js ([3e67222](https://github.com/ruchernchong/cf-speedtest/commit/3e67222c2acfa9aafa9f93a58df84a1f8d6a60e8))

# [1.0.0](https://github.com/ruchernchong/cf-speedtest/compare/v0.2.4...v1.0.0) (2026-02-28)


* feat!: replace manual speed test with @cloudflare/speedtest ([62a31e6](https://github.com/ruchernchong/cf-speedtest/commit/62a31e695ceccdbe7c0dc4412d1e29882446f112))


### BREAKING CHANGES

* Exported types (Stats, Metadata,
ServerLocation) removed. Re-exports Results from
@cloudflare/speedtest instead.

- Patch @cloudflare/speedtest to remove isomorphic-fetch,
  enabling Node.js compatibility via native fetch
- Skip packet loss (requires WebRTC, unavailable in Node)
- Gracefully handle connection errors with partial results
- Remove measurement, utility, and constant modules

# cf-speedtest

## 0.2.4

### Patch Changes

- [#21](https://github.com/ruchernchong/cf-speedtest/pull/21) [`ec29d45`](https://github.com/ruchernchong/cf-speedtest/commit/ec29d454ccdf4d6111df3907adb5393a54498f42) Thanks [@ruchernchong](https://github.com/ruchernchong)! - Add metadata to `package.json`

## 0.2.3

### Patch Changes

- [#16](https://github.com/ruchernchong/cf-speedtest/pull/16) [`de38b06`](https://github.com/ruchernchong/cf-speedtest/commit/de38b06a71c913d742f18892395eede32f576d74) Thanks [@ruchernchong](https://github.com/ruchernchong)! - Add minimum node version for this script to run

## 0.2.2

### Patch Changes

- [#13](https://github.com/ruchernchong/cf-speedtest/pull/13) [`b21e664`](https://github.com/ruchernchong/cf-speedtest/commit/b21e664a094557ecb071ef29f8d184443518d485) Thanks [@ruchernchong](https://github.com/ruchernchong)! - Improve performance

## 0.2.1

### Patch Changes

- [#9](https://github.com/ruchernchong/cf-speedtest/pull/9) [`2b47d0d`](https://github.com/ruchernchong/cf-speedtest/commit/2b47d0d71bb350d38f05c7c9b0fdfba7c2a7f374) Thanks [@ruchernchong](https://github.com/ruchernchong)! - Separate executable from code

## 0.2.0

### Minor Changes

- cef1d50: THIS IS A BREAKING CHANGE

  - Name of command has been renamed from `cf-speedtest-cli`
  - As a result of the change above, the package name has been changed to `cf-speedtest` as well in order for `npx cf-speedtest` to work seamlessly
