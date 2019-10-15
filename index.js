// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
const util = require('util');
var moment = require('moment-timezone');

//DEclare Project ID and Key File
const GOOGLE_CLOUD_PROJECT_ID = 'kmutnb-depa-ioc';
const GOOGLE_CLOUD_KEYFILE = './kmutnb-depa-ioc-9a1683180856.json';

//const datasetName = 'pocdataset';
// Creates a client
const bigqueryClient = new BigQuery({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE
});

//Query Table Car Colour
const sqlQuery = `SELECT * FROM \`kmutnb-depa-ioc.raw_output_old.carColor\` WHERE carColor = 'Pink' LIMIT 100`;

//Query Table Car Type
//const sqlQuery = `SELECT * FROM \`kmutnb-depa-ioc.raw_output_old.carType\` WHERE carType = 'Sedan' LIMIT 10000`;

//Query Table License Plate
//const sqlQuery = `SELECT * FROM \`kmutnb-depa-ioc.raw_output_old.licensePlate\` LIMIT 10000`;

const options = {
  query: sqlQuery,
  location: 'US'
};

//Query Function
async function queryCarColour() {
  const [rows] = await bigqueryClient.query(options);
  console.log('Query Result:');

  rows.forEach(row => {
    const camID = row['camID'];
    const datetime = row['datetime'];
    var localTime = moment(datetime.value)
      .local()
      .format('YYYY-MM-DD HH:mm:ss');
    const carColor = row['carColor'];

    console.log(`camID:${camID},datetime:${localTime},carColor:${carColor}`);
  });
}

async function queryCarType() {
  const [rows] = await bigqueryClient.query(options);
  console.log('Query Result:');

  rows.forEach(row => {
    const camID = row['camID'];
    const datetime = row['datetime'];
    const carModel = row['carModel'];
    const carType = row['carType'];

    console.log(
      `camID:${camID},datetime:${datetime.value},carModel:${carModel},carType:${carType}`
    );
  });
}

async function queryLicensePlate() {
  const [rows] = await bigqueryClient.query(options);
  console.log('Query Result');

  rows.forEach(row => {
    const frame = row['frame'];
    const top = row['top'];
    const bottom = row['bottom'];
    const left = row['left'];
    const right = row['right'];
    const cat = row['cat'];
    const confident = row['confident'];
    const video = row['video'];

    console.log(
      `frame:${frame},top:${top},bottom:${bottom},left:${left},right:${right},cat:${cat},confident:${confident},video:${video}`
    );
  });
}

//Run Command Query
//queryCarColour();
//queryCarType();
//queryLicensePlate();

var localTime = moment('2019-10-02T22:57:26')
  .local()
  .format('YYYY-MM-DD HH:mm:ss');

console.log(localTime);
