// Using one gram as the base unit, convert it to the desired unit
function getMultiplier(value, unit) {
    switch(unit.toLowerCase()) {
        case 'mg':
        case 'milligrams': return value * 1000; break
        case 'g':
        case 'grams': return value; break
        case 'kg':
        case 'kilograms': return value * 0.001; break
        case 'oz':
        case 'ounces': return value * 0.03527396; break
        case 'lb':
        case 'pounds': return value * 0.00220462; break
        default: return false
    }
}

exports.convertMilligram = (amount, unit) => getMultiplier(amount / 1000, unit)
exports.convertGram = (amount, unit) => getMultiplier(amount, unit)
exports.convertKilogram = (amount, unit) => getMultiplier(amount * 1000, unit)

exports.convertOunce = (amount, unit) => getMultiplier(amount / 0.03527396, unit)
exports.convertPound = (amount, unit) => getMultiplier(amount / 0.00220462, unit)

