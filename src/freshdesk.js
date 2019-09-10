const _ = require('lodash')
const request = require('request-promise')
const config = require('./config')

function sendRequest(opts) {
  const reqOpts = _.merge({
    auth: {
      'user': config.FRESHDESK_API_KEY,
      'pass': 'X'
    },
    json: true
  }, opts)

  return request(reqOpts)
}

async function getAgents() {
  const req = {
    uri: `https://${config.FRESHDESK_DOMAIN}/api/v2/agents`,
    method: 'GET'
  }

  const agents = await sendRequest(req)
  // Order by id, so that the agent order is guaranteed to be stable across queries
  // (api spec doesn't say)
  return _.orderBy(agents, 'id')
}

async function getTickets(filter) {
  const req = {
    uri: `https://${config.FRESHDESK_DOMAIN}/api/v2/tickets`,
    query: {
      order_by: 'created_at',
      order_type: 'desc',
      filter,
    },
    method: 'GET'
  }

  const tickets = await sendRequest(req)
  return tickets
}

async function assignTicketToAgent(ticketId, agentId) {
  const req = {
    uri: `https://${config.FRESHDESK_DOMAIN}/api/v2/tickets/${ticketId}`,
    method: 'PUT',
    body: {
      responder_id: agentId
    }
  }

  const updatedTicket = await sendRequest(req)
  return updatedTicket
}

function filterAgentsWithEmailDomain(agents, domain) {
  return _.filter(agents, agent => _.endsWith(_.get(agent, ['contact', 'email']), domain))
}

function getLastAssignedAgentId(tickets) {
  const ticket = _.find(tickets, ticket => !_.isNull(ticket.responder_id))
  if (!ticket) {
    return null
  }

  return ticket.responder_id
}

function getNextAgent(agents, lastAssignedAgentId) {
  const index = _.findIndex(agents, agent => agent.id === lastAssignedAgentId)
  if (index === -1) {
    return null
  }

  const nextAgent = agents[(index + 1) % agents.length]
  return nextAgent
}

module.exports = {
  getAgents,
  getTickets,
  assignTicketToAgent,
  filterAgentsWithEmailDomain,
  getLastAssignedAgentId,
  getNextAgent,
}
