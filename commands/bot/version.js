const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const changeLog = require('./botData').changeLog

module.exports = class CreateAccountCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'version',
            aliases: ['v'],
            group: 'bot',
            memberName: 'version',
            description: 'Returns the version of the bot and most recent change log'
        })
    }

    run(message) {
        var recentLog = changeLog[0]
        var changeNotes = recentLog.changeLog.join('\n')
        const embedResponse = new Discord.RichEmbed()
            .setColor('#FF0000')
            .setTitle('v' + recentLog.version)
            .setAuthor('Lounge Bot')
            .setDescription(changeNotes)
        message.channel.send(embedResponse)
    }
}