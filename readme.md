# Gulp Starter

A starter kit for your front-end builds.

- Compiles, autoprefixes and minimizes your Sass (can easily switch to SCSS or LESS)
- Uglifys your JS
- Compresses your Images
- Generates a BrowserSync URL for you to access.

## Prerequisites

- You must have node and npm installed
- You must update `package.json` with your informations
- You must update licence file if not MIT
- You also need to install pngquant for optimizing png files

## Getting Started

### Install git hook (mandatory !)

    // On Win32 system
    copy .\git-hooks\pre-commit .\git\hooks
    copy .\git-hooks\pre-push .\git\hooks
    
    // On other systems
    cp ./git-hooks/pre-commit .git/hooks/
    cp ./git-hooks/pre-push .git/hooks/
    

### Install dependencies

    npm install
    apt-get install pngquant # brew install pngquant

### Build assets
    
    gulp build

### Watch assets
    
    gulp watch

## Use it for library creation

### Export

Exported lib code should be inside module.export function.

### Import

    var myLib = require('myLibName');
    
    // With ES2016 modules
    import myLib from 'node-package-starter-kit';
    
## Tests

Use mocha, chai and sinon.

    npm test
    
## Publishing

### Set npm author and save it into ~/.npmrc

    npm set init.author.name "Firstname Lastname"
    npm set init.author.email "firstname.lastname@domain.com"
    npm set init.author.url "http://domain.com"
    
### Or use the wizard

    npm adduser
    
### Tag your version

    git tag X.Y.Z
    git push origin master --tags
    
### Publish on npm

    npm publish



