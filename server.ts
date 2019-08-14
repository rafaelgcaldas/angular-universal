require('zone.js/dist/zone-node');
require('reflect-metadata');
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
const express = require('express');
const fs = require('fs');
const enableProdMode = require('@angular/core').enableProdMode;

const {AppServerModuleNgFactory} = require('./dist/app1-server/main');

enableProdMode();

const app = express();
const indexHtml = fs.readFileSync(__dirname + '/dist/app1/index.html', 'utf-8').toString();

app.get('*.*', express.static(__dirname + '/dist/app1', {
    maxAge: '1y'
}));

app.route('*').get((req, res) => {
    renderModuleFactory(AppServerModuleNgFactory, {
        document: indexHtml,
        url: req.url
    })
        .then(html => {
            res.status(200).send(html);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.listen(9000, () => {
    console.log(`Angular Universal Node Express server listening on http://localhost:9000`);
});