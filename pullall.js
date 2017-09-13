var exec    = require('child_process').exec;
var fs      = require('fs');
var path    = require('path');

pull = (dir) => {
    exec('git pull', {
        cwd: dir
    }, (err, stdout, stderr) => {
        console.log(dir);
        if (err) console.log(err);
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
    });
}

// Read the current directories files in.
fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    else {
        files.map((file) => {
            return path.join(__dirname, file);
        }).filter((file) => {
            return !fs.statSync(file).isFile();
        }).forEach((dir) => {
            pull(dir);
        });
    }
});

