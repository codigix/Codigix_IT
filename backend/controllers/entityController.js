const fs = require('fs');
const { DATA_FILE } = require('../config/config');

const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

exports.getAll = (req, res) => {
  const { entity } = req.params;
  const data = readData();
  if (data[entity]) {
    res.json(data[entity]);
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
};

exports.getById = (req, res) => {
  const { entity, id } = req.params;
  const data = readData();
  if (data[entity]) {
    const item = data[entity].find(i => i.id === parseInt(id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
};

exports.create = (req, res) => {
  const { entity } = req.params;
  const newItem = req.body;
  const data = readData();
  if (data[entity]) {
    newItem.id = data[entity].length > 0 ? Math.max(...data[entity].map(i => i.id)) + 1 : 1;
    data[entity].push(newItem);
    writeData(data);
    res.status(201).json(newItem);
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
};

exports.update = (req, res) => {
  const { entity, id } = req.params;
  const updatedItem = req.body;
  const data = readData();
  if (data[entity]) {
    const index = data[entity].findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
      data[entity][index] = { ...data[entity][index], ...updatedItem, id: parseInt(id) };
      writeData(data);
      res.json(data[entity][index]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
};

exports.delete = (req, res) => {
  const { entity, id } = req.params;
  const data = readData();
  if (data[entity]) {
    const index = data[entity].findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
      const deletedItem = data[entity].splice(index, 1);
      writeData(data);
      res.json(deletedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
};
