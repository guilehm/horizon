const request = require('request')
const StatsV2 = require('../database/models/stats-v2')

module.exports = (req, res) => {
    const endpoint = 'https://fortnite-api.theapinetwork.com/prod09/users/public/br_stats_v2'
    let uid = req.query.uid
    let platform = req.query.platform
    let token = process.env.TOKEN

    let validatePlatform = platform => {
        let platforms = ['keyboardmouse', 'gamepad', 'touch']
        return (platforms.indexOf(platform) > -1)
    }

    let handleError = (status, message) => {
        res.status(status).end(JSON.stringify({
            success: false,
            message: message,
        }))
    }

    let saveAtDatabase = data => {
        StatsV2.findOneAndUpdate({ epicName: data.epicName },
            { ...data }, {
                upsert: true, new: true, runValidators: true, rawResult: true
            }).then(() => console.log('Stats updated!')).catch((e) => console.log(e))
    }

    let handleSuccess = data => {
        if (platform && validatePlatform(platform)) {
            response = data.data[platform]
        } else {
            response = data.data
        }
        response.success = true
        response.epicName = data.epicName
        saveAtDatabase(response)
        res.end(JSON.stringify(response))
    }

    if (!token) return handleError(500, 'missing token')
    if (!uid) return handleError(400, 'uid is required')

    let options = {
        url: endpoint,
        headers: { Authorization: token },
        qs: { user_id: uid }
    }

    request(options, (error, response, body) => {
        if (error) handleError(500, error)
        data = JSON.parse(body)
        if (data.success === false) {
            handleError(200, data.errorMessage)
        }
        return handleSuccess(data)
    })
}
