const { MongoClient } = require('mongodb');

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const db = client.db('velyx_client');

// Collections
const licenses = db.collection('licenses');
const changelog = db.collection('changelog');
const users = db.collection('users');
const settings = db.collection('settings');

// Connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

// License functions
async function createLicense(licenseData) {
  const result = await licenses.insertOne({
    ...licenseData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result;
}

async function getLicenses(filter = {}) {
  return await licenses.find(filter).toArray();
}

async function updateLicense(username, updateData) {
  return await licenses.updateOne(
    { username },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
}

async function deleteLicense(username) {
  return await licenses.deleteOne({ username });
}

// Changelog functions
async function addChangelogEntry(entry) {
  const result = await changelog.insertOne({
    ...entry,
    createdAt: new Date(),
    dateLabel: new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }).toUpperCase()
  });
  return result;
}

async function getChangelog(limit = 20) {
  return await changelog.find().sort({ createdAt: -1 }).limit(limit).toArray();
}

async function clearChangelog() {
  return await changelog.deleteMany({});
}

// User functions
async function createUser(userData) {
  return await users.insertOne({
    ...userData,
    createdAt: new Date(),
    lastLogin: new Date()
  });
}

async function getUser(username) {
  return await users.findOne({ username });
}

async function updateUserLastLogin(username) {
  return await users.updateOne(
    { username },
    { $set: { lastLogin: new Date() } }
  );
}

// Settings functions
async function setSetting(key, value) {
  return await settings.replaceOne(
    { key },
    { key, value, updatedAt: new Date() },
    { upsert: true }
  );
}

async function getSetting(key) {
  const result = await settings.findOne({ key });
  return result ? result.value : null;
}

// Export functions
module.exports = {
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
  getSetting,
  client
};
