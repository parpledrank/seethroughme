const path = require('path');
const multer = require('multer');

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

module.exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

const multerStorageTemplate = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads/'),
  filename: (req, file, cb)=>{
    console.log('in multer', file);
    let fileName = path.parse(file.originalname).name;
    fileName = fileName.replace(/[\s]/g, "");
    let fileExtension = path.parse(file.originalname).ext;
    fileExtension = (fileExtension==='.jpg') ? '.jpeg' : '.jpg';
    cb(null, 'new-' + fileName + fileExtension);
  }
})

module.exports.fileParser = multer({storage: multerStorageTemplate});