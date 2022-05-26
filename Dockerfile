FROM node:12.13-alpine As development

EXPOSE 3000

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build

CMD ["node", "./build/src/app.js"]