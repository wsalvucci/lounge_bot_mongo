const { Command } = require("discord.js-commando");
const measurementConverter = require('./measurementConverters')
const weightConverter = require('./weightConverters')
const temperatureConverter = require('./temperatureConverters')
const timeConverter = require('./timeConverters')

module.exports = class ConvertCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'convert',
            aliases: [],
            group: 'utility',
            memberName: 'convert',
            description: 'Converts a measurement/weight/temperature unit to another',
            args: [
                {
                    key: 'firstAmount',
                    prompt: 'You need to provide an initial amount to convert',
                    type: 'float'
                },
                {
                    key: 'firstUnit',
                    prompt: 'You need to provide the type you are converting from (cm, m, lbs, usd, etc.)',
                    type: 'string'
                },
                {
                    key: 'secondUnit',
                    prompt: 'You need to provide a type to convert to',
                    type: 'string'
                }
            ]
        })
    }

    run(message, { firstAmount, firstUnit, secondUnit }) {
        if (isNaN(firstAmount)) {
            message.reply("The value you're converting to and from must be a number")
        } else {
            var value = false
            switch(firstUnit.toLowerCase()) {
                case 'mm': 
                case 'millimeters': value = measurementConverter.convertMillimeter(firstAmount, secondUnit); break
                case 'cm': 
                case 'centimeters': value = measurementConverter.convertCentimeter(firstAmount, secondUnit); break
                case 'm': 
                case 'meters': value = measurementConverter.convertMeter(firstAmount, secondUnit); break
                case 'km':
                case 'kilometer': value = measurementConverter.convertKilometer(firstAmount, secondUnit); break
                case 'in':
                case 'inches': value = measurementConverter.convertInch(firstAmount, secondUnit); break
                case 'ft':
                case 'feet': value = measurementConverter.convertFoot(firstAmount, secondUnit); break
                case 'yrd':
                case 'yards': value = measurementConverter.convertYard(firstAmount, secondUnit); break
                case 'mi':
                case 'miles': value = measurementConverter.convertMile(firstAmount, secondUnit); break
                case 'nm':
                case 'nautical miles': value = measurementConverter.convertNauticalMile(firstAmount, secondUnit); break


                case 'mg':
                case 'milligrams': value = weightConverter.convertMilligram(firstAmount, secondUnit); break
                case 'g':
                case 'grams': value = weightConverter.convertGram(firstAmount, secondUnit); break
                case 'kg':
                case 'kilograms': value = weightConverter.convertKilogram(firstAmount, secondUnit); break
                case 'oz':
                case 'ounces': value = weightConverter.convertOunce(firstAmount, secondUnit); break
                case 'lb':
                case 'pounds': value = weightConverter.convertPound(firstAmount, secondUnit); break
                case 'st':
                case 'stones': value = weightConverter.convertStone(firstAmount, secondUnit); break
                case 'slug':  value = weightConverter.convertSlug(firstAmount, secondUnit); break
                case 'ct':
                case 'carat':  value = weightConverter.convertCarat(firstAmount, secondUnit); break

                
                case 'c':
                case 'celsius': value = temperatureConverter.convertCelsius(firstAmount, secondUnit); break
                case 'f':
                case 'fahrenheit': value = temperatureConverter.convertFahrenheit(firstAmount, secondUnit); break
                case 'k':
                case 'kelvin': value = temperatureConverter.convertKelvin(firstAmount, secondUnit); break

                
                case 'ms':
                case 'millisecond': value = timeConverter.convertMilliseconds(firstAmount, secondUnit); break
                case 's':
                case 'second': value = timeConverter.convertSeconds(firstAmount, secondUnit); break
                case 'm':
                case 'minute': value = timeConverter.convertMinutes(firstAmount, secondUnit); break
                case 'h':
                case 'hr':
                case 'hrs':
                case 'hour':
                case 'hours': value = timeConverter.convertHours(firstAmount, secondUnit); break
                case 'd':
                case 'day':
                case 'days': value = timeConverter.convertDays(firstAmount, secondUnit); break
                case 'w':
                case 'wk':
                case 'wks':
                case 'week':
                case 'weeks': value = timeConverter.convertWeeks(firstAmount, secondUnit); break
                case 'y':
                case 'yr':
                case 'yrs':
                case 'year':
                case 'years': value = timeConverter.convertYears(firstAmount, secondUnit); break

                default: value = false
            }
            if (value !== 0 && !value) {
                message.reply('Either an improper or unsupported unit was entered')
            } else {
                if (value < 1) {
                    value = Math.floor(value * 1000000) / 1000000
                } else {
                    value = Math.floor(value * 100) / 100
                }
                message.reply(firstAmount + firstUnit + ' = ' + value + secondUnit)
            }
        }
    }
}