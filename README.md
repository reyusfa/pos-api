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

Make sure to use latest version.
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
### API Reference

### Products
**Show all products**
**`GET`** ` /products`


**Sorting, Filtering, & Pagination**
>Supported query parameters:
`?sort=name.desc`
`?filter[name]=`
`?limit=80`
`?limit=10&page=2`
`?limit=10&offset=30`

**`GET`** `/products/:id`
**`POST`** `/products`
**`PUT`** `/products`
**`DELETE`** `/products`

**`GET`** `/categories`
**`GET`** `/categories/:id`
**`POST`** `/categories`
**`PUT`** `/categories`
**`DELETE`** `/categories`

**`GET`** `/orders`
**`GET`** `/orders/:id`
**`GET`** `/orders/:id/items`
**`GET`** `/orders/:id/items/:id_item`
**`POST`** `/orders`
**`DELETE`** `/products`

**`GET`** `/users`
**`GET`** `/users/:id`
**`PUT`** `/users`
**`DELETE`** `/users`

**`POST`** `/register`
**`POST`** `/login`