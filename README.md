# Point of Sale API

This project created for learning purpose of how to make an API using nodejs and express.js. Feel free to use this project for reference. ~~or not~~.

## Getting Started

Clone and install dependencies
```shell
> git clone https://github.com/reyusfa/pos-api.git
> cd pos-api
> yarn install
```
Start the server
```shell
> yarn start
now listening on http://127.0.0.1:3001
now connected to database...
```

### Requirements
  - NodeJS
  - NPM
  - Yarn
  - MySQL

Make sure to install the latest version.
### Setting Server & Database
Edit file .env to configure Server & MySQL connection.
```
SERVER_HOST=127.0.0.1
SERVER_PORT=3001
DB_HOST=127.0.0.1
DB_NAME=point_of_sale
DB_USERNAME=root
DB_PASSWORD=
```

## Folder Structures

```
├── index.js
├── node_modules
├── package.json
├── public
│   └── images
├── README.md
└── src
    ├── config
    │   └── mysql.js
    ├── controller
    │   ├── categories.js
    │   ├── orders.js
    │   └── products.js
    ├── helper
    │   └── index.js
    ├── middleware
    │   └── files.js
    ├── models
    │   ├── categories.js
    │   ├── orders.js
    │   └── products.js
    └── routes
        ├── categories.js
        ├── index.js
        ├── orders.js
        └── products.js
```

## API Reference

### Products
**Show all data products**
**`GET`** ` /products` 

##### Example Response:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "Juice",
      "price": 2000,
      "category_id": 1,
      "description": "Fresh Juice",
      "image": "public/images/image-1579661507990.jpeg",
      "created_at": "2020-01-22T02:51:48.000Z",
      "updated_at": "2020-01-22T02:51:48.000Z"
    },
    {
      "id": 2,
      "name": "Tea",
      "price": 2000,
      "category_id": 1,
      "description": "Fresh Tea",
      "image": "public/images/image-1579661516758.jpeg",
      "created_at": "2020-01-22T02:51:56.000Z",
      "updated_at": "2020-01-22T02:51:56.000Z"
    }
  ]
}
```

**Sorting, Filtering, & Pagination**

Supported query parameters:
- `?sort=name.desc`
- `?filter[name]=`
- `?limit=80`
- `?limit=10&page=2`
- `?limit=10&offset=30`

**Show data product by id**
**`GET`** `/products/:id`

##### Example Response:
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "Juice",
    "price": 2000,
    "category_id": 1,
    "description": "Fresh Juice",
    "image": "public/images/image-1579661507990.jpeg",
    "created_at": "2020-01-22T02:51:48.000Z",
    "updated_at": "2020-01-22T02:51:48.000Z"
  }
}
```

**Add data product**
**`POST`** `/products`

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "name": "Orange Juice",
  "price": 3000,
  "category_id": 1,
  "description": "Fresh Orange Juice"
}
```

**Update data product by id**
**`PUT`** `/products/:id`

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "price": 3000,
}
```

**Delete data product by id**
**`DELETE`** `/products/:id`

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "id": 1
}
```

### Categories
**Show all data categories**
**`GET`** `/categories`

##### Example Response:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "Drink",
      "created_at": "2020-01-22T02:51:48.000Z",
      "updated_at": "2020-01-22T02:51:48.000Z"
    },
    {
      "id": 2,
      "name": "Meal",
      "created_at": "2020-01-22T02:51:56.000Z",
      "updated_at": "2020-01-22T02:51:56.000Z"
    }
  ]
}
```

**Show data category by id**
**`GET`** `/categories/:id`

##### Example Response:
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "Drink",
    "created_at": "2020-01-22T02:51:48.000Z",
    "updated_at": "2020-01-22T02:51:48.000Z"
  }
}
```

**Add data category**
**`POST`** `/categories`

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "name": "Snack"
}
```

**Edit data category by id**
**`PUT`** `/categories/:id`

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "name": "Coklat"
}
```

**Delete data category by id**

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "id": 1
}
```

### Orders
**Show all data orders**
**`GET`** `/orders`

##### Example Response:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "reference": "67478591",
      "user_id": 1,
      "total": 50000,
      "created_at": "2020-01-22T13:51:33.000Z",
      "updated_at": "2020-01-22T13:51:33.000Z"
    },
    {
      "id": 1,
      "reference": "34751923",
      "user_id": 1,
      "total": 20000,
      "created_at": "2020-01-22T13:51:33.000Z",
      "updated_at": "2020-01-22T13:51:33.000Z"
    }
  ]
}
```

**Show data order by id**
**`GET`** `/orders/:id`

##### Example Response:
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "reference": "67478591",
    "user_id":  1,
    "total":  50000,
    "created_at": "2020-01-22T02:51:48.000Z",
    "updated_at": "2020-01-22T02:51:48.000Z"
  }
}
```

**Show items of order by id**
**`GET`** `/orders/:id/items`

**Show items detail of order**
**`GET`** `/orders/:id/items/:id_item`

**Add data order**
**`POST`** `/orders`

##### Request Header
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "user_id": 1,
  "orders": [
    {
      "product_id": 1,
      "quantity": 1
    },
    {
      "product_id": 2,
      "quantity": 2
    }
  ]
}
```

**Delete data order**

##### Request Header
```
Content-Type: application/x-www-form-urlencoded
```
or
```
Content-Type: application/json
```

##### Example Request:
```json
{
  "id": 1
}
```

## Work in Progress

### Users
~~**Show all data users**~~
~~**`GET`** `/users`~~

~~**Show data user by id**~~
~~**`GET`** `/users/:id`~~

~~**Update data user by id**~~
~~**`PUT`** `/users/:id`~~

~~**Delete data user by id**~~
~~**`DELETE`** `/users/:id`~~

### Login & Register
~~**Register user**~~
~~**`POST`** `/register`~~

~~**Login user**~~
~~**`POST`** `/login`~~