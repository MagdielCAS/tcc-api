import Reading from '../reading/model';
import Rnn from '../../services/tensorflow';
import neataptic from 'neataptic';

export const create = ({ body }, res, next) => {
  try {
    var query = { sensor: body.sensor };
    Reading.countDocuments(query)
      .then(count =>
        Reading.find(query).then(readings => ({
          count,
          rows: readings.map(reading => reading.view())
        }))
      )
      .then(resp => {
        var network = new neataptic.architect.LSTM(1, 4, 4, 1);
        var output = resp.rows.map(el => parseFloat(el.value));

        var max = Math.max(...output) + 100;
        var min = Math.min(...output) - 20;

        var first = parseFloat(resp.rows[0].date);
        var last = parseFloat(resp.rows[resp.count - 1].date) + body.predict;

        var trainingData = resp.rows.map(el => ({
          input: [(parseFloat(el.date) - first) / (last - first)],
          output: [(parseFloat(el.value) - min) / (max - min)]
        }));

        network.train(trainingData, {
          iterations: 20000,
          error: 0.0001,
          clear: true,
          rate: 0.01
        });
        // var output = resp.rows.map(el => parseFloat(el.value));
        var input = resp.rows.map(el => parseFloat(el.date));
        console.log(input);
        console.log(output);
        var steps = new Array(body.predict / 25)
          .fill(1)
          .map((el, index) => last + 25 + index * 25);
        var result = [];
        steps.forEach(el => {
          result.push(network.activate([(el - first) / (last - first)]) * max);
        });
        res.status(201).json({ result });

        // var rnn = new Rnn(
        //   Math.min(...output),
        //   Math.max(...output) + 50,
        //   input[0],
        //   input[input.length - 1] + body.predict
        // );
        // rnn.createAndCompileModel(10);
        // //train rnn
        // rnn
        //   .train(input, output)
        //   .then(r => rnn.predict(steps))
        //   .then(result => {
        //     res.status(201).json({ result });
        //   })
        //   .catch(err => {
        //     console.log('rnn error ' + err);
        //     res.status(401).send(err);
        //   });
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
