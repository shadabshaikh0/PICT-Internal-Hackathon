
const User = require('../models/User.js')

let load_user_dashboard = async function(req, res) { 

    
    id = req.body.id ;
    const user = { }
    user.userdata = await User.findOne({_id : id});
    res.json(user) ; 
}

module.exports = {
    load_user_dashboard : load_user_dashboard
}