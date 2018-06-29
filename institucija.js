const express = require('express');
const sql = require('mssql');
const config = require('../config/config');
const router = express.Router();

// Sve drzave
router.get('/api/drzave', (req, res) => {
    // Promise connection
    sql.connect(config).then(pool => {

        return pool.request() // return new promise
        .query('SELECT * FROM DRZAVA')
    }).then(result => {
        let jsonString = JSON.stringify(result, undefined, 2);
        let obj = JSON.parse(jsonString);
        let drzave = obj.recordset;
        console.log(drzave[0].DR_NAZIV);
        sql.close();
        res.json({succes: true, drzave: drzave});
    })
    .catch(err => {
        res.json({succes: false, message:'Something went wrong'});
        console.log(err);
        sql.close()
    })
})

//Get single drzava
router.get('/api/drzava/:id', (req, res) => {
    let id = req.params.id.toString().toUpperCase();
    sql.connect(config).then(pool => {
        return pool.query `select * from DRZAVA where DR_SIFRA = ${id}`
    }).then(result => {
        console.log(result);
        let jsonString = JSON.stringify(result, undefined, 2);
        let obj = JSON.parse(jsonString);
        let drzava = obj.recordset;
        res.json({succes: true, drzava: drzava})
        sql.close();
    }).catch(err => {
        res.json({succes: false, message:'Something went wrong'});
        console.log(err);
        sql.close();
    })
    console.log(id);
})




// Insert in drzava
router.post('/api/drzave', (req, res) => {
    let sifraDrzave = req.body.sifraDrzave;
    let imeDrzave = req.body.imeDrzave
    sql.connect(config).then(pool => {
        return pool.query `insert into DRZAVA (DR_SIFRA, DR_NAZIV) VALUES (${sifraDrzave}, ${imeDrzave})`
    }).then(result => {
        console.log(result);
        let jsonString = JSON.stringify(result, undefined, 2);
        let obj = JSON.parse(jsonString);
        let filmovi = obj.recordset;
        res.json({succes: true})
        sql.close();
    }).catch(err => {
        res.json({succes: false, message:'Something went wrong'});
        console.log(err);
        sql.close();
    })     
})

//update drzava
router.put('/api/drzava/:id', (req, res) => {
    let id = req.params.id.toString().toUpperCase();
    let imeDrzave = req.body.imeDrzave;
    sql.connect(config).then(pool => {
        return pool.query `update DRZAVA set DR_NAZIV = ${imeDrzave} where DR_SIFRA = ${id}`
    }).then(result => {
        console.log(result);
        let jsonString = JSON.stringify(result, undefined, 2);
        let obj = JSON.parse(jsonString);
        let filmovi = obj.recordset;
        res.json({succes: true})
        sql.close();
    }).catch(err => {
        res.json({succes: false, message:'Something went wrong'});
        console.log(err);
        sql.close();
    })
    console.log(id);
})

// delete Drzava 

router.delete('/api/drzava/:id', (req, res) => {
    let id = req.params.id.toString().toUpperCase();
    sql.connect(config).then(pool => {
        return pool.query `delete from DRZAVA where DR_SIFRA = ${id}`
    }).then(result => {
        console.log(result);
        let jsonString = JSON.stringify(result, undefined, 2);
        let obj = JSON.parse(jsonString);
        let filmovi = obj.recordset;
        res.json({succes: true})
        sql.close();
    }).catch(err => {
        res.json({succes: false, message:'Something went wrong'});
        console.log(err);
        sql.close();
    })
    console.log(id);
})


// Filmovi 
router.get('/api/filmovi', (req, res) => {
    sql.connect(config).then(pool => {
        return pool.request()
        .query('SELECT * FROM FILM')
    }).then(result => {
        let jsonString = JSON.stringify(result, undefined, 2);
        let obj = JSON.parse(jsonString);
        let filmovi = obj.recordset;
        res.json({succes: true, filmovi: filmovi})
        sql.close();
    }).catch(err => {
        res.json({succes: false, messageg:'Something went wrong'});
        console.log(err);
        sql.close();
    })
})

module.exports = router;
