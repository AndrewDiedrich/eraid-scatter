//middleware is function that takes incoming request
//and modify it
module.exports = (req, res, next) => {
    //next is when middleware is all finished and passes to next middleware
    //check if user is signed in
    if (!req.user) { //stop all processes, middlewares
        return res.status(401).send({ error: 'You are not logged in!'});
    }
    //continue onto next middleware if user
    next();
};