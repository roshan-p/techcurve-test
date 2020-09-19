import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';


import startDatabase from './config/database';
const Chart = require('./models/chart')

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 4001;



app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

startDatabase();


app.get('/api/getall', (req, res) => {
    Chart.find((err, result) => {
        if (err) {
            res.send(err);
        } else {
            return res.send(result)
        }
    })
});


app.post("/api/addData", (req, res) => {
    var chartObj = new Chart(req.body);
    Chart.findOneAndUpdate({ name: req.body.name }, { value: req.body.value }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            if (!result) {
                chartObj.save((err, result) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).send("Data added");
                    console.log(result)
                });
            } else {
                res.send(result);
            }
        }
    });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT}`));