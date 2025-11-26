# Hello ;d To launch this application you need to set up your own PostgreSQL database first (no Docker, only hardcore).

## Database Setup
### 1. Create PostgreSQL Database

```sql
CREATE DATABASE yourdb;
```

or 

```
createdb yourdb
```


then fill your .env file in backend folder with the following data
```
DATABASE_URL=postgresql://username:password@localhost:5432/yourdb
PORT=3000

```

### 2. Dependencies installation

Install dependencies both in front-end and backend using `npm install`
Then you'll need to make some migrations, write in your back-end folder `npx prisma migrate dev` 

### 3. Running the project

Run the project using `npm run dev` in both front-end and backend
