# Paige Web App

### Online version 

- This repo also autodeploys a demo version of the web app to Netlify on push to the `main` branch
- It can be found at https://paigetranslate.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/ffbf45ea-ca3f-4802-8933-cf564f1eaed1/deploy-status)](https://app.netlify.com/sites/paigetranslate/deploys)

### Building for deployment

#### Paige Connect

To build run:
- `npm install` (this will install all dependencies)
- `npm run package` (this will use [Gulp](https://gulpjs.com/) alongside multiple Gulp plugins to build everything into one `index.html.gz` file - you can also see the original uncompressed `index.html` at `dist/index.html`)

#### For use with Paige Display

To build run:
- `npm install` (this will install all dependencies)
- `npm run packagefordisplay` (this will use [Gulp](https://gulpjs.com/) alongside multiple Gulp plugins to build everything into one `index.html.gz` file - you can also see the original uncompressed `index.html` at `dist/index.html`)

### Dependency-free manual testing of Paige UI

- Ensure you have installed `node_modules` by running `npm install`
- Run `npm run test`
- Open `dist/index.html` in your browser
- You can type Ascii Braille into the Braille tab

### Testing with FluidNC backend

You can upload `index.html.gz` to a FluidNC ESP32 machine and run it
from there by browsing to the FluidNC IP address.  That is the normal
way of using WebUI.

Alternatively, for a quicker test of a new build, you can avoid the upload step by
starting a proxy server with:

```bash
python fluidnc-web-sim.py
```

Then browse to "localhost:8080" instead of directly to the FluidNC IP address.

The proxy serves the "dist/index.html" file directly for the initial
load of WebUI, bypassing the FluidNC system for the index file.  The
proxy forwards all other communication over to the FluidNC machine.

By default, the proxy tries to find the FluidNC machine by using MDNS
to "fluidnc.local".  If that does not work, you can supply the FluidNC
IP address on the command line, as with:

```bash
python fluidnc-web-sim.py 192.168.1.25
```

### Updating liblouis

To update the liblouis build used in the app follow the following steps

1. Run `npm install` to install the latest version of the `liblouis` js library
2. Replace `build-tables-embeded-root-utf16.js` with the latest GitHub actions build from https://github.com/nrimsky/liblouis
3. Run `npm run update-liblouis` - this will delete all the unused table data from the liblouis build (to minimise file size of the final HTML file) and then copy this shortened version to `www/js`

This shortened version of the liblouis build is kept checked into version control (can be found at `www/js/build-tables-embeded-root-utf16.js`) so that in case of a broken update, it can be rolled back to a previous verison.

Once you have updated liblouis, you will have to run `npm run package` again to make a new build of the web app with the new liblouis version. 

### Adding tables

To add new liblouis tables, add their names to the `TABLES_TO_KEEP` list in `gulpfile.mjs` and then follow the instructions for updating liblouis.

### Different build settings

- `www/js/globalSettings.js` contains some global variables that are referenced throughout the code to enable / disable features
- To add a new setting, you can add a gulp step to set / unset the variable in question, and create a new package task that uses this step (see `setDemo` as an example, which is used in `package2demo`)

### Git

The main branch for the Paige web app is `main`, other branches come from `MitchBradley`'s original repo

### License

This code is available under a GPL-3.0 license. The app is based on the [MitchBradley's fork of the ESP3D-WEBUI codebase](https://github.com/MitchBradley/ESP3D-WEBUI) originally by `luc-github`.
