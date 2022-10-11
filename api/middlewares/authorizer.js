const authorizer = (req, res, next) => {
    let admin=true
    if (admin) {
        next()

    }else{
        res.redirect('/')
    }
}

module.exports = authorizer