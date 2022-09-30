# Todo App
Задание состояло из нескольких уровней сложности. Более удобным путём для меня было не двигаться от простого к сложному, а сразу определиться с тем, что я буду делать Fullstack приложение используя Node.js/Express.js для бэкенда, PostgreSQL в качестве реляционной базы данных и  React.js в качестве фронтенд фреймворка. Поэтому я сначала написала бекенд часть, а потом приступила к части фронтенда.

## Стек
**Frontend**
- React.js
- TypeScript
- scss modules
- Redux Toolkit
- Axios
- React Router Dom v6

**Backend**
- Node.js
- Express
- sequelize

## Инструкция по запуску проекта
Сначала нужно склонировать проект
```sh
git clone https://github.com/valeriadmitrievna-dev/fullstack-test-api.git
```
Затем нужно перейти в папку с проектом
```sh
cd fullstack-test-api
```
Установить node_modules
```sh
npm install
```
Проверить наличие файла переменных окружения в корне проекта (**.env**). Так как этот файл добавлен в .gitignore, то при клонировании проекта его не будет. Его необходимо создать и добавить переменные:

```sh
PORT=[PORT]
SECRET=[SECRET KEY FOR JWT]
DATABASE_URL=postgres://[USERNAME]:[PASSWORD]@[HOST]:5432/[NAME]
```

И запустить проект
```sh
npm start
```
## ✅ Level 1: Frontend
> Делаем классическое ToDo List приложение. Пользователь должен видеть список задач, иметь 
> возможность их добавлять, удалять, редактировать, отмечать как выполненные. Хранить данные в 
> оперативной памяти. Для реализации использовать VanillaJS или React. Дополнительные JS библиотеки 
> можно использовать при необходимости. Для работы с CSS можно использовать любые библиотеки, 
> но нельзя использовать готовые компоненты(Material UI, Ant Design и т.д). Стилизовать интерфейс по 
> своему вкусу.

Несмотря на то, что я условно пропустила этот шаг, приступив сразу к созданию фронтенда на React, связанного с бекендом, могу предположить, что этот шаг выполнен.

## ✅ Level 2: Новые фичи
Уровень 2 - добавление новых фич. В задании сказано:
> Этот уровень содержит несколько разных вариантов доработок, **можно выполнить только часть из них**

Поэтому пройдемся по списку и рассмотрим, какие фичи из оригинального списка реализованы в этом проекте.
- ✅ **Поиск по задачам**
- ✅ **Хранить данные в LocalStorage или IndexedDB** 
считаю этот шаг выполненным, потому как в итоге данные хранятся в PostgreSQL + Redux Toolkit на фронте
- ✅ **Использование библиотеки управления состоянием**
полагаю к этому пункту можно отнести использование useState и Redux Toolkit
- ✅ **Детальный просмотр задачи при клике и добавление полного описание к ней, в списке отображаются только заголовки**
В списке можно увидеть часть описания задачи, но максимум - 2 строчки и далее `text-overflow: ellipsis;`
- ✅ **Указание времени создания задачи, возможность указать ожидаемое время выполнение, добавления задачам визуального статуса “Просрочена”**
- ❌ <s>Возможность создавать различные списки задач со своими заголовками, а также удалять, просматривать и редактировать их</s>
- ❌ <s>Адаптивная верстка</s>
- ❌ <s>Изменение очередности задач с помощью Drag&Drop</s>

## ✅ Level 3: Backend
> Добавляем к нашему приложению бэкенда на NodeJS + Express(по желанию). Теперь данные по приложения должны храниться в оперативной памяти сервера. Сервер должен предоставлять HTTP REST API, которое будет использовать фронт.

Бекенд на хероку находится по адресу ***https://random-todo-api.herokuapp.com/***

## ✅ Level 4: Database
> Для хранения данных приложения будем использовать реляционную базу данных(можно брать любую). Доработать сервер для взаимодействия с ней, отказаться от хранения в оперативной памяти.

В этом проекте в качестве реляционной базы данных используется **PostgreSQL** в связке с **sequelize**.

## ❌ Level 5: Инфраструктура
> Все части приложения нужно запускать в Docker контейнерах. UI, сервер и даже базу данных. Должно получиться 3 контейнера. Опционально: использовать docker-compose, монтировать volume для базы данных.

Данный пункт не был выполнен за неимением у меня опыта работы с Docker'ом. **Однако** вместо этого я задеплоила проект на **heroku**. Ознакомиться с ним вы можете по ссылке - ***https://random-todo-application.herokuapp.com/***