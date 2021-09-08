const { PORT } = require('./config');

const hbs = require('hbs');
const express = require('express');
const path = require('path');


const { verificacionService } = require('./services');

const app = express();

app.use(express.urlencoded());

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (request, response) => {
    const verificaciones = await verificacionService.getAll();
    return response.render('home', { verificaciones });
});
app.get('/crear', async (request, response) => {
    return response.render('crear');
});


app.post('/crear', async (request, response) => {
    const {Curso, Aprobados, Recuperacion, Reprobado, Tutorias} = request.body;

    const verificacion = {
        Curso,
        Aprobados: parseInt(Aprobados),
        Recuperacion: parseInt(Recuperacion),
        Reprobado: parseInt(Reprobado),
        Tutorias: parseInt(Tutorias)
    };

    const verificacionCreated = await verificacionService.create(verificacion);
    console.log(verificacionCreated);

    return response.render('crear');
})


app.get('/editar/:verificacionId', async(request, response) => {
    const { verificacionId } = request.params;
    const verificacion = await verificacionService.get(verificacionId);
    console.log({...verificacion});
    return response.render('editar', {...verificacion});
});


app.post('/editar/:verificacionId', async(request, response) => {
    const { verificacionId } = request.params;

    const {Curso, Aprobados, Recuperacion, Reprobado, Tutorias} = request.body;

    const verificacion = {
        Curso,
        Aprobados: parseInt(Aprobados),
        Recuperacion: parseInt(Recuperacion),
        Reprobado: parseInt(Reprobado),
        Tutorias: parseInt(Tutorias)
    };

    const verificacionUpdated = await verificacionService.update(verificacionId, verificacion);
    return response.redirect('/editar/' + verificacionId);
});


app.get('/eliminar/:verificacionId', async (request, response) => {
    const { verificacionId } = request.params;
    const verificacionDeleted = await verificacionService.delete(verificacionId);

    return response.redirect('/');
})

app.listen(PORT, () => console.log('Listening at http://127.0.0.1:' + PORT));
