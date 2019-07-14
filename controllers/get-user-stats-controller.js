const request = require('request')

module.exports = (req, res) => {
    const endpoint = 'https://fortnite-api.theapinetwork.com/prod09/users/public/br_stats_v2'
    let uid = req.query.uid
    let token = process.env.TOKEN


    let handleError = (status, message) => {
        res.status(status).end(JSON.stringify({
            success: false,
            message: message,
        }))
    }

    let handleSuccess = data => {
        data.success = true
        res.end(JSON.stringify(data))
    }

    if (!token) handleError(500, 'missing token')
    if (!uid) handleError(400, 'uid is required')


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
