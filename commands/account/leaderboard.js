const {
    Command
} = require("discord.js-commando");
const {
    default: fetch
} = require("node-fetch");
const Discord = require('discord.js')
const Canvas = require('canvas')

async function sendCanvas(message, json, stat) {
    const canvas = Canvas.createCanvas(700,300)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('images/statsBackground.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.font = '48px sans-serif'
    ctx.fillStyle = '#ffffff'

    ctx.fillText('Leaderboard for ' + stat, 50, 50, canvas.width-100)

    ctx.font = '36px sans-serif'

    json.forEach((user, index) => {
        ctx.fillText((index+1), 75, 50*(index+1)+50)
        ctx.fillText(user.name, 150, 50*(index+1)+50)
        ctx.fillText(user[stat], 500, 50*(index+1)+50)
    })

    const attachment = new Discord.Attachment(canvas.toBuffer())

    message.channel.send(attachment)
}

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

                    sendCanvas(message, json, stat)
                }
            })
    }
}