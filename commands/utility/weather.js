const { Command } = require("discord.js-commando");
const fetch = require('node-fetch')
const Canvas = require('canvas')
const Discord = require('discord.js')

async function sendCanvas(message, json) {
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#ffffff'

    ctx.font = '48px sans-serif'
    ctx.fillText(json.name, 25, 70)

    ctx.font = '70px sans-serif'
    ctx.fillText(Math.floor(json.main.temp) + '\xB0F', 25, 135)

    ctx.font = '36px sans-serif'
    ctx.fillText(json.weather[0].main, 25, 200)

    ctx.font = '36px sans-serif'
    ctx.fillText('Feels like: ' + Math.floor(json.main.feels_like) + '\xB0F', 350, 70)
    ctx.fillText('Humidity: ' + json.main.humidity + '%', 350, 110)
    ctx.fillText('Wind: ' + json.wind.speed + 'mph', 350, 150)

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'weather.png')

    message.channel.send(attachment)
}

module.exports = class WeatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            aliases: [],
            group: 'utility',
            memberName: 'weather',
            description: 'Gets the current weather for a zipcode',
            args: [
                {
                    key: 'zipcode',
                    prompt: 'You need to provide a zipcode',
                    type: 'integer'
                }
            ]
        })
    }

    run(message, { zipcode }) {
        var params = {
            zip: zipcode,
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'imperial'
        }
        var url = new URL('https://api.openweathermap.org/data/2.5/weather')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.cod !== 200) {
                    message.reply('There was an error getting the weather for the given zipcode')
                } else {
                    sendCanvas(message, json)
                }
            })
    }
}