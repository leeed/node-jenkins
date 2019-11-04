FROM node

RUN mkdir /opt/app
COPY . /opt/app/
WORKDIR /opt/app

RUN npm install -g express
RUN npm install -g body-parser
RUN npm install -g nodemon

RUN npm install typescript
RUN npm install ts-node
RUN npm install

EXPOSE 3000

CMD npm run start-dev 