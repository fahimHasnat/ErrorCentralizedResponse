const path = require("path");

const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

///Middleware
app.use(bodyParser.json({ limit: '100mb' }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, responseType'
    );
    next();
});

app.get('/example', function (req, res) {
    res.json({
        "success": true,
        "message": "Response Successful",
        "status_code": 200,
        "data": {
            "your_custom_data": "based_on_api_and_or_your_need"
        }
    });
});


///Error Handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
});