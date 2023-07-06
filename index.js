const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(cors());
const port = 8000;
app.use(bodyParser.json());
mongoose
  .connect("mongodb://0.0.0.0:27017/ATS")
  .then(() => {
    console.log("db is connected");
  })
  .catch((e) => {
    console.log(`${e}`);
  });

app.listen(8000, () => {
  console.log("server is running at 8000");
});


const callRecordingSchema = new mongoose.Schema({
  callDateFrom: String,
  callDateTo: String,
  phoneNo: String,
  volunteerNumber: String,
  campaignId: String,
  agentId: String,
});

const CallRecording = mongoose.model('CallRecording', callRecordingSchema);

app.post('/api/callRecordings', (req, res) => {
  const recordingData = req.body;
  console.log("Body data",req.body)

  const newRecording = new CallRecording(recordingData);

newRecording.save()
  .then(() => {
    res.status(200).send('Data saved successfully');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error saving the data');
  })
});

app.get('/api/callRecordings', (req, res) => {
  CallRecording.find()
    .then((recordings) => {
      res.status(200).json(recordings);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving the data');
    });
});


