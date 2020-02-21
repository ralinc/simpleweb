const express = require('express');
const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const app = express();

client.set('count', 0);

app.get('/', (request, response) => {
  client.get('count', (error, count) => {
    response.send('Count: ' + count);
    client.set('count', parseInt(count) + 1);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080'); // eslint-disable-line no-console
});
