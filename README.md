# Мессенджер 

## Описание

Спринт 3. Яндекс Практикум. Мессенджер -  веб-приложение для обмена сообщениями. Приложение предоставляет пользователям возможность авторизации, регистрации, общения в чатах и управления профилем.
Реализованы следующие маршруты (+ для теста Netlify с автодеплоем ветки deploy). В рамках третьего спринта были добавлены новые фичи.

Ссылка на задеплоенный проект на Netlify:
**https://lambent-youtiao-bdebb9.netlify.app/**

Маршруты:
* **/**: LoginPage — главная страница для авторизации пользователя
* **/sign-up**: RegistrationPage — форма для создания новой учетной записи
* **/messenger**: ChatPage — основной интерфейс для общения с другими пользователями
* **/settings**: ProfilePage — управление данными пользователя и настройками аккаунта
* **/404**: NotFound — страница для проверки ошибки 404 (или любой другой неуказанный в списке путь)
* **/500**: SeverError  — страница для проверки ошибки 5**

## Установка
Чтобы установить проект, выполните следующие шаги:
1. Клонируйте репозиторий:
```bash
git clone https://github.com/alicedeni/messenger-ya-praktikum
cd messenger-ya-praktikum
```
2. Установите зависимости:
```bash
npm install
```
3. Запустите сервер разработки:
```bash
npm run dev
```
4. Для сборки и запуска проекта используйте:
```bash
npm run start
```
Теперь приложение будет доступно по адресу http://localhost:3000.

## Дизайн

Дизайн можно посмотреть по ссылке:
[Figma](https://www.figma.com/design/YukTQbnAnPryTqFhR4KTar/Messenger-YaPr?node-id=0-1&p=f&t=nRmr8M7eIWefx0DM-0)

## ## Основные изменения в Спринте 3

1. Добавление Route и Router, улучшена навигация, изменились маршруты

2. Внедрены HTTP API чатов
- Реализована регистрация и авторизация
- Добавлена возможность изменения информации о пользователе
- Работают чаты

3. Подключен WebSocket для сообщений

4. Внедрена функция sanitizeHTML
