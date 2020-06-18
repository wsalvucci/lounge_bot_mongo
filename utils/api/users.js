const app = require('../expressModule')

app.get('/users/addUser', function(req, res) {
    db.collection('users').findOne({discordId: req.query.discordId})
        .then(item => {
            if (item === null) {
                db.collection('users').insertOne({discordId: req.query.discordId, name: req.query.name, nickname: req.query.name, timeAdded: req.query.timeAdded, messagesSent: 0, secondsVoice: 0})
                    .then(item => {
                        console.log(item)
                        res.send(item)
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(err)
                    })
            } else {
                console.log("User already exists!")
                res.send({error: "User already exists!"})
            }
        })
        .catch(err => {
            console.log(err)
            res.send({error: err})
        })
})

app.get('/users/getUser', function(req, res) {
    db.collection('users').findOne({discordId: req.query.discordId})
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            console.log(err)
            res.send({error: "Error creating account."})
        })
})

app.get('/users/changeColor', function(req, res) {
    db.collection('users').updateOne({discordId: req.query.discordId}, {$set: {color: req.query.color}})
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            console.log(err)
            res.send({error: err})
        })
})

app.get('/users/setNickname', function(req, res) {
    db.collection('users').updateOne({discordId: req.query.discordId}, {$set: {nickname: req.query.nickname}})
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            console.log(err)
            res.send({error: err})
        })
})

app.get('/users/slapUser', function(req, res) {
    db.collection('users').updateOne({discordId: req.query.attackerId}, {$inc: {usersSlapped: 1}})
        .then(item => {
            db.collection('users').updateOne({discordId: req.query.victimId}, {$inc: {beenSlapped: 1}})
                .then(item => {
                    res.send(item)
                })
                .catch(err => {
                    console.log(err)
                    res.send({error: err})
                })
        })
        .catch(err => {
            console.log(err)
            res.send({error: err})
        })
})