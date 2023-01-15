FROM node:16-alpine

RUN mkdir /event-generator
RUN chown -R node:node /event-generator
WORKDIR /event-generator
COPY . /event-generator/
EXPOSE 3000

CMD ["sh", "-c", "npm run server:start"]
