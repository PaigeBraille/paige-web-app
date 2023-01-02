# Paige Web App

### Online version 

- This repo also autodeploys a demo version of the web app to netlify
- It can be found at https://paigetranslate.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/ffbf45ea-ca3f-4802-8933-cf564f1eaed1/deploy-status)](https://app.netlify.com/sites/paigetranslate/deploys)

### Building for deployment

To build run:
- `npm install` (this will install all dependencies)
- `npm run package` (this will use [Gulp](https://gulpjs.com/) alongside multiple Gulp plugins to build everything into one `index.html.gz` file - you can also see the original uncompressed `index.html` at `dist/index.html`)

### Dependency-free manual testing of Paige UI

- Ensure you have installed `node_modules` by running `npm install`
- Run `npm run test`
- Open `dist/index.html` in your browser
- You can type Ascii Braille into the Braille tab

### Updating liblouis

To update the liblouis build used in the app follow the following steps

1. Run `npm install` to install the latest version of `liblouis-build`
2. Run `npm run update-liblouis` - this will delete all the unused table data from the new liblouis build (to minimise file size of the final HTML file) and then copy this shortened version to `www/js`

This shortened version of the liblouis build is kept checked into version control (can be found at `www/js/build-tables-embeded-root-utf16.js`) so that in case of a broken update, it can be rolled back to a previous verison.

Once you have updated liblouis, you will have to run `npm run package` again to make a new build of the web app with the new liblouis version. 

### Adding tables

To add new liblouis tables, add their names to the `TABLES_TO_KEEP` list in `gulpfile.mjs` and then follow the instructions for updating liblouis.

### License

This code is available under a GPL-3.0 license. The app is based on the [ESP3D-WEBUI codebase](https://github.com/luc-github/ESP3D-WEBUI) from `luc-github`.
