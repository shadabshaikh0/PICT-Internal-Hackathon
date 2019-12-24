const AWS = require('aws-sdk');
const Team = require('../models/Team.js')
const ID = 'AKIAJMSZADXBLN2ZDLHQ';
const SECRET = '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';
const BUCKET_NAME = 'pptsubmissions';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

let fileUpload = function (req, res) {
           
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.ppt;
    console.log(req.body,sampleFile);
    const params = {
        Bucket: BUCKET_NAME,
        Key: sampleFile.name,
        Body: sampleFile.data
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        Team.findOneAndUpdate({ _id: req.body.team_code }, {
            ppt_url : data.Location,
            ps_code : req.body.ps_code
        }, function (err, affected, resp) {
            if(err) {
                throw err;
            }
            return res.json({url: data.Location});
        })
       
    });

 

}

module.exports = {
    fileUpload: fileUpload
}