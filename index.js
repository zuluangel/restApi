const express = require ('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3080;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is the server in the 3080 port');
})

app.get('/new-route', (req, res) => {
  res.send('This is your new endpoint')
})

app.get('/home', (req, res) => {
  res.send('This is your Home endpoint')
})

app.get('/categories', (req, res) => {
  res.send('This is your Categories endpoint')
})

routerApi(app)

//Same order, same execution. Remind it executes in sequential order
//To clarify the errorHandler function does not have the
//<next> parameter activated
app.use(logErrors)
app.use(errorHandler)


//NO console.log in production PLEASE!!
app.listen(port, ()=>{
  console.log('My port is: '+ port);
  // console.log('The new port is ' + app);
})

