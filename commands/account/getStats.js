const {
    Command
} = require("discord.js-commando")
const {
    default: fetch
} = require("node-fetch")
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class statsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            aliases: [],
            group: 'account',
            memberName: 'stats',
            description: 'Retrieves a basic set of your stats'
        })
    }

    run(message, {}) {
        var params = {
            discordId: message.author.id
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/getUser')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                var seconds = json[0].secondsVoice % 60
                var minutes = Math.floor(json[0].secondsVoice / 60) % 60
                var hours = Math.floor(json[0].secondsVoice / 3600)

                const responseEmbed = new Discord.RichEmbed()
                    .setTitle(json[0].name)
                    .setDescription('Account Created: `' + moment.unix(json[0].timeAdded).format('dddd, MMMM Do YYYY, h:mm:ss a') + '`')
                    .setThumbnail(message.author.displayAvatarURL)
                    .addField('Messages Sent', json[0].messagesSent)
                    .addField('Time in Voice', hours + 'h ' + minutes + 'm ' + seconds + 's')
                    .addField('Users Slapped', json[0].usersSlapped)
                    .addField('Times Slapped', json[0].beenSlapped)
                    .addField('Slap Ratio', Math.floor((json[0].usersSlapped / json[0].beenSlapped) * 100) / 100)
                    .setColor(json[0].color)

                message.reply(responseEmbed)
            })
    }
}