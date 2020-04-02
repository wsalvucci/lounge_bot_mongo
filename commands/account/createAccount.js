const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')
const moment = require('moment')

module.exports = class CreateAccountCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'createaccount',
            aliases: [],
            group: 'account',
            memberName: 'createaccount',
            description: 'Creates an account if you do not already have one'
        })
    }

    run(message) {
        var params = {
            discordId: message.author.id,
            name: message.author.username,
            timeAdded: moment().unix()
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/addUser')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.error !== undefined) {
                    message.reply(json.error)
                } else {
                    message.reply("Account created!")
                }
            })
    }
}