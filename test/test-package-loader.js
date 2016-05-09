(function () {
    'use strict';

    var chai = require('chai');
    var expect = chai.expect;
    var path = require('path');
    var fs = require('fs-extra');
    var GetPackageJSON = require('../src/control/GetPackageJSON.js');
    var GetDependencyDetails = require('../src/control/GetDependencyDetails.js');
    var DownloadDependencies = require('../src/control/DownloadDependencies.js');
    var PackageLoader = require('../src/package-loader.js');

    describe('GetPackageJSON spec', function () {
        it('should get defined location package.json object', function () {
            new GetPackageJSON(path.join(__dirname, 'sample1'),
                function (err) {
                    if (err) {
                        throw err;
                    }
                    expect(data).to.be.defined;
                });
        });
    });
    describe('GetDependecyDetails spec', function () {
        it('should get package dependencies details', function () {
            new GetPackageJSON(path.join(__dirname, 'sample1'),
                function (err, data) {
                    if (err) {
                        throw err;
                    }
                    new GetDependencyDetails(data.dependencies, function (err, result) {
                        expect(err).to.be.undefined;
                        expect(result).to.be.defined;
                        expect(result.length).to.equal(5);
                    });
                });
        });
    });
    describe('DownloadDependencies spec', function () {
        it('should download package dependencies based on dependency details result', function () {
            fs.removeSync(path.join(__dirname, 'sample1/node_modules'));
            new GetPackageJSON(path.join(__dirname, 'sample1'),
                function (err, data) {
                    if (err) {
                        throw err;
                    } else {
                        new GetDependencyDetails(data.dependencies, function (err, result) {
                            new DownloadDependencies({
                                path: path.join(__dirname, 'sample1'),
                                dependencies: result
                            }, function (err) {
                                expect(err).to.not.defined;
                            });
                        });
                    }
                });
        });
    });

    describe('Package loader spec', function () {
        it('should locate the package.json file in the specified location and load its dependencies', function () {
            fs.removeSync(path.join(__dirname, 'sample2/node_modules'));
            new PackageLoader({location: path.join(__dirname, 'sample2')}).execute(function (err) {
                expect(err).to.not.defined;
            });
        });
    })
})();