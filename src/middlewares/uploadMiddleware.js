const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, '../../uploads/'),
        filename: (req, file, cb) => {
            if (file.mimetype === 'text/csv') {
                const {originalname} = file;
                const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
                cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
            } else {
                cb(new Error('Invalid file type. Only CSV files are allowed.'));
            }
        }
    })
});

module.exports = upload;
