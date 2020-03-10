const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.name == `SequelizeValidationError`) {
        let msg = []
        err.errors.forEach(i => {
            msg.push(i.message)
        })
        res.status(400).json(msg)
    }

    if (err.status == 400) {
        res.status(400).json(err.msg)
    }

    if (err.status == 401) {
        res.status(400).json(err.msg)
    }

    if (err.status == 404) {
        res.status(400).json(err.msg)
    }

    if (err.status == 409) {
        res.status(409).json(err.msg)
    }

    if (err.name == `SequelizeConnectionRefusedError`) {
        res.status(500).json(`Server Error`)
    }
}

module.exports = errorHandler