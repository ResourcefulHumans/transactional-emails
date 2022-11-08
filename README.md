# transactional-emails

[![Build Status](https://travis-ci.org/ResourcefulHumans/transactional-emails.svg?branch=master)](https://travis-ci.org/ResourcefulHumans/transactional-emails)
[![monitored by greenkeeper.io](https://img.shields.io/badge/greenkeeper.io-monitored-brightgreen.svg)](http://greenkeeper.io/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/ResourcefulHumans/transactional-emails/badges/gpa.svg)](https://codeclimate.com/github/ResourcefulHumans/transactional-emails)

[![NPM](https://nodei.co/npm/transactional-emails.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/transactional-emails/)

This repository contains the transactional emails we send from our products.
They are installable via npm and are also published to this repositories gh-pages branch for preview.

To deploy new version do following steps:

- ssh to production
- run node dist/console configure-mailer

To preview the emails run npm build
