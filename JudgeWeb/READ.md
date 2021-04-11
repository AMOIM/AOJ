## 실행 방법
---
```
### backend/.env setup
MONGO_URI = 'mongodb://localhost/DATABASE_NAME'
PORT = 3000
SECRET_KEY = whatever // You can set the secret key however you want

### Compiles and minifies for production
cd frontend
npm install
npm run build

### Compiles and hot-reloads for development
cd ../backend
npm install
npm start
```
