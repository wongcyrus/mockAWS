FROM node:4.3.2

RUN mkdir /code
WORKDIR /code

ADD package.json /code/
RUN npm install
ADD . /code/

CMD ["node","preprocessing.js"]