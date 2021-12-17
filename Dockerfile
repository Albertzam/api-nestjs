#FROM node:14.18.1

# Create app directory
#WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package.json ./
#COPY yarn.lock ./
#RUN npm install --global yarn
#RUN yarn install
# If you are building your code for production
#RUN npm ci --only=production

# Bundle app source
#COPY . .

#EXPOSE 3000
#CMD [ "yarn", "run","start:dev" ]

FROM node:14.18.1 

WORKDIR /usr/src/app/

COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

