const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { getDb, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'spontan-dev-secret-change-in-production';

initDb();
const db = getDb();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function publicUser(row) {
  return { id: row.id, username: row.username, email: row.email };
}

app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: '请填写完整信息' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '密码至少 6 位' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (db.findUserByEmail(normalizedEmail)) {
    return res.status(409).json({ message: '该邮箱已注册' });
  }

  const row = db.createUser({
    username: username.trim(),
    email: normalizedEmail,
    passwordHash: bcrypt.hashSync(password, 10),
  });

  const user = publicUser(row);
  res.status(201).json({ token: createToken(user), user });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: '请输入邮箱和密码' });
  }

  const row = db.findUserByEmail(email.trim().toLowerCase());
  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return res.status(401).json({ message: '邮箱或密码错误' });
  }

  res.json({ token: createToken(publicUser(row)), user: publicUser(row) });
});

app.get('/api/auth/me', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: '未登录' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const row = db.findUserById(payload.id);
    if (!row) {
      return res.status(401).json({ message: '用户不存在' });
    }
    res.json({ user: publicUser(row) });
  } catch {
    res.status(401).json({ message: '登录已过期，请重新登录' });
  }
});

app.listen(PORT, () => {
  console.log(`Spontan running at http://localhost:${PORT}`);
});
