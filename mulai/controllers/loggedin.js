const db = require('../routes/db.config');
const jwt = require('jsonwebtoken');
const loggedIn = (req,res, next)=>{
    if (!req.cookies.userReqistered) return next ();
    try {
        const decoded = jwt.verify(req.cookies.userReqistered, proccess.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) =>{
            if(err) return next();
            req.user = result[0];
            return next();
        } )
    }
    catch (err) {
        if(err) return next ()
    }


}
module.exports = loggedIn;
