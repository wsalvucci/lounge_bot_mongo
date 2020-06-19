const {
    Command
} = require("discord.js-commando")
const {
    default: fetch
} = require("node-fetch")
const Discord = require('discord.js')
const moment = require('moment')
const Canvas = require('canvas')

async function sendCanvas(message, json) {
    var seconds = json[0].secondsVoice % 60
    var minutes = Math.floor(json[0].secondsVoice / 60) % 60
    var hours = Math.floor(json[0].secondsVoice / 3600)
    var level = Math.pow(json[0].secondsVoice / 10 + json[0].messagesSent + (json[0].usersSlapped + json[0].beenSlapped) * 20,0.95)/ 100

    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('images/statsBackground.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL)
    ctx.drawImage(avatar, 25, 30, 200, 200)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(message.author.tag, 25, 25)

    ctx.font = '48px sans-serif'
    ctx.fillStyle = '#FFA700'
    ctx.fillText('Lv. ' + Math.floor(level), 250, 65)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Time In Voice Chat', 250, 125)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(hours + 'h ' + minutes + 'm ' + seconds + 's', 250, 150)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Messages Sent', 250, 200)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(json[0].messagesSent, 250, 225)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Users Slapped', 500, 50)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(json[0].usersSlapped, 500, 75)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Been Slapped', 500, 125)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(json[0].beenSlapped, 500, 150)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('Slap Ratio', 500, 200)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(Math.floor((json[0].usersSlapped / json[0].beenSlapped) * 100) / 100, 500, 225)

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')

    message.channel.send(attachment)
}

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
                if (json[0] === undefined) {
                    message.reply('There was an error getting your stats')
                    console.log('STATS DATA FAIL')
                    console.log(json)
                } else {
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

                    sendCanvas(message, json)
                }
            })
    }
}