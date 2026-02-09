const db = require('../config/db');

exports.getAll = async (req, res) => {
  const { entity } = req.params;
  try {
    const [rows] = await db.query(`SELECT * FROM \`${entity}\``);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { entity, id } = req.params;
  try {
    const [rows] = await db.query(`SELECT * FROM \`${entity}\` WHERE id = ?`, [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { entity } = req.params;
  const newItem = req.body;
  try {
    const [result] = await db.query(`INSERT INTO \`${entity}\` SET ?`, [newItem]);
    res.status(201).json({ id: result.insertId, ...newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { entity, id } = req.params;
  const updatedItem = req.body;
  try {
    await db.query(`UPDATE \`${entity}\` SET ? WHERE id = ?`, [updatedItem, id]);
    res.json({ id: parseInt(id), ...updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { entity, id } = req.params;
  try {
    const [rows] = await db.query(`SELECT * FROM \`${entity}\` WHERE id = ?`, [id]);
    if (rows.length > 0) {
      await db.query(`DELETE FROM \`${entity}\` WHERE id = ?`, [id]);
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
