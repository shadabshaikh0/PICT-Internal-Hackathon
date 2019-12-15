const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

  _id: {
    type: String,
    unique: true
  },
  team_name: String,
  team_leaderid:String,
  team_members: [{ type : String, ref: 'User' }],
  female_count:String,
  team_invitecode:String
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;