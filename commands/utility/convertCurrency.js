const { Command } = require("discord.js-commando");
const fetch = require('node-fetch')

module.exports = class ConvertCurrencyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'convertcurrency',
            aliases: ['currency'],
            group: 'utility',
            memberName: 'convertcurrency',
            description: 'Gets the curernt exchange rate from one currency to another',
            args: [
                {
                    key: 'firstCurrency',
                    prompt: 'You need to provide a currency to convert from',
                    type: 'string'
                },
                {
                    key: 'amount',
                    prompt: 'You need to provide an amount of currency to convert',
                    type: 'float'
                },
                {
                    key: 'secondCurrency',
                    prompt: 'You need to provide a currency to convert to',
                    type: 'string'
                }
            ]
        })
    }

    run(message, {firstCurrency, amount, secondCurrency}) {
        var params = {
            function: 'CURRENCY_EXCHANGE_RATE',
            from_currency: firstCurrency,
            to_currency: secondCurrency,
            apikey: process.env.ALPHA_VANTAGE_KEY
        }
        var url = new URL('https://www.alphavantage.co/query')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json['Error Message'] !== undefined) {
                    message.reply('Invalid currency(ies) given')
                } else {
                    var exRate = json["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
                    var newValue = amount * exRate
                    message.channel.send(amount + ' ' + firstCurrency + ' = ' + newValue + ' ' + secondCurrency)
                }
            })
    }
}