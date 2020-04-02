const client = require('../bot')
const fetch = require('node-fetch')

setInterval(() => {
    client.guilds.get(process.env.GUILD_ID).channels.forEach(channel => {
        if (channel.type === 'voice') {
            var xp = -1
            channel.members.forEach(member => {
                if (!member.user.bot) {
                    xp++
                }
            });
            channel.members.forEach(member => {
                if (!member.user.bot) {
                    var params = {
                        discordId: member.user.id
                    }
                    var url = new URL(process.env.API_ENDPOINT + '/users/addVoice')
                    url.search = new URLSearchParams(params).toString()
                    fetch(url)
                        .then(res => res.json())
                        .then(json => {
                            if (json.error !== undefined) {
                                console.log(error)
                            }
                        })
                }
            });
        }
    });
}, 1000);