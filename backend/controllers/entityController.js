const db = require('../config/db');

// Cache for table columns to avoid repeated DESCRIBE queries
const columnCache = {};
// Data cache to avoid repeated SELECT queries
const dataCache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

const getColumns = async (entity) => {
  if (columnCache[entity]) return columnCache[entity];
  
  const [columns] = await db.query(`DESCRIBE \`${entity}\``);
  const validColumns = columns.map(c => c.Field);
  columnCache[entity] = validColumns;
  return validColumns;
};

const invalidateCache = (entity) => {
  delete dataCache[entity];
  delete dataCache[`${entity}_all`];
  // We don't necessarily need to invalidate columnCache as schema changes are rare
};

exports.getCount = async (req, res) => {
  const { entity } = req.params;
  try {
    const [rows] = await db.query(`SELECT COUNT(*) as count FROM \`${entity}\``);
    res.json({ count: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const { entity } = req.params;
  const cacheKey = `${entity}_all`;
  
  // Check cache
  if (dataCache[cacheKey] && (Date.now() - dataCache[cacheKey].timestamp < CACHE_TTL)) {
    console.log(`Serving ${entity} from cache`);
    return res.json(dataCache[cacheKey].data);
  }

  const start = Date.now();
  try {
    const validColumns = await getColumns(entity);
    
    // Define heavy columns to exclude in list view to improve performance
    const heavyColumns = [
      'gallery', 
      'maintenance_items', 
      'faqs', 
      'key_features',
      'goals',
      'technology_stack',
      'results',
      'long_description',
      'content',
      'overview',
      'challenge',
      'solution'
    ];
    
    // Allow 'description' for slides since HomePage uses it in the slider
    if (entity !== 'slides') {
      heavyColumns.push('description');
    }

    
    const selectColumns = validColumns
      .filter(col => !heavyColumns.includes(col))
      .map(col => `\`${col}\``)
      .join(', ');

    const [rows] = await db.query(`SELECT ${selectColumns} FROM \`${entity}\``);
    
    // Update cache
    dataCache[cacheKey] = {
      data: rows,
      timestamp: Date.now()
    };

    const duration = Date.now() - start;
    console.log(`Fetch ${entity} took ${duration}ms (size: ${JSON.stringify(rows).length} bytes)`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { entity, id } = req.params;
  const cacheKey = `${entity}_${id}`;

  // Check cache
  if (dataCache[cacheKey] && (Date.now() - dataCache[cacheKey].timestamp < CACHE_TTL)) {
    console.log(`Serving ${entity}:${id} from cache`);
    return res.json(dataCache[cacheKey].data);
  }

  try {
    const [rows] = await db.query(`SELECT * FROM \`${entity}\` WHERE id = ?`, [id]);
    if (rows.length > 0) {
      // Update cache
      dataCache[cacheKey] = {
        data: rows[0],
        timestamp: Date.now()
      };
      
      // Add Cache-Control header (1 hour for details)
      res.setHeader('Cache-Control', 'public, max-age=3600');
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
  
  if (!newItem.id) delete newItem.id;
  
  try {
    const validColumns = await getColumns(entity);
    
    const filteredItem = Object.keys(newItem)
      .filter(key => validColumns.includes(key))
      .reduce((obj, key) => {
        obj[key] = newItem[key];
        return obj;
      }, {});

    const [result] = await db.query(`INSERT INTO \`${entity}\` SET ?`, [filteredItem]);
    
    invalidateCache(entity);
    
    res.status(201).json({ id: result.insertId, ...filteredItem });
  } catch (err) {
    console.error(`Error creating ${entity}:`, err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { entity, id } = req.params;
  const updatedItem = { ...req.body };
  
  delete updatedItem.id;
  
  try {
    const validColumns = await getColumns(entity);
    
    const filteredItem = Object.keys(updatedItem)
      .filter(key => validColumns.includes(key))
      .reduce((obj, key) => {
        obj[key] = updatedItem[key];
        return obj;
      }, {});

    await db.query(`UPDATE \`${entity}\` SET ? WHERE id = ?`, [filteredItem, id]);
    
    invalidateCache(entity);
    delete dataCache[`${entity}_${id}`];

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
      
      invalidateCache(entity);
      delete dataCache[`${entity}_${id}`];

      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
