const connection = require('./connection')
const express = require('express')
const admin = require('firebase-admin')
const cors = require('cors')
const cron = require('node-cron');
const app = express();
const credentials = require("./key.json")
app.use(cors())

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const db = admin.firestore();
app.post('/create',async (req, res) => {
    //console.log(req.body)
    try {
        //console.log(req.body)
        const id = req.body.email;
        // const userJson = {
        //     email : req.body.email,
        //     firstName : req.body.firstname,
        //     lastName : req.body.lastName
        // };
        //console.log(req.body)
        const response = await db.collection("users").doc(id).set(req.body);
        res.send(response)
        
    } catch(error) {
        res.send(error)
    }
})


app.get('/get/all', async (req,res) => {
    try {
        const userRef = db.collection("users")
        const response = await userRef.get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
        const records = responseArr.map((obj) => {
            return Object.keys(obj).map((key) => {
                return obj[key]
            })
        })
        console.log(records)
        // connection.query("INSERT INTO users (firstName,lastName,email) VALUES ?", [records], function (err, result, fields) {
        //     // if any error while executing above query, throw error
        //     if (err) throw err;
        //     // if there is no error, you have the result
        //     console.log(result);
        //   });
    } catch(error) {
        res.send(error)
    }
})
////////////////////////////////////
////////    CRON JOB    ////////////
///////////////////////////////////

// cron.schedule('* * * * *', async () => {
//     try {
//         const userRef = db.collection("users")
//         const response = await userRef.get()
//         let responseArr = []
//         response.forEach(doc => {
//             responseArr.push(doc.data())
//         })
//         const records = responseArr.map((obj) => {
//             return Object.keys(obj).map((key) => {
//                 return obj[key]
//             })
//         })
//         console.log(records)
//         connection.query("INSERT INTO users (firstName,lastName,email) VALUES ?", [records], function (err, result, fields) {
//             // if any error while executing above query, throw error
//             if (err) throw err;
//             // if there is no error, you have the result
//             console.log(result);
//           });
//     } catch(error) {
//         console.log('Error:', error.message)
//     }
//     console.log('running a task every minute');
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
