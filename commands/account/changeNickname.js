const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')

module.exports = class ChangeColorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changenickname',
            aliases: ['setnickname', 'nickname'],
            group: 'account',
            memberName: 'changenickname',
            description: 'Changes your nickname in the server',
            args: [
                {
                    key: 'nickname',
                    prompt: 'You need to provide a nickname',
                    type: 'string'
                }
            ]
        })
    }

    run(message, { nickname }) {
        var params = {
            discordId: message.author.id,
            nickname: nickname
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/setNickname')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.error !== undefined) {
                    message.reply('There was an error setting your nickname in the server.')
                } else {
                    var guild = this.client.guilds.get(process.env.GUILD_ID)
                    guild.members.get(message.author.id).setNickname(nickname)
                }
            })
    }
}