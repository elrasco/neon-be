FROM node:6.11.3

# Create app directory
ADD . /code
WORKDIR /code

EXPOSE 1337

RUN npm install

CMD [ "node", "app.js" ]