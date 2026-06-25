const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'users.json');

function readUsers() {
  try {
    if (!fs.existsSync(DB_PATH)) return [];
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
}

function findUserByEmail(email) {
  return readUsers().find((u) => u.email === email) || null;
}

function findUserById(id) {
  return readUsers().find((u) => u.id === id) || null;
}

function createUser({ username, email, passwordHash }) {
  const users = readUsers();
  const user = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    username,
    email,
    password_hash: passwordHash,
    created_at: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    writeUsers([]);
  }
}

function getDb() {
  return { findUserByEmail, findUserById, createUser };
}

module.exports = { initDb, getDb };
