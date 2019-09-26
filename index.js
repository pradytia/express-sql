//========================================================setup server============================================================

const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 1997

//==========================================================setup database======================================================

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'pradit',
    password : 'password',
    database : 'tokoberkah',
    port     : 3306,
    timezone : 'UTC'
})

//========================================================pembuatan server=====================================================

app.get('/', (req,res)=>{
    res.status(200).send('<h1> Welcome to our API </h1>') // function ini bakal di execute bila ke '/'
})


// connect database

//query
app.get('/getkota', (req,res)=>{

    var nama = req.query.nama ? req.query.nama : '';
            //localhost:1997/getkota?nama
            // condiiton ?(if true) :(else)

    // if(!req.query.nama){
    //     nama = ''
    // }


    var sql = `SELECT * from kota WHERE nama LIKE '%${nama}%';`;

    //execute sql
    db.query(sql, (err,result)=>{
        if(err){
            console.log(err) // notif eror di terminal
            return res.status(500).send(err) //notif error di browser
            //return ==> keluar dari function anonimus yang ini
            // returnnya bebas
        }
        // console.log(result)
        res.status(200).send(result) // isi dari result => array of object
    })  // callback function bakal dijalankan ketika execute sql di jalankan baik berhasil maupun gagal

})

//params
app.get ('/getkota/:id', (req,res)=>{
    //:id ==> nama properti 
    //: bebas valuenya 
    console.log(req.params)
    var id = req.params.id ? req.params.id : '';

    var sql = `SELECT * from kota WHERE id Like '%${id}%';`;

    db.query(sql, (err,result)=>{
        if(err){
            console.log(err)
            return res.status(200).send(err)
        }
        res.status(200).send(result)
    })
})


//percobaan
app.get('/getkota/:idu/test/halo/:hello/:coba', (req,res)=>{
    console.log(req.params)
    res.status(200).send('<h1> HALO BROW </h1>')
})


//=================================================toko===========================================================================

//id params
app.get('/gettoko/:id', (req, res)=>{


    var sql = `SELECT * from toko WHERE id = '${req.params.id}';`;

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        // console.log(result)
        res.status(200).send(result)
    })
})


//query
app.get('/gettoko', (req,res)=>{
    
   var nama  = req.query.nama ? req.query.nama : '';
   var alamat =  req.query.alamat ? req.query.alamat : '';
  

    var sql = `SELECT * from toko
                                where nama LIKE '%${nama}%'
                                and alamat LIKE '%${alamat}%'`;

    //incmin nama querynya
    if(req.query.incmin){
        sql += ` and totalIncome >= ${req.query.incmin}`
    }
    if(req.query.incmax){
        sql+= ` and totalIncome <= ${req.query.incmax}`
    }
    if(req.query.datefrom){
        sql += ` and tanggalBerdiri >= '${req.query.datefrom}'`
    }
    if(req.query.dateto){
        sql += ` and tanggalBerdiri <= '${req.query.dateto}'`
    }
    if(req.query.kotaId){
        sql += ` and kotaId = ${req.query.kotaId}`
    }

    db.query(sql, (err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        console.log(result)
        res.status(200).send(result)
    })
})

//==========================================================proses running server==================================================

app.listen(port, ()=> console.log(`API aktif di port ${port}`)) // => untuk running/ menjalankan server
//console.log disini selalu mucncul diterminal