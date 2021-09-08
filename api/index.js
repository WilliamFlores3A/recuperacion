require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


const verificacionModel = require('./verificacion.model');

app.use(express.json());
app.use(cors());

const verificacionApi = express.Router();

// metodo Get
verificacionApi.get('/', async (request, response, next) => {
    try {
        const verificaciones = await verificacionModel.find();

        return response.status(200).send(verificaciones);
    } catch (error) {
        next(error);
    }
});

// metodo Get by id
verificacionApi.get('/:verificacionId', async (request, response, next) => {
    try {
        const { verificacionId } = request.params;

        const verificacion = await verificacionModel.findById(verificacionId);

        return response.status(200).send(verificacion);
    } catch (error) {
        next(error);
    }
});

// metodo Post
verificacionApi.post('/', async (request, response, next) => {
    try {
        const verificacion = request.body;
        const verificacionCreated = await verificacionModel.create(verificacion);
        return response.status(201).send(verificacionCreated);
    } catch (erorr) {
        next(error);
    }
})

// metodo Put
verificacionApi.put('/:verificacionId', async (request, response, next) => {
    try {
        const { verificacionId } = request.params;
        const verificacion = request.body;
        const verificacionUpdated = await verificacionModel.findByIdAndUpdate(verificacionId, verificacion);
        return response.send(verificacionUpdated);
    } catch (error) {
        next(error);
    }
});

// metodo Patch
verificacionApi.patch('/:verificacionId', async (request, response, next) => {
    try {
        const { verificacionId } = request.params;
        const verificacion = request.body;
        const verificacionUpdated = await verificacionModel.findByIdAndUpdate(verificacionId, verificacion);
        return response.send(verificacionUpdated);
    } catch (error) {
        next(error);
    }
});

// metodo Delete
verificacionApi.delete('/:verificacionId', async (request, response, next) => {
    try {
        const { verificacionId } = request.params;
        const verificacionDeleted = await verificacionModel.findByIdAndDelete(verificacionId);
        return response.send(verificacionDeleted);
    } catch (error) {
        next(error);
    }
});
app.use('/api/v1/verificacion', verificacionApi);


app.use((error, request, response, next) => {
    if(error) return response.status(400).send({msg: 'Error'});

    next();
})

app.use((request, response) => {
    return response.status(404).send({
        msg: '404'
    });
})

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => console.log('Listen at http://127.0.0.1:' + PORT));
}).catch(error => console.error(error));