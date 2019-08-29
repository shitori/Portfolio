const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var open = require("open")

/* GET home page. */
function forIndex(req, res, next, directoryPath) {
    var files = [];
    var directories = [];
    fs.readdir(directoryPath, function (err, data) {
        if (!err) {
            data.forEach(function (el) {
                try {
                    var stats = fs.statSync(path.join(directoryPath, el));
                    if (stats.isDirectory()) {
                        directories.push(el)
                    } else {
                        files.push(el)
                    }
                } catch (e) {
                }
            });
        }
        res.render('index', {
            title: 'Express',
            files: files,
            directories: directories,
            directoryPath: directoryPath,
            error: err
        });
    });
}

router.get('/', function(req, res, next) {
    const directoryPath = path.resolve(__dirname);
    forIndex(req, res, next, directoryPath);
});

router.post('/', function (req, res, next) {
    var directoryPath = "";
    if (req.body.directory === "") {
        directoryPath = path.resolve(req.body.directoryPath);
    } else {
        directoryPath = path.resolve(path.join(req.body.directoryPath, req.body.directory));
    }
    forIndex(req, res, next, directoryPath);
});

router.get('/view', function (req, res, next) {
    res.redirect("/");
});

router.post('/view', function (req, res, next) {
    const filePath = path.resolve(path.join(req.body.directoryPath, req.body.directory));
    open(filePath, {app: 'chrome'});
    res.render('view', {filePath: filePath, directoryPath: req.body.directoryPath});

});


module.exports = router;
