const express = require('express');
const cors = require('cors');

const { port } = require('./config.js');

const { users, groups, accounts, bills } = require('./routes/v1');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/v1/users/', users);
app.use('/v1/groups/', groups);
app.use('/v1/accounts/', accounts);
app.use('/v1/bills', bills);



app.get('/', (req, res) => {
    res.send({ message: 'Online' });
});

app.all('*', (req, res) => {
    res.status(404).send({ error: 'Page does not exist' });
});

app.listen(port, () => {
    console.log(`ONLINE.... ${port}`)
});