require('zone.js/dist/zone-node');
require('reflect-metadata');
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
const fs = require('fs');

const {AppServerModuleNgFactory} = require('./dist/app1-server/main');


renderModuleFactory(AppServerModuleNgFactory, {
    document: '<app-root></app-root>',
    url: '/'
})
.then(html => {
    console.log('Pre-rendering successful, saving prerender.html');
    fs.writeFileSync('./prerender.html', html);
})
.catch(error => {
    console.error('Error occurred:', error);
});