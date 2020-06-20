const config = require('config');
var elastic_client = require('../db');

//index dan type data dari mongodb
const indexName = config.elasticsearch.elasticsearchIndices.STUDENTS.index;
const indexType = config.elasticsearch.elasticsearchIndices.STUDENTS.type;

//menampilkan data dari mongodb
exports.getEachIndicesData = function(req, res, next) {
    elastic_client.search({
        index: req.params["index"],
        body: {
            "from" : 0, "size" : 10000,
            query: {
                match_all: {}
            }
        }
    }).then(function (response) {
        var hits = response.hits.hits
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message)
    }).catch((err) => {
        console.log("Elasticsearch ERROR - data not fetched");
    }) 
}

//membaca data dari mongodb berdasarkan ID
exports.getEachIndicesSingleRecord = function(req, res, next) {
    elastic_client.search({
        index: indexName,
        type: indexType,
        body: {
            query: {
              match: { "ID": req.body.ID }
            },
        }
    }).then(function (response) {
        var hits = response.hits.hits
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message)
    }).catch((err) => {
        console.log("Elasticsearch ERROR - data not fetched");
    }) 
}

//membaca aggregat berdasarkan warna rambut
exports.getRepeatedFieldIndicesData = function(req, res, next) {
    elastic_client.search({
        index: indexName,
        type: indexType,
        body: {
            "aggs" : {
                "colors": {
                        "terms": {
                        "field": "Color.keyword",
                        "size": 100,
                        }
                }
            }
        }
    }).then(function (response) {
        var hits = response
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message)
    }).catch((err) => {
        console.log("Elasticsearch ERROR - data not fetched");
    }) 
}