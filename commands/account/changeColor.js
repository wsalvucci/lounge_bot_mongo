const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')

module.exports = class ChangeColorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changecolor',
            aliases: ['setcolor', 'color'],
            group: 'account',
            memberName: 'changecolor',
            description: 'Changes the color of your user role',
            args: [
                {
                    key: 'color',
                    prompt: 'You need to provide a color in hex form i.e. `#FFFFFF`',
                    type: 'string'
                }
            ]
        })
    }

    run(message, { color }) {
        var params = {
            discordId: message.author.id,
            color: color
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/changeColor')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.error !== undefined) {
                    message.reply('There was an error setting your color in the server.')
                } else {
                    var guild = this.client.guilds.get(process.env.GUILD_ID)
                    var curRole = guild.roles.find(val => val.name === message.author.tag)
                    if (curRole !== null) {
                        curRole.setColor(color)
                            .catch(err => {
                                message.reply('There was an error setting your color')
                                console.log(err)
                            })
                    } else {
                        guild.createRole({
                            name: message.author.tag,
                            color: color,
                            position: 7,
                            mentionable: false,
                            permissions: 0
                        })
                        .then(role => {
                            guild.members.get(message.author.id).addRole(role.id)
                        })
                        .catch(err => {
                            message.reply('There was an error setting your color')
                            console.log(err)
                        })
                    }
                }
            }).catch(err => {
                message.reply('There was an error setting your color')
                console.log(err)
            })
    }
}