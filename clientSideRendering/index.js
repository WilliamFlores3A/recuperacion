const express = require('express');
const path = require('path');
const PORT = 81;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get((request, response) => {
    return response.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log('Listen at http://127.0.0.1:' + PORT));