# package-loader
  A simple way to dynamically load npm packages 

## Install

```
 npm install --save package-loader
```

## Usage

```
 var PackageLoader = require('package-loader');
 var npmPackageLoader = new PackageLoader({options});

/**
 BEFORE: 
   dir/location/of/package/json/package.json
   dir/location/of/package/json/src
   dir/location/of/package/json/src/index.js
**/

 npmPackageLoader.setLocation('dir/location/of/package/json');
 npmPackageLoader.execute(function(err){
    if(err){
      // error
    }
 });
  
 /**
 AFTER: 
   dir/location/of/package/json/package.json
   dir/location/of/package/json/src
   dir/location/of/package/json/src/index.js
   dir/location/of/package/json/node_modules/**
 **/

```

### Options 
 
  - location - path of the target package.json to load.
