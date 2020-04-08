const client = require('../bot')
const fetch = require('node-fetch')

if (process.env.TEST_BOT === "1") {
    messageAchievements = require('../utils/api/generateAchievements').testAchievements
} else {
    messageAchievements = require('../utils/api/generateAchievements').achievements
}

function award(member, role, amount) {
    var guild = client.guilds.get(process.env.GUILD_ID)
    var user = guild.members.get(member.user.id)
    var roleExists = user.roles.find(existingRole => existingRole.id === role)
    if (roleExists === null) {
        messageAchievements.forEach(achievement => {
            if (achievement.roleId !== role) {
                user.removeRole(achievement.roleId).catch(err => console.error(err))
            } else {
                user.addRole(achievement.roleId).catch(err => console.error(err))
                amount = Math.floor(amount / 60)
                guild.channels.get(process.env.DEFAULT_CHANNEL).send("<@" + member.user.id + ">, You just gained an achievement for having spent " + amount + " minutes in The Lounge voice chats!")
            }
        });
    }
}

function checkStatus(member) {
    var params = {
        discordId: member.user.id
    }
    var url = new URL(process.env.API_ENDPOINT + '/users/getUser')
    url.search = new URLSearchParams(params).toString()
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.error !== undefined) {
                console.log(error)
            } else {
                if (json.secondsVoice >= 172800) {
                    var newAward = messageAchievements.find(achievement => achievement.secondsVoice === 172800)
                    if (newAward !== null && newAward !== undefined) {
                        award(member, newAward.roleId, newAward.secondsVoice)
                    }
                } else if (json.secondsVoice >= 86400) {
                    var newAward = messageAchievements.find(achievement => achievement.secondsVoice === 86400)
                    if (newAward !== null && newAward !== undefined) {
                        award(member, newAward.roleId, newAward.secondsVoice)
                    }
                } else if (json.secondsVoice >= 43200) {
                    var newAward = messageAchievements.find(achievement => achievement.secondsVoice === 43200)
                    if (newAward !== null && newAward !== undefined) {
                        award(member, newAward.roleId, newAward.secondsVoice)
                    }
                } else if (json.secondsVoice >= 3600) {
                    var newAward = messageAchievements.find(achievement => achievement.secondsVoice === 3600)
                    if (newAward !== null && newAward !== undefined) {
                        award(member, newAward.roleId, newAward.secondsVoice)
                    }
                } else if (json.secondsVoice >= 60) {
                    var newAward = messageAchievements.find(achievement => achievement.secondsVoice === 60)
                    if (newAward !== null && newAward !== undefined) {
                        award(member, newAward.roleId, newAward.secondsVoice)
                    }
                }
            }
        })
}

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
                            } else {
                                checkStatus(member)
                            }
                        })
                }
            });
        }
    });
}, 1000);