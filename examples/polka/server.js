const polka = require('polka');

// Log every request
function logger(req, res, next) {
  console.log(`~> Received ${req.method} on ${req.url}`);
  next(); // move on
}

function aMiddlewareDemo(req, res, next) {
  req.hello = 'world';
  req.foo = '...needs better demo 😔';
  next();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Users = {
  find: async (token) => {
    console.log(`Token: ${token}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: 'rosenzhang' });
      }, 5);
    });
  },
};

async function authenticate(req, res, next) {
  const {
    query: { token },
  } = req; // let token = req.headers['authorization'];
  if (!token) {
    res.statusCode = 401;
    res.end('No token!');
    return;
  }
  req.user = await Users.find(token); // <== fake
  next();
}

const app = polka();
// Middleware
app.use(aMiddlewareDemo, authenticate, logger);

// app.use((req, res, next) => next('💩'))
// app.use((req, res, next) => next('error 500'))
// app.get('*', (req, res) => res.end('wont run'));

app.get('/', async (req, res) => {
  await sleep(500); // force sleep, because we can~!
  const { hello, foo } = req;
  res.end(`Hello ${hello}, I'm ${req.user.name}, ${foo}`); // send greeting
});

app.get('/users', (req, res) => {
  res.end('Get all users!');
});

app.post('/users', (req, res) => {
  res.end('Create a new User!');
});
app.get('/users/:id', (req, res) => {
  const {
    hello,
    foo,
    params: { id },
    user,
  } = req;
  console.log(`~> Hello, ${hello}`);
  console.log('~> current user', user);
  res.end(`User: ${id}, req.foo: ${foo}`);
});
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  res.end(`Update User with ID of ${id}`);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.end(`CY@ User ${id}!`);
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`> Running on localhost:3000`);
});
