const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb+srv://bloom:29042008@cluster0.nlqx0lx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  email: String,
  password: String,
});

app.use(express.json());

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка, что пользователь с таким email не существует
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при регистрации' });
  }
});

// Вход пользователя
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Поиск пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь с таким email не найден' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Создание и отправка JWT токена
    const token = jwt.sign({ userId: user._id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при входе' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
