const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')

function legendaryBadResponse(attacker, victim) {
    var responses = [
        victim + ' stared down ' + attacker + ' to remind them of the bitch they are, so they left the server',
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function epicBadResponse(attacker, victim) {
    var responses = [
        '***' + attacker + ' whiffs like a bitch and gets absolutely curb stomped by ' + victim + '!***',
        attacker + ', you talking mad shit for someone that is about to get kicked...',
        victim + ': Get off me, bitch... \n https://media.giphy.com/media/mWcxXyXiUZ4Zi/giphy.gif',
        attacker + ' whails ' + victim + ' in the face and- \n https://media.giphy.com/media/YWWmelTdszDF9V3pvK/giphy.gif \n \n ...oh no...',
        '***Live look at ' + attacker + ' trying to slap ' + victim + '*** \n https://media.giphy.com/media/I6plPWpNVEKIM/giphy.gif',
        victim + ': GET THE FUCK OUTTA MY WAY ' + attacker + ' \n https://media.giphy.com/media/3oriNZNKQIeMsf6mmk/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function rareBadResponse(attacker, victim) {
    var responses = [
        attacker + ' gets countered by ' + victim + ' and gets slapped instead!',
        attacker + ' thinks he can slap someone...lol \n https://media.giphy.com/media/TD0NYrLpcnsTm/giphy.gif',
        victim + ' whails ' + attacker + ' with a counter attack! \n https://media.giphy.com/media/ESbUBSDJmD3Mc/giphy.gif',
        'Get lost' + attacker,
        'Nobody asked for you ' + attacker + ' \n https://tenor.com/xrPo.gif',
        attacker + ' tried picking a fight out of their league \n https://media.giphy.com/media/RBZJldqvl7XAA/giphy.gif',
        attacker + ' used kick on ' + victim + '! ' + attacker + ' hurt itself in confusion! \n https://media.giphy.com/media/xIZylOBSSTlLy/giphy.gif',
        attacker + ' tried to tackle ' + victim + ' but got denied!! \n https://media.giphy.com/media/2xPJxEc8mVlYNA4J1H/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function uncommonBadResponse(attacker, victim) {
    var responses = [
        attacker + ' tried to smack ' + victim + ', but they missed...',
        '*woooosh* \n ' + attacker + ' slap against ' + victim + ' hits nothing but air...',
        attacker + ': Swing and a miss! \n https://media.giphy.com/media/QPxSQDvByu1G0/giphy.gif',
        '***HEY BREAK IT UP ' + attacker + ' and ' + victim + '!!*** \n https://media.giphy.com/media/4b0EQh1BlkWCk/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function commonResponse(attacker, victim) {
    var responses = [
        attacker + ' pops ' + victim + ' with the inside of their hand.',
        attacker + ' smacks ' + victim + ' with the back of their hand',
        '*thwack* \n ' + attacker + ' slaps ' + victim + ' across the cheek'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function uncommonGoodResponse(attacker, victim) {
    var responses = [
        attacker + ' bitch slaps ' + victim + ' into the ground! \n http://gph.is/Z0G3pT',
        attacker + ': "THERE CAN ONLY BE ONE OF US, ' + victim + '!!! \n https://media.giphy.com/media/mFwlk5Fg6znWWhBDji/giphy.gif',
        attacker + ' slashes ' + victim + ' across the face! \n https://media.giphy.com/media/NmbDXsi4FzpcY/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function rareGoodResponse(attacker, victim) {
    var responses = [
        attacker + ' drops ' + victim + ' to the ground with a slap and slaps their corpse again!!',
        attacker + ' upper cuts ' + victim + '!! \n https://gfycat.com/powerlesscapitaliaerismetalmark',
        attacker + ' unleashes the multi-punch against ' + victim + '! \n https://tenor.com/view/%e9%ba%bb%e5%b9%be%e5%85%94-punch-gif-14162290',
        attacker + ': "HEY ' + victim.toUpperCase() + '!!! \n http://gph.is/2qDEQdM',
        '***' + attacker + ' straight up punches the shit out of ' + victim + ' and then roundhouse kicks them!!!***',
        attacker + ': Hey there, ' + victim + '!! \n https://media.giphy.com/media/Ksbd9VWBvHefK/giphy.gif',
        attacker + ' breathes on ' + victim + 's face... \n https://media.giphy.com/media/69yrZWuu7clVYvmtJi/giphy.gif',
        attacker + ' runs up to ' + victim + '. "***HIYA!!!***" \n https://media.giphy.com/media/Fmp9dqwy6XcY/giphy.gif',
        attacker + ' runs ' + victim + ' over! \n https://media.giphy.com/media/jwKC0qlOoXmcLDB4vC/giphy.gif',
        attacker + ' assaults ' + victim + ' with a quad! \n https://media.giphy.com/media/xULW8NuFfWPMUqxK92/giphy.gif',
        attacker + ' MOVE ' + victim + '!! GET OUT THE WAY! \n https://media.giphy.com/media/F09NFq9b23Xpu/giphy.gif',
        attacker + ' yeets ' + victim + ' off a cliff! \n https://media.giphy.com/media/5gfsg2p6B148U/giphy.gif'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function epicGoodResponse(attacker, victim) {
    var responses = [
        victim + ': "Why are you coming close to me?" \n' + attacker + ': "Well I cant beat the shit out of you without getting closer!" \n ***' + victim + ' got their head blown off by ' + attacker + 's slap!!!***',
        attacker + ': "***Hey ' + victim + '***." \n https://cdn.discordapp.com/attachments/517864914895765514/616093243834236929/image0.gif',
        '***' + attacker + ' SUMMONS PRESIDENT TRUMP AND BEATS THE SHIT OUT OF ' + victim + ' WITH HIM!!*** \n https://media.giphy.com/media/10S1a1PhRypYn6/giphy.gif',
        attacker + 'takes aim at ' + victim + '..... \n \n \n https://tenor.com/view/dick-punch-gif-5091485'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

function legendaryGoodResponse(attacker, victim) {
    var responses = [
        '***FUS ROH DAH!*** \n https://gfycat.com/anothernippyfly \n ***' + victim + ' GOT HIT SO DAMN HARD THEY GOT KICKED FROM THE SERVER!*** You need to reinvite them...',
        '***' + attacker + ' TAKES AIM \n LAUNCHES A STRIKE \n AAAAAANNNDD-*** \n https://media.giphy.com/media/VXJWhaO7afRe/giphy.gif \n \n ...yeah they dead...'
    ];
    return responses[Math.floor(Math.random() * (responses.length))];
}

module.exports = class ChangeColorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            aliases: [],
            group: 'random',
            memberName: 'slap',
            description: 'Slaps a targeted user with interesting results',
            args: [
                {
                    key: 'target',
                    prompt: 'You need to provide a target to slap',
                    type: 'user'
                }
            ],
            throttling: {
                usages: 1,
                duration: 30
            }
        })
    }

    run(message, { target }) {
        const guild = this.client.guilds.get(process.env.GUILD_ID)
        var attacker = guild.members.get(message.author.id)
        var victim = guild.members.get(target.id)
        var attackerName = attacker.nickname !== null ? attacker.nickname : attacker.displayName
        var victimName = victim.nickname !== null ? victim.nickname : victim.displayName
        if (message.author.id === target.id) {
            message.reply(attacker.nickname + ' slapped themself in confusion......moron....')
        } else if (target.id === "410998839089168394") {
            message.reply('No.')
        } else {
            var params = {
                attackerId: message.author.id,
                victimId: target.id
            }
            var url = new URL(process.env.API_ENDPOINT + '/users/slapUser')
            url.search = new URLSearchParams(params).toString()
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    if (json.error !== undefined) {
                        message.reply('There was an error in trying to slap')
                    } else {

                        params = {
                            discordId: message.author.id
                        }

                        var url = new URL(process.env.API_ENDPOINT + '/users/getUser')
                        url.search = new URLSearchParams(params).toString()

                        fetch(url)
                            .then(res => res.json())
                            .then(attackerJson => {
                                if (json.error !== undefined) {
                                    message.reply('There was an error in getting attacker luck stats')
                                } else {

                                    params = {
                                        discordId: target.id
                                    }

                                    var url = new URL(process.env.API_ENDPOINT + '/users/getUser')
                                    url.search = new URLSearchParams(params).toString()

                                    fetch(url)
                                        .then(res => res.json())
                                        .then(targetJson => {
                                            if (json.error !== undefined) {
                                                message.reply('There was an error in getting target luck stats')
                                            } else {

                                                var random = Math.random()

                                                if (attackerJson[0] !== undefined)
                                                    random += (attackerJson[0].luck / 100)
                                                
                                                if (targetJson[0] !== undefined)
                                                    random -= (attackerJson[0].luck / 100)

                                                if (random <= 0.01) {
                                                    //<= 0.01 - 1%
                                                    attacker.kick()
                                                    .then(message.channel.send(legendaryBadResponse(attackerName, victimName)))
                                                    .catch('I cannot kick this person...');
                                                } else if (random <= 0.05) {
                                                    //0.01 to 0.05 - 4%
                                                    message.channel.send(epicBadResponse(attackerName, victimName));
                                                } else if (random <= 0.10) {
                                                    //0.05 to 0.10 - 5%
                                                    message.channel.send(rareBadResponse(attackerName, victimName));
                                                } else if (random <= 0.25) {
                                                    //0.10 to 0.25 - 15%
                                                    message.channel.send(uncommonBadResponse(attackerName, victimName));
                                                } else if (random <= 0.75) {
                                                    //0.25 to 0.75 - 50%
                                                    message.channel.send(commonResponse(attackerName, victimName));
                                                } else if (random <= 0.90) {
                                                    //0.75 to 0.90 - 15%
                                                    message.channel.send(uncommonGoodResponse(attackerName, victimName));
                                                } else if (random <= 0.95) {
                                                    //0.90 to 0.95 - 5%
                                                    message.channel.send(rareGoodResponse(attackerName, victimName));
                                                } else if (random <= 0.99) {
                                                    //0.95 to 0.99 - 4%
                                                    message.channel.send(epicGoodResponse(attackerName, victimName));
                                                } else {
                                                    //>= 0.99 - 1%
                                                    victim.kick()
                                                    .then(message.channel.send(legendaryGoodResponse(attackerName, victimName)))
                                                    .catch(error => message.channel('I cannot kick this person...'))
                                                }
                                            }
                                        })

                                }
                            })


                    }
                })
        }
    }
}