const db = require('../sqlDatabase')
const app = require('../expressModule')

app.get('/users/addMessage', function (req, res) {
    db.query('UPDATE users SET messagesSent = messagesSent + 1 WHERE discordId =?', [req.query.discordId], function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})

app.get('/users/addVoice', function (req, res) {
    db.query('UPDATE users SET secondsVoice = secondsVoice + 1 WHERE discordId = ?', [req.query.discordId], function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})