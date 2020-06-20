const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

const getindicesData = require('../controllers/getIndexdata');
const insertApi = require('../controllers/registration');
const updateApi = require('../controllers/userdetailsupdate');
const deleteApi = require('../controllers/deleteuserdetails');

//Test API
app.get('/',  (req, res) => { 
   res.send({
      status:200,
      message:'API is working fine!'
   })
})

//Membaca data keseluruhan pada localhost
app.get('/search/alldata/:index', (req, res) => { 
   getindicesData.getEachIndicesData(req, res);
})

//membaca data berdasarkan ID pada localhost
app.post('/search/single/data', (req, res) => { 
   getindicesData.getEachIndicesSingleRecord(req, res);
})

//membaca data aggregat
app.get('/search/repeated/data', (req, res) => {
   getindicesData.getRepeatedFieldIndicesData(req, res);
})

//menambahkan data 
app.post('/insert/single/data', (req, res) => {
   insertApi.insertSingleData(req, res);
});

//mengedit data
app.put('/update/user/data', (req, res) => { 
   updateApi.updateSingleData(req, res);
});


//Menghapus data single
app.delete('/delete/user/data', (req, res) => { 
   deleteApi.deleteUserData(req, res);
});


// menghapus data dengan index=students
app.delete('/delete/:index', (req, res) => { 
   deleteApi.deleteElasticSearchIndex(req, res);
});

module.exports = app;