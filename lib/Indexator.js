'use strict';

const Promise = require('bluebird');
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_PROJECT, process.env.ALGOLIA_SECRET);
const indexName = 'courses';
const index = client.initIndex(indexName);

const create = itens => {
    if (itens.length === 0) {
        return itens;
    }

    return index.addObjects(itens)
    .then(data => itens.map((item, i) => {
        item.objectID = data.objectIDs[i];
        return item;
    }));
};

const update = itens => {
    if (itens.length === 0) {
        return itens;
    }

    return index.partialUpdateObjects(itens);
};

const backup = () => {
    const p = new Promise((resolve, reject) => {
        const browser = index.browseAll();
        let hits = [];

        browser.on('result', function onResult(content) {
            hits = hits.concat(content.hits);
        });

        browser.on('end', function onEnd() {
            resolve(hits);
        });

        browser.on('error', function onError(err) {
            reject(err);
        });
    });
    return p;
};

module.exports = { create, update, backup };
