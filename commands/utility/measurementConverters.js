// Using one meter as the base unit, convert it to the desired unit
function getMultiplier(value, unit) {
    switch(unit.toLowerCase()) {
        case 'mm':
        case 'millimeters': return value * 1000; break
        case 'cm':
        case 'centimeters': return value * 100; break
        case 'm':
        case 'meters': return value; break
        case 'km':
        case 'kilometers': return value * 0.001; break
        case 'in':
        case 'inches': return value * 39.3700787; break
        case 'ft':
        case 'feet': return value * 3.2808399; break
        case 'yrd':
        case 'yards': return value * 1.0936133; break
        case 'mi':
        case 'miles': return value * 0.00062137; break
        case 'nm':
        case 'nautical miles': return value * 0.00053996; break
        default: return false
    }
}

exports.convertMillimeter = (amount, unit) => getMultiplier(amount / 1000, unit)
exports.convertCentimeter = (amount, unit) => getMultiplier(amount / 100, unit)
exports.convertMeter = (amount, unit) => getMultiplier(amount, unit)
exports.convertKilometer = (amount, unit) => getMultiplier(amount * 1000, unit)

exports.convertInch = (amount, unit) => getMultiplier(amount / 39.3700787, unit)
exports.convertFoot = (amount, unit) => getMultiplier(amount / 3.2808399, unit)
exports.convertYard = (amount, unit) => getMultiplier(amount / 1.0936133, unit)
exports.convertMile = (amount, unit) => getMultiplier(amount / 0.00062137, unit)

exports.convertNauticalMile = (amount, unit) => getMultiplier(amount / 0.00053996, unit)