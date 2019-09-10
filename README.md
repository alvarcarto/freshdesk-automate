# freshdesk-ticket-assigner

Automatically assign tickets to Freshdesk agents.

This is a way to prevent paying for the [Automatic ticket assignment -feature](https://support.freshdesk.com/support/solutions/articles/196581-understanding-automatic-ticket-assignment) which comes only in Forest or above plans, and
Forst costs extra 20€/mo/agent compared to the Garden plan.


## Get started

* `cp .env.sample .env` and fill blanks. See https://developers.freshdesk.com/api/
* `npm i`
* Run `node src/index.js`
