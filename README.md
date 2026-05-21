

```markdown
# Лабораторная работа №6. Moon Reports Frontend (fetch + async/await + Bundler)

## Оглавление
- [Цель работы](#цель-работы)
- [Задание](#задание)
- [Скриншоты фронтенда](#скриншоты-фронтенда)
- [Важные части кода](#важные-части-кода)
- [Запуск и демонстрация](#запуск-и-демонстрация)
- [Структура проекта](#структура-проекта)

---

## Цель работы
- Переписать XHR на fetch + async/await.
- Добавить кнопку «Сохранить» для добавления отчётов.
- Собрать фронтенд через bundler (Vite).

## Задание
- Frontend взаимодействует с backend 4-й лабы.
- Загрузка, фильтрация и добавление отчётов через fetch.
- Сборка bundle для раздачи через backend.

## Скриншоты фронтенда
![Главная страница](./screenshots/Снимок экрана 2026-05-21 172443.png)

## Важные части кода
```javascript
// modules/reportApi.js
export async function addReport(reportData) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reportData)
  });
  return await res.json();
}