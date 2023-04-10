# BASIRA

BASIRA is **B**ooks **a**s **S**ymbols **i**n **R**enaissance **A**rt. This README is the place for important information on running the app, etc.

## Solr

BASIRA's [Solr](https://solr.apache.org/guide/solr/latest/index.html) instance lives on its own DigitalOcean droplet.

### Web Interface

A lot of Solr's functionality can be configured via a web interface. You can access the control panel [here](http://143.198.179.92/solr). The login credentials are available in the server's MOTD, or you can ask another developer for them.

### Server Setup

The server was configured using the fairly simple instructions from [Installing Solr](https://solr.apache.org/guide/solr/latest/deployment-guide/installing-solr.html) and [Taking Solr to Production](https://solr.apache.org/guide/solr/latest/deployment-guide/taking-solr-to-production.html).

`solr` is a `systemd` service that you can access with `systemctl [action] solr`, such as `systemctl restart solr` or `systemctl status solr`. It runs under its own user (named `solr`, of course) but you shouldn't ever need to log in as `solr`.

Logs are available in `/var/solr/logs` and the Solr binaries are stored in `/opt/solr`. This separation of logs from the program itself allows easier upgrading, which is important because releases seem to come [every few months](https://archive.apache.org/dist/solr/solr/).

### A Note about Locations

If you're working on Solr configuration in the future, such as upgrades or additions, please make sure to use the default settings. The Solr documentation has a lot of stuff like "the `a` file can be found in `/foo/bar`, unless you passed the `-b` flag when running `c.sh`". It makes the docs annoying to follow even if you stick to the defaults! So please, keep files and folders in the default locations to make it easier for future developers to find.

# Installing JavaScript dependencies

If `yarn install` fails with an OpenSSL error, try running `yarn install --openssl-legacy-provider`. Node 18 switched to OpenSSL 3 which broke some packages that relied on older versions. We've upgraded the most likely culprit, `react-scripts`, but the error persists without the `--openssl-legacy-provider` flag. Eventually in the future as more packages are updated, the issue should go away.
