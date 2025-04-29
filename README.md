## README

This project is for Technical Test at BTS.id, To run this project, please follow my instruction below

Author: Syahrul Safarila

## Tech info

1. Database: Postgres
2. Backend library/framework: Express with Typescript
3. Database ORM: Prisma

### 1. install the dependencies by running

```sh
npm install
```

### 2. if there is no "dist" folder, please run

```sh
npm run build
```

### 3. copy the env file, then update the database connection string to fit your environtment

```sh
cp .env.example .env
```

### 4. push the migration to the database, please run

```sh
npx prisma migrate deploy
```

### 5. initialize prisma client, please run

```sh
npx prisma generate
```

### 6. last, run the project by running this command below

```sh
npm start
```

or

```sh
node dist/index.js
```

## Test

To test the API, you can import the Postman Collection on this root project.

Filename: postman_collection.json