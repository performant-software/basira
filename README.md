# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Installing JavaScript dependencies

If `yarn install` fails with an OpenSSL error, try running `yarn install --openssl-legacy-provider`. Node 18 switched to OpenSSL 3 which broke some packages that relied on older versions. We've upgraded the most likely culprit, `react-scripts`, but the error persists without the `--openssl-legacy-provider` flag. Eventually in the future as more packages are updated, the issue should go away.
