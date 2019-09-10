const config = {
  FRESHDESK_API_KEY: process.env.FRESHDESK_API_KEY,
  FRESHDESK_DOMAIN: process.env.FRESHDESK_DOMAIN,
}

if (!config.FRESHDESK_API_KEY) throw new Error('Env var missing: FRESHDESK_API_KEY')
if (!config.FRESHDESK_DOMAIN) throw new Error('Env var missing: FRESHDESK_DOMAIN')

module.exports = config
