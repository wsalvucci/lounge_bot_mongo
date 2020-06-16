const {
    Command
} = require("discord.js-commando");
const {
    default: fetch
} = require("node-fetch");
const Discord = require('discord.js')

module.exports = class leaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: [],
            group: 'account',
            memberName: 'leaderboard',
            description: 'Shows the top 3 leaderboard for a particular stat',
            args: [{
                key: 'stat',
                prompt: 'Need a stat (messagesSent, secondsVoice, usersSlapped, beenSlapped)',
                type: 'string'
            }]
        })
    }

    run(message, {
        stat
    }) {
        var params = {
            stat: stat
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/leaderboard')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json[0].errno) {
                    message.say('Invalid stat')
                } else {
                    const responseEmbed = new Discord.RichEmbed()
                        .setTitle('Leaderboard for: ' + stat)

                    json.forEach((user, index) => {
                        responseEmbed.addField('#' + (index + 1) + ' ' + user.name, user[stat])
                    });

                    message.reply(responseEmbed)
                }
            })
    }
}