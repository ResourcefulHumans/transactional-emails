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

## E-Mails

### netwoRHk

#### Users

- Email verification: [HTML](http://resourcefulhumans.github.io/transactional-emails/email-verification.html), [Text](http://resourcefulhumans.github.io/transactional-emails/email-verification.txt)
- Email Change: [HTML](http://resourcefulhumans.github.io/transactional-emails/email-change.html), [Text](http://resourcefulhumans.github.io/transactional-emails/email-change.txt)
- Confirm password change: [HTML](http://resourcefulhumans.github.io/transactional-emails/password-change.html), [Text](http://resourcefulhumans.github.io/transactional-emails/password-change.txt)

- Set first password: [HTML](http://resourcefulhumans.github.io/transactional-emails/set-first-password.html), [Text](http://resourcefulhumans.github.io/transactional-emails/set-first-password.txt)

#### Commitments

- Invite to contribute: [HTML](http://resourcefulhumans.github.io/transactional-emails/invite-to-contribute.html), [Text](http://resourcefulhumans.github.io/transactional-emails/invite-to-contribute.txt)
  - Invite accepted: [HTML](http://resourcefulhumans.github.io/transactional-emails/invite-to-contribute-accepted.html), [Text](http://resourcefulhumans.github.io/transactional-emails/invite-to-contribute-accepted.txt)
  - Invite declined: [HTML](http://resourcefulhumans.github.io/transactional-emails/invite-to-contribute-declined.html), [Text](http://resourcefulhumans.github.io/transactional-emails/invite-to-contribute-declined.txt)
- Request to contribute: [HTML](http://resourcefulhumans.github.io/transactional-emails/request-to-contribute.html), [Text](http://resourcefulhumans.github.io/transactional-emails/request-to-contribute.txt)
  - Request rejected: [HTML](http://resourcefulhumans.github.io/transactional-emails/request-to-contribute-rejected.html), [Text](http://resourcefulhumans.github.io/transactional-emails/request-to-contribute-rejected.txt)
- Added to contribution: [HTML](http://resourcefulhumans.github.io/transactional-emails/added-to-contribution.html), [Text](http://resourcefulhumans.github.io/transactional-emails/added-to-contribution.txt)
- Request to uncommit: [HTML](http://resourcefulhumans.github.io/transactional-emails/request-to-uncommit.html), [Text](http://resourcefulhumans.github.io/transactional-emails/request-to-uncommit.txt)
  - Request rejected: [HTML](http://resourcefulhumans.github.io/transactional-emails/request-to-uncommit-rejected.html), [Text](http://resourcefulhumans.github.io/transactional-emails/request-to-uncommit-rejected.txt)
- Removed from contribution: [HTML](http://resourcefulhumans.github.io/transactional-emails/removed-from-contribution.html), [Text](http://resourcefulhumans.github.io/transactional-emails/removed-from-contribution.txt)
- Update status to commitment: [HTML](http://resourcefulhumans.github.io/transactional-emails/commitment-status-updated.html), [Text](http://resourcefulhumans.github.io/transactional-emails/commitment-status-updated.txt)

#### Contributions

- Contribution updated: [HTML](http://resourcefulhumans.github.io/transactional-emails/contribution-updated.html), [Text](http://resourcefulhumans.github.io/transactional-emails/contribution-updated.txt)
- Tasks
  - Task added: [HTML](http://resourcefulhumans.github.io/transactional-emails/task-added.html), [Text](http://resourcefulhumans.github.io/transactional-emails/task-added.txt)
  - Task completed: [HTML](http://resourcefulhumans.github.io/transactional-emails/task-completed.html), [Text](http://resourcefulhumans.github.io/transactional-emails/task-completed.txt)
  - Task incompleted: [HTML](http://resourcefulhumans.github.io/transactional-emails/task-incompleted.html), [Text](http://resourcefulhumans.github.io/transactional-emails/task-incompleted.txt)
  - Task deleted: [HTML](http://resourcefulhumans.github.io/transactional-emails/task-deleted.html), [Text](http://resourcefulhumans.github.io/transactional-emails/task-deleted.txt)
- Notification about new, open contribution: [HTML](http://resourcefulhumans.github.io/transactional-emails/interesting-contribution.html), [Text](http://resourcefulhumans.github.io/transactional-emails/interesting-contribution.txt)
- Ownership Handover
  - Requested: [HTML](http://resourcefulhumans.github.io/transactional-emails/owner-handover-requested.html), [Text](http://resourcefulhumans.github.io/transactional-emails/owner-handover-requested.txt)
  - Approved: [HTML](http://resourcefulhumans.github.io/transactional-emails/owner-handover-approved.html), [Text](http://resourcefulhumans.github.io/transactional-emails/owner-handover-approved.txt)
  - Rejected: [HTML](http://resourcefulhumans.github.io/transactional-emails/owner-handover-rejected.html), [Text](http://resourcefulhumans.github.io/transactional-emails/owner-handover-rejected.txt)

#### Health Engine

- Commitments degraded: [HTML](http://resourcefulhumans.github.io/transactional-emails/healthengine-commitments-degraded.html), [Text](http://resourcefulhumans.github.io/transactional-emails/healthengine-commitments-degraded.txt)
- Commitments degrade pending: [HTML](http://resourcefulhumans.github.io/transactional-emails/healthengine-commitments-degrade-pending.html), [Text](http://resourcefulhumans.github.io/transactional-emails/healthengine-commitments-degrade-pending.txt)
- Customer Contribution Status degraded: [HTML](http://resourcefulhumans.github.io/transactional-emails/healthengine-customer-contribution-status-degraded.html), [Text](http://resourcefulhumans.github.io/transactional-emails/healthengine-customer-contribution-status-degraded.txt)
- Customer Contribution Status degrade pending: [HTML](http://resourcefulhumans.github.io/transactional-emails/healthengine-customer-contribution-status-degrade-pending.html), [Text](http://resourcefulhumans.github.io/transactional-emails/healthengine-customer-contribution-status-degrade-pending.txt)
- Customer Contribution Status changed: [HTML](http://resourcefulhumans.github.io/transactional-emails/healthengine-customer-contribution-status-changed.html), [Text](http://resourcefulhumans.github.io/transactional-emails/healthengine-customer-contribution-status-changed.txt)

#### Slack

- Link verification code: [HTML](http://resourcefulhumans.github.io/transactional-emails/slack-link.html), [Text](http://resourcefulhumans.github.io/transactional-emails/slack-link.txt)

#### staRHs

- staRHs notification: [HTML](http://resourcefulhumans.github.io/transactional-emails/starhs.html), [Text](http://resourcefulhumans.github.io/transactional-emails/starhs.txt)

- staRHs reminder: [HTML](http://resourcefulhumans.github.io/transactional-emails/starhs-reminder.html), [Text](http://resourcefulhumans.github.io/transactional-emails/starhs-reminder.txt)

- staRHs first streak: [HTML](http://resourcefulhumans.github.io/transactional-emails/starhs-first-streak.html), [Text](http://resourcefulhumans.github.io/transactional-emails/starhs-first-streak.txt)

- staRHs again streak: [HTML](http://resourcefulhumans.github.io/transactional-emails/starhs-again-streak.html), [Text](http://resourcefulhumans.github.io/transactional-emails/starhs-again-streak.txt)

- staRHs lost streak: [HTML](http://resourcefulhumans.github.io/transactional-emails/starhs-lost-streak.html), [Text](http://resourcefulhumans.github.io/transactional-emails/starhs-lost-streak.txt)

### caRHds

#### Users

- Email verification: [HTML](http://resourcefulhumans.github.io/transactional-emails/carhds-email-verification.html), [Text](http://resourcefulhumans.github.io/transactional-emails/carhds-email-verification.txt)
- Confirm password change: [HTML](http://resourcefulhumans.github.io/transactional-emails/carhds-password-change.html), [Text](http://resourcefulhumans.github.io/transactional-emails/carhds-password-change.txt)

#### Meetings

- Invite to Meeting: [HTML](http://resourcefulhumans.github.io/transactional-emails/carhds-invite-to-meeting.html), [Text](http://resourcefulhumans.github.io/transactional-emails/carhds-invite-to-meeting.txt)
