//llamar a nuestro metodo express:

const express = require('express');

//Crear un const app, para invocar el metodo de express
const app = express();

//Crear el puerto donde estara el localhost: #puerto
const port = 8000;

//Estos son middlewares solamente para la solicitud POST:
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//Definimos las rutas de solicitud HTTP:
app.get('/api/', (request, response) => {
  response.json({ mensaje: 'Hello Joaco Master' });
});

//request => extraer la informacion de la BD
//response => la informacion que ha pedido el request

const users = [ //db
  { firstName: 'Reimu', lastName: 'Hakurei' },
  { firstName: 'Marisa', lastName: 'Kirisame' },
  { firstName: 'Sanae', lastName: 'Kochiya' },
  { firstName: 'Sakuya', lastName: 'Izayoi' },
  { firstName: 'Momiji', lastName: 'Inubashiri' }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

//EJEMPLO DE SOLICITUD POST:

//request.body son las keys de un objeto
//{firstName,lastName} === req.body

app.post('/api/new',(req,res) =>{
  /*
    {
      "firstName": "Sir Daryl",
      "lastName": "De Bruyne"
    } 
  */
 console.log(req.body);
 users.push(req.body);
 res.json({mensaje:"ok"});
});


//OBTENER UN DATO ESPECIFICO
app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id);
  res.json(users[req.params.id]);
});

//CONSULTA PUT
app.put('/api/update/:id',(req,res)=>{
  users[req.params.id] = req.body // ----> 
  res.json( { status: "ok" } );
  /*
    {
      "firstName": "Sir Daryl",
      "lastName": "De Bruyne"
    } 
  */
 /*
    {
      "firstName": "Joaquin",
      "lastName": "Maurtua"
    } 
  */
});


//CONSULTA DELETE --> borra solo objetos enteros
app.delete('/api/delete/:id',(req,res)=>{
  users.splice(req.params.id,1);
  res.json({status:'ok'});


});



//Saber que el server esta funcionando, invocando su listenner:
app.listen(port, () => {
  console.log(`Express iniciandose en localhost: ${port}`);
});

