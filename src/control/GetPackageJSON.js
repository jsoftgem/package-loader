(function () {
    'use strict';
    var jsonfile = require('jsonfile');
    var path = require('path');

    function GetPackageJSON(location, callBack) {

        jsonfile.readFile(path.join(location, 'package.json'),
            function (err, data) {
                if (err) {
                    callBack(err);
                } else {
                    callBack(err, data);
                }
            });

    }

    module.exports = GetPackageJSON;

})();
