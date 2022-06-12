const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');
const path = require('path');

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext);
    }
})

const upload = multer({ storage })

app.post('/uploadfile', upload.single('file'), (req, res) => {
    res.send('Arquivo Enviado..')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))