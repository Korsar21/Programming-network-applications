# Лабораторная работа №6. Moon Reports Frontend with Fetch and Bundler. JavaScript

## Цель работы
Изучение современного подхода к выполнению HTTP-запросов через fetch, использование Promise и async/await, а также сборка frontend-приложения через bundler.

## Задание
Продолжить frontend-приложение из лабораторной работы №5:
- заменить XMLHttpRequest на fetch;
- заменить коллбеки на Promise и async/await;
- собрать frontend через bundler;
- развернуть собранный bundle на сервере c API;
- показать, что CORS больше не требуется, так как frontend и backend работают на одном origin.

## Реализованный функционал
- XHR заменён на fetch;
- асинхронная логика переписана на Promise и async/await;
- добавлена сборка проекта через Vite;
- собранный frontend раздаётся backend-сервером;
- запросы выполняются без CORS Unblock;
- в браузере показывается bundle без исходных модулей.

## Особенности демонстрации
Для демонстрации используется backend с подключённым собранным frontend bundle.
Необходимо показать:
- работу запросов через fetch;
- отсутствие ошибки CORS без расширения;
- вкладку Sources, где отображается bundle.

## Запуск
1. открыть папку `labs/lab_6` в терминале;
2. выполнить `npm install`;
3. выполнить `npm run build`;
4. перенести собранную папку `public` в backend-проект;
5. запустить backend-сервер;
6. открыть приложение по адресу `http://localhost:3000`.

## Структура проекта
- `pages` — страницы приложения;
- `components` — компоненты интерфейса;
- `modules/ajax.js` — запросы через fetch;
- `modules/reportApi.js` — методы API;
- `package.json` — зависимости и скрипты сборки;
- `vite.config.js` — конфигурация bundler;
- `public` — результат сборки frontend-приложения.