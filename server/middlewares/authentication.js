const jwt = require('jsonwebtoken')

module.exports = {
    authentication: function (req,res, next) {
        if(req.headers.hasOwnProperty('token')) {
            console.log("Input verifikasi JWT", req.headers.hasOwnProperty('token'), req.headers)
            try {
                const decoded = jwt.verify(req.headers.token, process.env.SECRET);
                console.log("Hasil verifikasi JWT", decoded)
                if( decoded != null) {
                    req.loggedInUser = decoded;
                    next()
                } else {
                    res.status(400).json({
                        message: 'Invalid Token'
                    })
                }
            } catch (err) {
                res.status(400).json({
                    message: 'Invalid Token'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide token'
            })
        }
    }
}