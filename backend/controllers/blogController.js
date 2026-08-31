const db = require('../config/db');

exports.incrementView = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE blogs SET views = views + 1 WHERE id = ?', [id]);
    res.json({ message: 'View incremented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.incrementLike = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE blogs SET likes = likes + 1 WHERE id = ?', [id]);
    res.json({ message: 'Like incremented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM blog_comments WHERE blog_id = ? ORDER BY created_at DESC', [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment } = req.body;
    
    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }

    const [result] = await db.query(
      'INSERT INTO blog_comments (blog_id, name, comment) VALUES (?, ?, ?)',
      [id, name, comment]
    );

    const [newComment] = await db.query('SELECT * FROM blog_comments WHERE id = ?', [result.insertId]);
    res.status(201).json(newComment[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
