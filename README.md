# freshdesk-automate

Various Freshdesk automation tasks:

* **Automatically assign tickets to Freshdesk agents**

    This is a way to prevent paying for the [Automatic ticket assignment -feature](https://support.freshdesk.com/support/solutions/articles/196581-understanding-automatic-ticket-assignment) which comes only in Forest or above plans, and
    Forst costs extra 20€/mo/agent compared to the Garden plan.

* **Make sure we don't forget some messages in Spam box**

    Spam box can't be disabled in Freshdesk. This was made just in case we'd miss something in
    there.

## Get started

* `cp .env.sample .env` and fill blanks. See https://developers.freshdesk.com/api/
* `npm i`
* Run `node src/auto-assign-tickets.js` or `node src/spam-alert.js`
