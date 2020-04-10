const client = require('../bot')
const fetch = require('node-fetch')
var messageAchievements = []

if (process.env.TEST_BOT === "1") {
    messageAchievements = require('../utils/api/generateAchievements').testAchievements
} else {
    messageAchievements = require('../utils/api/generateAchievements').achievements
}

function award(msg, role, amount) {
    var user = client.guilds.get(process.env.GUILD_ID).members.get(msg.author.id)
    var roleExists = user.roles.find(existingRole => existingRole.id === role)
    if (roleExists === null) {
        messageAchievements.forEach(achievement => {
            if (achievement.roleId !== role) {
                user.removeRole(achievement.roleId).catch(err => console.error(err))
            } else {
                user.addRole(achievement.roleId).catch(err => console.error(err))
                msg.reply("You just gained an achievement for having sent " + amount + " messages in The Lounge!")
            }
        });
    }
}

function checkStatus(msg) {
    var params = {
        discordId: msg.author.id
    }
    var url = new URL(process.env.API_ENDPOINT + '/users/getUser')
    url.search = new URLSearchParams(params).toString()
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.error !== undefined) {
                console.log(error)
            } else {
                var maxAchievement
                var maxValue = 0
                for (var i=0; i < messageAchievements.length; i++) {
                    var achievement = messageAchievements[i]
                    if (
                        json.messagesSent >= achievement.messagesSent
                        && achievement.messagesSent > maxValue
                        ) {
                        maxValue = achievement.messagesSent
                        maxAchievement = achievement
                    }
                }
                award(member, maxAchievement.roleId, maxAchievement.messagesSent)
            }
        })
}

client.on('message', (msg) => {
    var params = {
        discordId: msg.author.id
    }
    var url = new URL(process.env.API_ENDPOINT + '/users/addMessage')
    url.search = new URLSearchParams(params).toString()
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.error !== undefined) {
                console.log(error)
            } else {
                checkStatus(msg)
            }
        })
})