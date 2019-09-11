const BPromise = require('bluebird')
const _ = require('lodash')
const {
  getAgents,
  getTickets,
  assignTicketToAgent,
  filterAgentsWithEmailDomain,
  getLastAssignedAgentId,
  getNextAgent,
} = require('./freshdesk')

async function autoAssignTickets() {
  const tickets = await getTickets()
  const unassignedTickets = _.filter(tickets, ticket => _.isNull(ticket.responder_id))
  if (unassignedTickets.length < 1) {
    return
  }

  const agents = await getAgents()
  // They return agent for their internal usage with email custserv@freshdesk.com
  const alvarAgents = filterAgentsWithEmailDomain(agents, 'alvarcarto.com')

  let lastAssignedAgentId = getLastAssignedAgentId(tickets)

  // If no-one has been assigned in the tickets, just choose random agent
  let nextAgent
  if (_.isNull(lastAssignedAgentId)) {
    nextAgent = _.sample(alvarAgents)
    console.log('Assigning random agent')
  } else {
    nextAgent = getNextAgent(alvarAgents, lastAssignedAgentId)
  }

  await BPromise.each(unassignedTickets, async (ticket) => {
    await assignTicketToAgent(ticket.id, nextAgent.id)
    console.log(`Assigned ticket #${ticket.id} to ${nextAgent.contact.name}`)

    lastAssignedAgentId = nextAgent.id
    nextAgent = getNextAgent(alvarAgents, lastAssignedAgentId)
  })
}

async function main() {
  await autoAssignTickets()
}

main()
  .catch((err) => {
    console.error(err.message)
  })