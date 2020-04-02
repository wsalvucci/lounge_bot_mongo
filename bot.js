const Commando = require('discord.js-commando')

const client = new Commando.CommandoClient({
    commandPrefix: '!!',
    owner: '194232193025966080'
})

const path = require('path')

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['account', 'Commands relating to managing your account'],
        ['random', 'Commands with random effects']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with Commando');
});

client.login(process.env.BOT_TOKEN)

module.exports = client