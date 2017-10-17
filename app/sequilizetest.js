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


sequelize.authenticate().then(() => {
  console.log("Success!");
  var logs = sequelize.define('logs', {
    timestamp: {
      type: Sequelize.DATE
    },
    type: {
      type: Sequelize.STRING
    },
    comments:{
        type: Sequelize.TEXT
    }
  },
  {
    freezeTableName: true
  });
  
  logs.sync().then(() => logs.create({
      timestamp: new Date(),
      type : 'test',
      comments: ` test : test1, recoreds: non by a million `
  }))
  .then(console.log)
   
}).catch((err) => {
  console.log(err);
});
