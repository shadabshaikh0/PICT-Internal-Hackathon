const User = require('../models/User.js')
const Team = require('../models/Team.js')

let load_user_dashboard = async function (req, res) {

    id = req.body.id;
    const user = {}
    user.userdata = await User.findOne({
        _id: id
    });
    if(user.userdata.is_inteam) {
        Team.findOne({
            _id: user.userdata.team_id
        })
        .then(doc => {
            const teamname = doc.team_name;
            const ppt_url = doc.ppt_url;
            const ps_code = doc.ps_code;
            user.team_name = teamname;
            user.ppt_url = ppt_url;
            user.ps_code = ps_code;
            User.find({'_id': { $in: doc.team_members }})
                .then((doc) => { 
                    user.teamdata = doc;
                    res.json(user);
                })
                .catch(err => console.log(err));
                
        })
        .catch(err => console.log(err));
    }else{
        res.json(user);
    }
  
}

module.exports = {
    load_user_dashboard: load_user_dashboard
}