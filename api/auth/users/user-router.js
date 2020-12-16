const express = require("express");
const users = require('./user-model');
const bcrypt = require('bcryptjs');

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const user = await users.find();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.get('/:id/recipes', async (req, res) => {
  const { id } = req.params;

  try {
    const content = await users.findRecipe(id);
    res.json(content);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
})




router.post('/register', async (req, res) => {

  const user = req.body;
 
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  try {
      const saved = await users.add(user);
      res.status(201).json(saved);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
      const user = await users.findBy({ username }).first();
      
      if (user && bcrypt.compareSync(password, user.password)) {
     
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}!`, });
      } else {
       
          res.status(401).json({ message: 'invalid credentials' });
      }
  } catch (err) {

      res.status(500).json(error);
  }
});



router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const changedUser = await users.update(id, changes);
    if (changedUser) {
      res.json(changedUser);
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await users.remove(id);
    if (count) {
      res.json({ message: `deleted ${count} records` });
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

module.exports = router;