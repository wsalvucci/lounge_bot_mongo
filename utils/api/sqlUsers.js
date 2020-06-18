const db = require('../sqlDatabase')
const app = require('../expressModule')

app.get('/users/addUser', function (req, res) {
    db.query('SELECT * FROM users WHERE discordId=?', [req.query.discordId], function (err, data) {
        if (data.length === 0) {
            db.query('INSERT INTO users (discordId, name, timeAdded) VALUES (?,?,?)',
                [req.query.discordId, req.query.name, req.query.timeAdded],
                function (err, data) {
                    if (err)
                        res.send(err)
                    else
                        res.send(data)
                })
        } else {
            res.send({
                error: "User already exists!"
            })
        }
    })
})

app.get('/users/getUser', function (req, res) {
    db.query('SELECT * FROM users WHERE discordId=?', [req.query.discordId], function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})

app.get('/users/changeColor', function (req, res) {
    db.query('UPDATE users SET color=? WHERE discordId=?', [req.query.color, req.query.discordId], function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})

app.get('/users/setNickname', function (req, res) {
    db.query('UPDATE users SET nickname=? WHERE discordId=?', [req.query.nickname, req.query.discordId], function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})

app.get('/users/slapUser', function (req, res) {
    db.query('UPDATE users SET usersSlapped = usersSlapped + 1 WHERE discordId=?', [req.query.attackerId], function (err, data) {})
    db.query('UPDATE users SET beenSlapped = beenSlapped + 1 WHERE discordId=?', [req.query.victimId], function (err, data) {})
    res.send({})
})

app.get('/users/leaderboard', function (req, res) {
    db.query('SELECT * FROM users ORDER BY ' + req.query.stat + ' DESC LIMIT 3', function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})