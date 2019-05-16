const express = require('express');

const app = express();

const logMiddleware = (req, res, next) => {
  console.log(
      `Host: ${req.headers.host} | URL: ${req.url} | method: ${req.method}`
  );  

req.appName = 'GoNode'; 

  return next();
};

app.use(logMiddleware);

app.get('/', logMiddleware, (req, res) =>{
    return res.send(`Bem vindo ao ${req.appName}, ${req.query.name}`);
});

app.get('/nome/:name', (req, res) => {
    return res.json({
        message: `welcome, ${req.params.name}`
    });
});

app.listen(3000);