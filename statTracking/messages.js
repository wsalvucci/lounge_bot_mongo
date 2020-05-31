const client = require('../bot')
const fetch = require('node-fetch')

client.on('message', (msg) => {
    var params = {
        discordId: msg.author.id
    }
    var url = new URL(process.env.API_ENDPOINT + '/users/addMessage')
    url.search = new URLSearchParams(params).toString()
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.error !== undefined) {
                console.log(error)
            } else {

            }
        })
})