FROM node:8.2.1

RUN mkdir /app
COPY . /app/.
WORKDIR /app
RUN rm -rf node_modules
RUN rm -rf client/node_modules
RUN yarn install
RUN yarn add pm2
RUN yarn pm2 install pm2-logrotate

CMD ["yarn", "execute"]
