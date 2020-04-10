const app = require('../expressModule')

const testAchievements = [
    {
        title: "1 message sent",
        roleId: "697276904725807144",
        messagesSent: 1
    },
    {
        title: "5 messages sent",
        roleId: "697276951391502358",
        messagesSent: 5
    },
    {
        title: "1 second voice",
        roleId: "697276996845043723",
        secondsVoice: 1
    },
    {
        title: "10 seconds voice",
        roleId: "697277044928675861",
        secondsVoice: 10
    },
    {
        title: "1 hour voice",
        roleId: "698319607290658838",
        secondsVoice: 3600
    }
]

exports.testAchievements = testAchievements

const achievements = [
    {
        title: "10 messages sent",
        roleId: "697299342138015774",
        messagesSent: 10
    },
    {
        title: "100 messages sent",
        roleId: "697300146991661109",
        messagesSent: 100
    },
    {
        title: "500 messages sent",
        roleId: "697300321981956146",
        messagesSent: 500
    },
    {
        title: "1000 messages sent",
        roleId: "697300426923442258",
        messagesSent: 1000
    },
    {
        title: "2500 messages sent",
        roleId: "697300591864709180",
        messagesSent: 2500
    },
    {
        title: "60 seconds voice",
        roleId: "697301663849119784",
        secondsVoice: 60
    },
    {
        title: "3600 seconds voice",
        roleId: "697301808325984259",
        secondsVoice: 3600
    },
    {
        title: "43200 seconds voice",
        roleId: "697302016254410784",
        secondsVoice: 43200
    },
    {
        title: "86400 seconds voice",
        roleId: "697302209842380840",
        secondsVoice: 86400
    },
    {
        title: "172800 seconds voice",
        roleId: "697300591864709180",
        secondsVoice: 172800
    }
]

exports.achievements = achievements

function update(list, res) {
    var promises = []
    list.forEach(achievement => {
        promises.push(new Promise(function(resolve, reject) {
            db.collection('achievements').updateOne(
                {'roleId': achievement.roleId},
                {$set: {'title': achievement.title, 'roleId': achievement.roleId}},
                {upsert: true}
                )
                .then(item => {
                    resolve()
                })
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
        }))
    });
    Promise.all(promises).then(values => {
        res.send({result: 'Complete'})
    }).catch(err => {
        console.error(err)
        res.send({error: err})
    })
}

app.get('/updateAchievements', function(req, res) {
    if (process.env.TEST_BOT === "1") {
        update(testAchievements, res)
    } else {
        update(achievements, res)
    }
})
