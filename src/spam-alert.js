const {
  getTickets,
} = require('./freshdesk')

async function warnAboutSpam() {
  const spamTickets = await getTickets('spam')
  console.log(spamTickets)
  console.log(`spam-alert There are ${spamTickets.length} spam messages in Freshdesk!`)
}

async function main() {
  await warnAboutSpam()
}

main()
  .then(() => console.log('Done.'))
  .catch((err) => {
    console.error(err.message)
  })