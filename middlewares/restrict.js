module.exports = (req, res, next) => {
    console.log(`apakah terotintekasi: ${req.isAuthenticated()}`);
    // if (req.isAuthenticated()) return next()
    // res.redirect('/login') 
    return next()
}