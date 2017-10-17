const spawn = require('child_process').spawn;
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
   
class pycom {

    importNationalDnc(inputfile, outputfile){
        console.log('go go power rangers ')
        let py  = spawn('py', ['./mergednc.py', inputfile, outputfile])
        let dataString = "";
        /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
         py.stdout.on('data', function(data){
          //console.log("get datat", data) 
          dataString += data.toString();
        });
      
        py.stdout.on('end', function(){
          console.log(dataString);
          let importNationalQuery = "COPY dirtyleads FROM 'c:\\cleanleads\\temprocessingdata\\formattednationaldnc.csv' DELIMITER ',';";
          client.query(importNationalQuery)
          .then(console.log)
          .catch(console.log)
        }); 
        py.stdout.on('error', function(err){
            console.log(err);
          
          }); 
        py.stdin.end()   
    }

    formatLeads(inputfile, phonecolname){
      this.pyFormat(inputfile, phonecolname).then(function(statObj){
     
          console.log(statObj)
         
          console.log("--- invalid leads stats --", statObj)
          let importDirtyQuery = "COPY dirtyleads FROM 'c:\\cleanleads\\temprocessingdata\\validleads.csv' DELIMITER ',';";
          let exceptQuery = "Copy (SELECT * FROM dirtyleads EXCEPT SELECT * FROM dnctest) to 'C:\\cleanleads\\temprocessingdata\\cleanleads.csv' DELIMITER ',';"
          let importCleanQuery = "COPY cleanleads FROM 'C:\\cleanleads\\temprocessingdata\\cleanleads.csv' DELIMITER ',';";
          let logsQuery  = "insert into logs values"

          client.query("truncate dirtyleads")
          .then( r =>  client.query(importDirtyQuery))
          .then(r  =>  client.query(exceptQuery))
          .then(r  =>  client.query(importCleanQuery))
          .then(r =>{
            console.log('--- r ---', r)
             let valid = Number(statObj.orignalcount) - Number(statObj.removed);
             let removed = valid - Number(r.rowCount)
             console.log(r.rowCount)
             console.log(r)
             console.log(valid)

             return removed
          })
          .then(r  =>{
            let d = new Date().toUTCString();
            let cStr = `Total numbers removed from dnc: ${r}
                        Total invalid numbers removed :  ${statObj.removed}
                        `
            let vals = `('leadsimport',${cStr}, ${d})`
            let q    = logsQuery + vals;

            console.log(cStr)
            console.log(vals)
            //return client.query(q)
          })
          .then(console.log)
          .catch(console.log)
        }); 
         
    }

    exportLogs(outputfile){
      let Query = `COPY dirtyleads TO '${outputfile}' DELIMITER ',';";`
      client.query(Query)
      .then(console.log)
      .catch(console.log)
    }

    pyFormat(inputfile, phonecolname){
      let py  = spawn('py', ['./formatleads.py', inputfile, phonecolname])
      let formatPromise = new Promise((resolve, reject) => {
        let dataString = "";
        
        py.stdout.on('data', function(data){
          dataString += data.toString();
        });

        py.stdout.on('end', function(){
          let statsArr = dataString.split(',')
          let dncRemoved = 0;
        
          let statObj =statsArr.reduce( (acc, val) => {
              let stat = val.split('-');
              acc[stat[0]] = stat[1];
              return  acc;
          }, {})
          console.log(statObj)   
          console.log(dataString)
          resolve(statObj)
        }); 

        py.stdout.on('error', function(err){
          console.log(err);
          reject(err)
        }); 
       
        py.stdin.end()   
      
      });

      return formatPromise;
    }
}

module.exports = pycom;