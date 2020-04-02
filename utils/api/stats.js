const app = require('../expressModule')

app.get('/users/addMessage', function(req, res) {
    db.collection('users').updateOne({discordId: req.query.discordId}, {$inc: {messagesSent: 1}})
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            console.error(err)
            res.send({error: err})
        })
})

app.get('/users/addVoice', function(req, res) {
    db.collection('users').updateOne({discordId: req.query.discordId}, {$inc: {secondsVoice: 1}})
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            console.error(err)
            res.send({error: err})
        })
})