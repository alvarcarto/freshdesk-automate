const _ = require('lodash')
const { stripIndent } = require('common-tags')
const BPromise = require('bluebird')
const { getTickets, createTicket } = require('./freshdesk')

function formatSubject(subject) {
  return `Check spam: ${subject}`
}

function isSpamTicketAlreadyCreated(normalTickets, spamTicket) {
  const index = _.findIndex(normalTickets, ticket => {
    return ticket.subject === formatSubject(ticket.subject)
  })

  return index !== -1
}

async function warnAboutSpam() {
  const normalTickets = await getTickets()
  const spamTickets = await getTickets({ filter: 'spam' })

  await BPromise.each(spamTickets, async (ticket) => {
    if (isSpamTicketAlreadyCreated(normalTickets, ticket)) {
      return
    }

    const newTicket = {
      subject: formatSubject(ticket.subject),
      description: stripIndent`
        See the spam ticket here: https://alvarcarto.freshdesk.com/a/tickets/${ticket.id}.
        Deal with the spam ticket and remember to close this ticket as well.
        <br><br>
        <i>This message is auto-generated by Alvar Carto Freshdesk Bot.</i>
      `,
      name: 'Alvar Carto Bot',
      email: 'no-reply@alvarcarto.com',
      priority: ticket.priority,
      status: ticket.status
    }

    await createTicket(newTicket)
  })
}

async function main() {
  await warnAboutSpam()
}

main()
  .then(() => console.log('Done.'))
  .catch((err) => {
    console.error('\nError:')
    console.error(err.stack)
  })