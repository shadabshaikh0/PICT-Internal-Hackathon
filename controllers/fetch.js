const User = require('../models/User.js')
<<<<<<< HEAD

let load_user_dashboard = async function (req, res) {


=======
const Team = require('../models/Team.js')

let load_user_dashboard = async function (req, res) {

>>>>>>> dbafc05fc7db22d1e05370714d3237e028fc0e58
    id = req.body.id;
    const user = {}
    user.userdata = await User.findOne({
        _id: id
    });
<<<<<<< HEAD
    res.json(user);
=======
    if(user.userdata.is_inteam) {
        Team.findOne({
            _id: user.userdata.team_id
        })
        .then(doc => {
            const teamname = doc.team_name;
            user.team_name = teamname
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
  
>>>>>>> dbafc05fc7db22d1e05370714d3237e028fc0e58
}

module.exports = {
    load_user_dashboard: load_user_dashboard
}