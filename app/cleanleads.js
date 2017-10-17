const program = require('commander');
const spawn = require('child_process').spawn;
// Require logic.js file and extract controller functions using JS destructuring assignment
///onst { addContact, getContact } = require('./logic');
const pycom = require('./pycom')

let p = new pycom()

program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('addContact <firstame> <lastname> <phone> <email>')
  .alias('a')
  .description('Add a contact')
  .action((firstname, lastname, phone, email) => {
   console.log({firstname, lastname, phone, email});
  });



program
  .command('importNationalDnc <name>')
  .alias('r')
  .description('hellop')
  .action(name => {
    console.log('hello')
   
    p.importNationalDnc(name,'../temprocessingdata/formattednationaldnc.csv')
  })
//c:\\cleanleads\\importtestdata\\2017-6-1_dnc.csv

program
  .command('importLeads <name>')
  .alias('il')
  .description('hellop')
  .action(name => {
    console.log('hello', name)
    p.formatLeads(name,'phone1')
    //.then(console.log)
  })
  

program
  .command('exportLogs <name>')
  .alias('il')
  .description('hellop')
  .action(name => {
    console.log('hello')
    p.exportLogs(name)
  })
  
// c:\\cleanleads\\importtestdata\\njleads.csv

program.parse(process.argv);