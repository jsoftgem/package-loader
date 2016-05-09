(function () {
    'use strict';

    var path = require('path');
    var GetPackageJSON = require(path.join(__dirname, 'control/GetPackageJSON.js'));
    var GetDependencyDetails = require(path.join(__dirname, 'control/GetDependencyDetails.js'));
    var DownloadDependencies = require(path.join(__dirname, 'control/DownloadDependencies.js'));

    function PackageLoader(options) {
        var packageLoader = this;
        var _local = createLocal(options);
        packageLoader.setLocation = setLocation;
        packageLoader.execute = execute;
        return packageLoader;

        function setLocation(location) {
            _local.location = location;
        }

        function execute(callBack) {
            new GetPackageJSON(_local.location, function (err, data) {
                if (err) {
                    callBack(err);
                } else {
                    new GetDependencyDetails(data.dependencies, function (err, results) {
                        if (err) {
                            callBack(err);
                        } else {
                            new DownloadDependencies({
                                path: _local.location,
                                dependencies: results
                            }, callBack);
                        }
                    });
                }
            });
        }
    }

    function createLocal(options) {
        var local = {};
        if (options) {
            if (options.location) {
                local.location = options.location;
            }
        } else {
            local.location = __dirname;
        }
        return local;
    }

    module.exports = PackageLoader;

})();