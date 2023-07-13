FROM node:18.8.0

WORKDIR /app

COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm install

COPY . .

RUN npm run build

# ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}

CMD [ "npm", "start" ]
