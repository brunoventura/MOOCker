'use strict';

const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_PROJECT, process.env.ALGOLIA_SECRET);
const index = client.initIndex('courses');

const create = function(itens) {
    if (itens.length === 0) {
        return itens;
    }

    return index.addObjects(itens)
        .then(data => itens.map((item, i) => {
            item.objectID = data.objectIDs[i];
            return item;
        }));
};

const update = function(itens) {
    if (itens.length === 0) {
        return itens;
    }

    return index.partialUpdateObjects(itens);
};

module.exports = { create, update };
