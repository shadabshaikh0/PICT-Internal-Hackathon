const Team = require('../models/Team.js')
const shortid = require('shortid');
const User = require('../models/User.js')

let createteam = function (req, res) {
    let team_leaderid = req.body.team_leaderid;
    let team_name = req.body.team_name;
    const team_invitecode = shortid.generate();

    const new_team = new Team({
        _id: team_invitecode,
        team_leaderid: team_leaderid,
        team_name: team_name,
        team_invitecode: team_invitecode
    })
    new_team.team_members.push(team_leaderid)
    new_team.save()
        .then(() => {

            let query = {
                _id: team_leaderid
            };
            User.updateOne(query, {
                is_teamleader: 'true',
                is_inteam: 'true',
                team_id:team_invitecode
            }, function (err, affected, resp) {
                return res.json({
                    'team_invitecode': team_invitecode
                });
            })

        })
}

let jointeam = async function (req, res) {
    let reg_id = req.body.reg_id;
    let team_code = req.body.team_code;

    const filter = {
        _id: team_code
    };
    const update = {
        $push: {
            team_members: reg_id
        }
    };
    let doc = await Team.findOneAndUpdate(filter, update,{ new:true });
    
    let query = {
        _id: reg_id
    };
    User.updateOne(query, {
        is_inteam : 'true',
        team_id   : team_code 
    }, function (err, affected, resp) {
        return res.json({
            doc : doc
        });
    })

}



module.exports = {
    createteam: createteam,
    jointeam: jointeam
}