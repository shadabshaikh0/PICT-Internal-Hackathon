
let fileUpload = function (req, res) {
           
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.ppt;
    console.log(sampleFile);
    res.send('File uploaded!');

}

module.exports = {
    fileUpload: fileUpload
}