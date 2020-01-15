// server.js
const jsonServer = require('json-server');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const express = require('express');
const routes = require('./routes.json');
const axios = require('axios');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');

const botiApi = axios.create({
  baseURL: `https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1`,
  responseType: "json"
})

server.use('/', express.static(path.join(__dirname, 'build')))
server.use('/static', express.static(path.join(__dirname, 'build/static')))


server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/api/auth',(req, res) => {

  const user = db.users.filter(u => u.email === req.body.email)

  if(!user.length){
    res.status(404).send({ user: null, success: false, message: "usuário não cadastrado" })

  } else {
    
    if(user[0].password !== req.body.password){
      res.status(401).send({ user: null, success: false, message: "credenciais inválidas" })
    } else {
      res.send({ ...user[0] })
    }
  }

})

server.get('/api/cashback', (req, res) => {
  botiApi.get(`/cashback?cpf=${req.query.cpf}`)
  .then(result => {
    if(result.data.statusCode !== 200){
      res.status(result.data.statusCode).send(result.data)
    } else {
      res.send(result.data)
    }
  })
  .catch(err => res.send(err))
})



server.use(jsonServer.rewriter(routes))
server.use('/api',router)

server.get('/*', (req,res) =>{
  res.sendFile('index.html', { root: __dirname + '/build' });
});

server.listen(8888, () => {
  console.log('Server is running at http://localhost:8888')
})