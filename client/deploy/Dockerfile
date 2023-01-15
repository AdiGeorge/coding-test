FROM node:16-alpine

RUN mkdir /client
RUN chown -R node:node /client
WORKDIR /client
COPY . /client/
EXPOSE 3000

CMD ["sh", "-c", "npm run client:start"]
