const Sequelize = require('sequelize');
const sequelize = new Sequelize('leads', 'postgres', 'solar1', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

const { Client } = require('pg')

const client = new Client({
  host: 'localhost',

  database: 'leads',
  user: 'postgres',
  password: 'solar1',
})
client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
})
//COPY dnctest FROM 'C:\\postgrestest\\nodetest\\mergeddnc.csv' DELIMITER ',';
client.query("Copy (SELECT * FROM test EXCEPT SELECT * FROM dnctest) to 'C:\\postgrestest\\nodetest\\testrestulsts.csv' DELIMITER ',';", (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res)
    }
  })

  client.query('SELECT * from test', (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
// sequelize.authenticate().then(() => {
//   console.log("Success!");
//   var leads = sequelize.define('leads', {
//     areacode: {
//       type: Sequelize.INTEGER
//     },
//     phoneINTEGER: {
//       type: Sequelize.INTEGER
//     }
//   }, {
//     freezeTableName: true
//   });

//    var nationaldnc = sequelize.define('nationaldnc', {
//     phoneINTEGER: {
//       type: Sequelize.INTEGER
//     }
//   }, {
//     freezeTableName: true
//   });

//   var companydnc = sequelize.define('companydnc', {
//     phoneINTEGER: {
//       type: Sequelize.INTEGER
//     }
//   }, {
//     freezeTableName: true
//   });


//    leads.sync({force: true}).then(() => {})
//    nationaldnc.sync({force: true}).then(() => {})
//    companydnc.sync({force: true}).then(() => {})
// }).catch((err) => {
//   console.log(err);
// });

// v /g:mergeddnc.csv extractedleads.csv > result.csv


//  COPY table FROM '/tmp/table.csv' DELIMITER ',';
// COPY table TO '/tmp/table.csv' DELIMITER ',';


//  COPY table FROM 'C:\\postgrestest\\nodetest\\mergeddnc.csv DELIMITER ',';

//COPY dnctest FROM 'C:\\postgrestest\\nodetest\\mergeddnc.csv' DELIMITER ',';


//SELECT COUNT(*) FROM TABLE_NAME; 

// SELECT COUNT(*) FROM dnctest;


// Copy (SELECT * FROM test EXCEPT SELECT * FROM dnctest) to 'C:\\postgrestest\\nodetest\\testrestulsts.csv' DELIMITER ',';
