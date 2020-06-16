const {
    Command
} = require("discord.js-commando");
const {
    default: fetch
} = require("node-fetch");
const Discord = require('discord.js')

module.exports = class wikiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wiki',
            aliases: ['wikipedia'],
            group: 'utility',
            memberName: 'wiki',
            description: 'Searches an article on wikipedia, returns the summary, and provides a link to it',
            args: [{
                key: 'query',
                prompt: 'You need to provide a search query',
                type: 'string'
            }]
        })
    }

    run(message, {
        query
    }) {
        fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + query)
            .then(res => res.json())
            .then(json => {
                if (json['extract']) {
                    const responseEmbed = new Discord.RichEmbed()
                        .setTitle(json['title'])
                        .setURL(json['content_urls']['desktop']['page'])
                        .setAuthor('Lounge Bot Wiki')
                        .setDescription(json['extract'])
                    if (json['thumbnail']) {
                        responseEmbed.setThumbnail(json['thumbnail']['source'])
                    }
                    message.say(responseEmbed)
                } else {
                    message.say('No page found.')
                }
            })
    }
}