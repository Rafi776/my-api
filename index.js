require('dotenv').config();
const express = require('express');
const supabase = require('./supabaseClient');

const app = express();
app.use(express.json());

app.get('/members', async (req, res) => {
  const { id } = req.query;

  let query = supabase.from('prm_members').select('*');

  if (id) {
    query = query.eq('id', id);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(2000, () => console.log('API running on http://localhost:2000'));