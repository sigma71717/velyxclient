const express = require('express');
const cors = require('cors');
const { 
  connect, 
  createLicense, 
  getLicenses, 
  updateLicense, 
  deleteLicense,
  addChangelogEntry,
  getChangelog,
  clearChangelog,
  createUser,
  getUser,
  updateUserLastLogin,
  setSetting,
  getSetting
} = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connect();

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  // Simple token validation (in production, use JWT)
  if (token !== 'admin-token') {
    return res.sendStatus(403);
  }
  
  next();
};

// License routes
app.get('/api/licenses', async (req, res) => {
  try {
    const licenses = await getLicenses();
    res.json(licenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/licenses', authenticateToken, async (req, res) => {
  try {
    const result = await createLicense(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/licenses/:username', authenticateToken, async (req, res) => {
  try {
    const result = await updateLicense(req.params.username, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/licenses/:username', authenticateToken, async (req, res) => {
  try {
    const result = await deleteLicense(req.params.username);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Changelog routes
app.get('/api/changelog', async (req, res) => {
  try {
    const changelog = await getChangelog();
    res.json(changelog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/changelog', authenticateToken, async (req, res) => {
  try {
    const result = await addChangelogEntry(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/changelog', authenticateToken, async (req, res) => {
  try {
    const result = await clearChangelog();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User routes
app.post('/api/users/login', async (req, res) => {
  try {
    const { username } = req.body;
    let user = await getUser(username);
    
    if (!user) {
      // Create new user
      user = await createUser({
        username,
        role: username.toLowerCase() === 'admin' ? 'admin' : 'user',
        email: `${username}@velyx.client`
      });
    }
    
    await updateUserLastLogin(username);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await getUser(req.params.username);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Settings routes
app.get('/api/settings/launcher-url', async (req, res) => {
  try {
    const url = await getSetting('launcher_url');
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings/launcher-url', authenticateToken, async (req, res) => {
  try {
    await setSetting('launcher_url', req.body.url);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Velyx API server running on port ${PORT}`);
});
