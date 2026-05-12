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
  const newItem = { ...req.body };
  
  // Remove id if it's null/undefined/empty to avoid primary key issues
  if (!newItem.id) delete newItem.id;
  
  console.log(`Creating ${entity} with data:`, newItem);
  try {
    // Get valid columns for the table
    const [columns] = await db.query(`DESCRIBE \`${entity}\``);
    const validColumns = columns.map(c => c.Field);
    
    // Filter newItem to only include valid columns
    const filteredItem = Object.keys(newItem)
      .filter(key => validColumns.includes(key))
      .reduce((obj, key) => {
        obj[key] = newItem[key];
        return obj;
      }, {});

    const [result] = await db.query(`INSERT INTO \`${entity}\` SET ?`, [filteredItem]);
    res.status(201).json({ id: result.insertId, ...filteredItem });
  } catch (err) {
    console.error(`Error creating ${entity}:`, err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { entity, id } = req.params;
  const updatedItem = { ...req.body };
  
  // Never update the ID
  delete updatedItem.id;
  
  try {
    // Get valid columns for the table
    const [columns] = await db.query(`DESCRIBE \`${entity}\``);
    const validColumns = columns.map(c => c.Field);
    
    // Filter updatedItem to only include valid columns
    const filteredItem = Object.keys(updatedItem)
      .filter(key => validColumns.includes(key))
      .reduce((obj, key) => {
        obj[key] = updatedItem[key];
        return obj;
      }, {});

    await db.query(`UPDATE \`${entity}\` SET ? WHERE id = ?`, [filteredItem, id]);
    res.json({ id: parseInt(id), ...filteredItem });
  } catch (err) {
    console.error(`Error updating ${entity}:`, err);
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
