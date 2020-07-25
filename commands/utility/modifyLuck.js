const { Command } = require("discord.js-commando");
const { default: fetch } = require("node-fetch");

module.exports = class ModifyLuckCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'modifyluck',
            aliases: ['addluck', 'reduceluck'],
            group: 'utility',
            memberName: 'modifyluck',
            description: 'Modifies the luck of the indicated user',
            args: [
                {
                    key: 'user',
                    prompt: 'You need to provide a user to modify their luck',
                    type: 'user'
                },
                {
                    key: 'amount',
                    prompt: 'You need to provide an amount to adjust their luck by',
                    type: 'float'
                },
                {
                    key: 'reason',
                    prompt: 'You need to provide a reason to adjust their luck',
                    type: 'string'
                }
            ],
            userPermissions: ['ADMINISTRATOR'],
        })
    }

    run(message, {user, amount, reason}) {
        var params = {
            discordId: user.id,
            amount: amount
        }

        var url = new URL(process.env.API_ENDPOINT + '/users/alterLuck')
        url.search = new URLSearchParams(params).toString()

        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.error !== undefined) {
                    message.reply('There was an error altering this user\'s luck')
                } else {
                    if (amount >= 0) {
                        message.channel.send(user.username + ' is now ' + amount + '% less likely to be kicked from the server when slapped or slapping. Reason: ' + reason)
                    } else {
                        message.channel.send(user.username + ' is now ' + Math.abs(amount) + '% more likely to be kicked from the server when slapped or slapping. Reason: ' + reason)
                    }
                }
            })
    }
}