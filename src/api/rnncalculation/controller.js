import Reading from '../reading/model';

export const create = ({ body }, res) => {
  try {
    var spawn = require('child_process').spawn,
      py = spawn('python', ['./src/services/python/compute_pyrenn.py']),
      dataString = '';

    py.stdout.on('data', function(data) {
      dataString = data.toString();
    });
    py.stdout.on('end', function() {
      console.log(dataString);
      var split = dataString.split('/');
      res.status(201).send({ result: JSON.parse(split[1]) });
    });

    var query = { sensor: body.sensor };
    Reading.countDocuments(query)
      .then(count =>
        Reading.find(query).then(readings => ({
          count,
          rows: readings.map(reading => reading.view())
        }))
      )
      .then(resp => {
        var data = resp.rows.map(el => [
          parseFloat(el.value),
          parseFloat(el.date)
        ]);

        var stream = { predict: body.predict, data, step: 25 };
        py.stdin.write(JSON.stringify(stream));
        py.stdin.end();
      })
      .catch(err => {
        console.log(err);
        res.status(401).send(err);
      });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
