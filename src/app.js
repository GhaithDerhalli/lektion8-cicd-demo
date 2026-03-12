const express = require('express');
const app = express();

app.use(express.json());

// ⚠️ DEMO-SÅRBARHET: eval() är farligt – SAST kommer flagga detta
app.get('/search', (req, res) => {
  const query = req.query.q;
  // Aldrig gör såhär på riktigt!
  const result = eval(`"Sökte efter: " + "${query}"`);
  res.json({ result });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Appen körs på port ${PORT}`);
});

module.exports = app;
