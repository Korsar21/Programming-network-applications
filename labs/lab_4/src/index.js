const express = require('express');
const reportsRouter = require('./routes/reports');

const app = express();
const PORT = 3000;

// Встроенный middleware для разбора JSON тела запроса
app.use(express.json());

// Простое логирование запросов
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Корневой маршрут для быстрой проверки
app.get('/', (req, res) => {
    res.json({
        message: 'Moon Reports API работает'
    });
});

// Подключение маршрутов API
app.use('/reports', reportsRouter);

// Обработчик 404 для несуществующих маршрутов
app.use((req, res) => {
    res.status(404).json({
        message: 'Маршрут не найден'
    });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: 'Внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});