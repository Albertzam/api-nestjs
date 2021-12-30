FROM node:14.18.1 

WORKDIR /usr/src/app/

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build
EXPOSE 3001
CMD ["node", "dist/main"]

