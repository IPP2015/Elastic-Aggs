const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.STUDENTS.index;
const indexType = config.elasticsearch.elasticsearchIndices.STUDENTS.type;

exports.updateSingleData = function(req, res, next) {
    elastic_client.update({
        index: indexName,
        type: indexType,
        id: req.body.id,
        body: {
            doc : {
                ID: req.body.ID,
                Name: req.body.Name,
                Gender: req.body.Gender,
                Class: req.body.Class,
            }
        }
      }).then(function (response) {
        var hits = response;
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message)
    }).catch((err) => {
        console.log("Elasticsearch ERROR - data not updated");
    }) 
};
