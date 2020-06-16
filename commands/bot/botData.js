exports.changeLog = [{
        version: '1.5',
        changeLog: [
            'Added `!!stats` so you can view your own server stats stored on the database',
            'Added `!!leaderboard` so you can view the top 2 users for each stat'
        ]
    },
    {
        version: '1.4',
        changeLog: [
            'Added a `!!wiki` command to search for wikipedia articles using the bot'
        ]
    },
    {
        version: '1.3',
        changeLog: [
            '1.3.2 hotfix: Javascript is dumb',
            '1.3.1 hotfix: Some logic errors with conversions',
            'Added unit conversions select units of measurement, mass, and temperature. Use `!!convert <amount> <unit> <unit to convert to>`'
        ]
    },
    {
        version: '1.2',
        changeLog: [
            'Burned achievement system to the ground. That was a mess'
        ]
    },
    {
        version: '1.1',
        changeLog: [
            '1.1.2 hotfix: Achievement system bugs',
            '1.1.1 hotfix: Javascript is dumb',
            'Added achievement system that rewards you for participating in The Lounge. You must have an account to earn achievements (use `!!createaccount` to get one).',
            'Adding bot commands to check things like version number and change log',
            'Fixed issue with slap command returning null names for users with no nickname'
        ]
    },
    {
        version: '1.0',
        changeLog: [
            'Linked bot with Mongo Atlas and Elastic Beanstalk for 24/7 uptime and easy data management'
        ]
    }
]