import mqtt from 'mqtt';

export const create = ({ body }, res, next) => {
  try {
    var cont = 0;
    let client = mqtt.connect(
      process.env.MQTT_BROKER,
      {
        clientId: `server/${body.sensor}`,
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD
      }
    );
    client.on('connect', () => {
      client.subscribe(`${body.sensor}/config/#`, function(err) {
        if (!err) {
          client.publish(`${body.sensor}/config/period`, `${body.period}`);
          client.publish(`${body.sensor}/config/size`, `${body.time}`);
        }
      });
    });
    client.on('message', (t, message) => {
      if (
        `${body.sensor}/config/period` === t ||
        `${body.sensor}/config/size` === t
      ) {
        cont = cont + 1;
      }
      if (cont === 2) {
        cont = 0;
        client.end();
        res.status(201).send(body);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
