const enc_dec = require('./utils/enc_dec') ;

let x =enc_dec.encrypt('dsjkffh');

console.log(typeof(x)) 
console.log(x)

console.log(enc_dec.decrypt(x.encryptedData) ); 