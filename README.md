## README

To run this project, please follow my instruction below

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
