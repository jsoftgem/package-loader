(function () {
    'use strict';
    var tarball = require('tarball-extract');
    var lodash = require('lodash');
    var fs = require('fs-extra');
    var path = require('path');

    function DownloadDependencies(options, callBack) {
        if (!options.path) {
            throw 'Missing path property.';
        }
        if (!options.dependencies) {
            throw 'Missing dependencies property.';
        }
        downloadDependency(path.join(options.path, 'node_modules'), options.dependencies, callBack);
    }

    function downloadDependency(dest, dependencies, callBack, index) {
        if (!index) {
            index = 0;
        }
        if (index < dependencies.length) {
            var dependency = dependencies[index];
            index++;
            var dir = dependency.parent ? path.join(dest, path.join(dependency.parent, 'node_modules')) : dest;
            var temp = path.join(dir, 'temp.tgz');
            createDirectory(dir, function (err) {
                if (err) {
                    callBack(err);
                } else {
                    tarball.extractTarballDownload(dependency.dist.tarball, temp, dir, {}, function (err) {
                        fs.rename(path.join(dir, 'package'), path.join(dir, dependency.name), function (err) {
                            if (err) {
                                callBack(err);
                            } else {
                                fs.remove(temp);
                                downloadDependency(dest, dependencies, callBack, index);
                            }
                        });
                    });
                }
            });
        } else {
            callBack();
        }
    }

    function createDirectory(dir, callBack) {
        fs.exists(dir, function (exists) {
            if (exists) {
                callBack();
            } else {
                fs.mkdirs(dir, 2, function (err) {
                    callBack(err);
                })
            }
        });
    }

    module.exports = DownloadDependencies;

})();