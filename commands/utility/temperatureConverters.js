// Using one celsius as the base unit, convert it to the desired unit
function getMultiplier(value, unit) {
    switch(unit.toLowerCase()) {
        case 'c':
        case 'celsius': return value; break
        case 'f':
        case 'fahrenheit': return (value * 1.8) + 32; break
        case 'k':
        case 'kelvin': return value * 0.001; break
        default: return false
    }
}

exports.convertFahrenheit = (amount, unit) => {
    if (amount == 32){
        return 0
    }
    else {
        return getMultiplier((amount - 32)/1.8, unit)
    }
}

exports.convertCelsius = (amount, unit) => getMultiplier(amount, unit)
exports.convertKelvin = (amount, unit) => getMultiplier(amount - 273.15, unit)