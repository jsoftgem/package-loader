(function () {
    'use strict';

    var lodash = require('lodash');
    var Registry = require('npm-registry');
    var npm;

    function GetDependenciesDetails(dependencies, callBack, options) {
        npm = new Registry(options);
        var results = [];
        if (dependencies) {
            var keys = lodash.keys(dependencies);
            getDependency(keys, dependencies,
                results, function (err) {
                    if (err) {
                        callBack(err);
                    } else {
                        callBack(err, results);
                    }
                });
        }
    }

    function getDependency(keys, dependencies, results, callBack, index, parent) {
        if (!index) {
            index = 0;
        }
        if (index < keys.length) {
            var name = keys[index];
            var version = dependencies[name];
            var call = name + '@' + version;
            index++;
            npm.packages.get(call, function (err, data) {
                if (err) {
                    callBack(err);
                } else {
                    var dep = data[0];
                    var dependency = createDependencyResult(dep);
                    dependency.parent = parent;
                    results.push(dependency);
                    if (dep.dependencies) {
                        var subDepKeys = lodash.keys(dep.dependencies);
                        getDependency(subDepKeys, dep.dependencies, results, function (err) {
                            if (err) {
                                callBack(err);
                            } else {
                                getDependency(keys, dependencies, results, callBack, index, parent);
                            }
                        }, 0, dependency.name);
                    } else {
                        getDependency(keys, dependencies, results, callBack, index, parent);
                    }

                }
            });
        } else {
            callBack();
        }
    }

    function createDependencyResult(data) {
        var dependency = {};
        dependency.name = data.name;
        dependency.version = data.version;
        dependency.dist = data.dist;
        return dependency;
    }

    module.exports = GetDependenciesDetails;

})();