// Using one second as the base unit, convert it to the desired unit
function getMultiplier(value, unit) {
    switch(unit.toLowerCase()) {
        case 'ms':
        case 'millisecond': return value * 1000; break
        case 's':
        case 'second': return value; break
        case 'm':
        case 'minute': return value / 60; break
        case 'h':
        case 'hr':
        case 'hrs':
        case 'hour':
        case 'hours': return value / 3600; break
        case 'd':
        case 'day':
        case 'days': return value / 86400; break
        case 'w':
        case 'wk':
        case 'wks':
        case 'week':
        case 'weeks': return value / 604800; break
        case 'y':
        case 'yr':
        case 'yrs':
        case 'year':
        case 'years': return value / 31557600; break
        default: return false
    }
}

exports.convertMilliseconds = (amount, unit) => getMultiplier(amount / 1000, unit)
exports.convertSeconds = (amount, unit) => getMultiplier(amount, unit)
exports.convertMinutes = (amount, unit) => getMultiplier(amount * 60, unit)
exports.convertHours = (amount, unit) => getMultiplier(amount * 3600, unit)
exports.convertDays = (amount, unit) => getMultiplier(amount * 86400, unit)
exports.convertWeeks = (amount, unit) => getMultiplier(amount * 604800, unit)
exports.convertYears = (amount, unit) => getMultiplier(amount * 31557600, unit)