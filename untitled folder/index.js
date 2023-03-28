const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1',
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2',
  },
];

const SECRET_KEY = 'mysecretkey';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token invalid' });
    }
    req.userId = decoded.id;
    return next();
  });
}

app.get('/user', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  res.send(user);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).send({ error: 'Username or password invalid' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  return res.send({ token });
});

app.post('/logoff', authenticate, (req, res) => {
  return res.send({ ok: true });
});

app.get('/dashboard', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  res.send(`Welcome, ${user.username}!`);
});

app.get('/report', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  res.send(`Here is your report, ${user.username}`);
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
