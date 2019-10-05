FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
ENV SPOON_API_KEY="1f07a2ccbcmsh7e25e1fccb05730p19cefcjsna03f7e6acc89"
# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server/server.js" ]