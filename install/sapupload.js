const fs = require('fs')
const fse = require('fs-extra');
const prompt = require('prompt-sync')();
const path = require('path');

console.log(path.join(__dirname, '..'));


//copy module
const srcDir = path.join(__dirname, 'nwabap-ui5uploader');
const destDir = path.join(__dirname, '..', 'node_modules', 'nwabap-ui5uploader');
                                
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {                 
    console.error(err);     
  } else {
    console.log("nwabap-ui5uploader was copied successfully");
  }
});


//copy settings
let consettings = {
    "base": "./dist",
    "conn_usestrictssl" : false,
    "conn_server": "",
    "conn_client" : "",
    "conn_user": "",
    "conn_password": "<password>",
    "abap_package": "",
    "abap_bsp": "",
    "abap_bsp_text": ""
}

let ret = prompt('Server to connect (http://<hostname>:<port>):');//, {echo: '*'});
consettings.conn_server = ret;
ret = prompt('SAP Client to connect:');
consettings.conn_client = ret;
ret = prompt('SAP User:');
consettings.conn_user = ret;
ret = prompt('SAP Package:');
consettings.abap_package = ret;
ret = prompt('SAP Application Name:');
consettings.abap_bsp = ret;
ret = prompt('SAP Application Description:');
consettings.abap_bsp_text = ret;

try {
  const data = fs.writeFileSync(path.join(__dirname, '..', '.nwabaprc'), JSON.stringify(consettings));
} catch (err) {
  console.error(err)
}