// Imports.
const FileSync = require('lowdb/adapters/FileSync');
const jsonServer = require('json-server');
const { v1: uuidv1 } = require('uuid');
const bp = require('body-parser');
const low = require('lowdb');
const cors = require('cors');

// Initializations.
const server = jsonServer.create();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Middlewares.
server.use(cors());
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));

// GET requests.
server.get('/categories', function (req, res) {
  const categories = db.get("categories").value();

  if (categories) {
    res.jsonp(categories)
  } else {
    res.sendStatus(404)
  }
});
server.get('/categories/:categoryId', function (req, res) {
  const { params: { categoryId } } = req;
  const category = db.get("categories").find({ id: categoryId }).value();

  if (category) {
    res.jsonp(category)
  } else {
    res.sendStatus(404)
  }
});
server.get('/categories/:categoryId/items', function (req, res) {
  const { params: { categoryId } } = req;
  const categoryItems = db.get("categories")
                          .find({ id: categoryId })
                          .get("items")
                          .value();

  if (categoryItems) {
    res.jsonp(categoryItems)
  } else {
    res.sendStatus(404)
  }
});
server.get('/categories/:categoryId/items/:itemId', function (req, res) {
  const { params: { categoryId, itemId } } = req;
  const categoryItem = db.get("categories")
                          .find({ id: categoryId })
                          .get("items")
                          .find({ id: itemId })
                          .value();

  if (categoryItem) {
    res.jsonp(categoryItem)
  } else {
    res.sendStatus(404)
  }
});

// POST requests.
server.post('/categories', function (req, res) {
  const { body } = req;

  if (body) {
    body.id = uuidv1();
    if (!body.items)
      body.items = [];

    
    db.get('categories').unshift({
      ...body,
    }).write();
    res.status(200).json(body);
  } else {
    res.sendStatus(404);
  }
});
server.post('/items', function (req, res) {
  const { body } = req;

  if (body) {
    body.id = uuidv1();
    const { categoryId, ...rest } = body;
    db.get('categories').find({ id: categoryId }).get('items').unshift({
      ...rest
    }).write();
    res.status(200).json(body);
  } else {
    res.sendStatus(404);
  }
});
server.post('/login', function (req, res) {
  const { body } = req;
  const { email, password } = body;

  if (body) {
    const user = db.get('users').find({ email }).value();

    if (user && password === user.password) {
      const { id, name, role, permissions } = user;

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        id,
        name,
        role,
        permissions,
        token: 'eyJhbGciOiJIUzI1NiJ9',
      }));
    }
    res.sendStatus(422);
  }
  else {
    res.sendStatus(404);
  }
});

// PATCH requests.
server.patch('/categories/:categoryId', function (req, res) {
  const { body, params: { categoryId } } = req;

  if (body) {
    db.get('categories').find({ id: categoryId }).assign(body).write();
    res.status(200).json(body);
  } else {
    res.sendStatus(404);
  }
});
server.patch('/categories/:categoryId/items/:itemId', function (req, res) {
  const { body, params: { categoryId, itemId } } = req;

  if (body) {
    db.get('categories')
      .find({ id: categoryId })
      .get('items')
      .find({ id: itemId })
      .assign(body)
      .write();

      res.status(200).json(body);
  } else {
    res.sendStatus(404);
  }
});

// DELETE requests.
server.delete('/categories/:categoryId/items/:itemId', function (req, res) {
  const { body, params: { categoryId, itemId } } = req;

  if (body) {
    db.get('categories')
      .find({ id: categoryId })
      .get('items')
      .remove({ id: itemId })
      .write();

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
server.delete('/categories/:categoryId', function (req, res) {
  const { body, params: { categoryId } } = req;

  if (body) {
    db.get('categories')
      .remove({ id: categoryId })
      .write();

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Start server on port 3000.
server.listen(3000, function () {
  console.log('JSON Server is running')
})