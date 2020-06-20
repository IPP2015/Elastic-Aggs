const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.STUDENTS.index;
const indexType = config.elasticsearch.elasticsearchIndices.STUDENTS.type;

exports.insertSingleData = function(req, res, next) {
    elastic_client.index({
        index: indexName,
        type: indexType,
        body : {
            ID: req.body.ID,
            Name: req.body.Name,
            Gender: req.body.Gender,
            Class: req.body.Class,
        }
      }).then(function (response) {
        var hits = response;
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message)
    }).catch((err) => {
        console.log("Elasticsearch ERROR - data not fetched");
    }) 
};

