//middleware is function that takes incoming request
//and modify it
module.exports = (req, res, next) => {
    if (req.user.credits < 1) { //w3 html status codes
        return res.status(403).send({ error: 'Not enough credits! Buy More!'});
    }

    next();
};