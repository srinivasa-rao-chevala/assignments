const crypto = require('crypto');
const WebSocket = require('ws');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 1024*2,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
    }
});
//console.log(publicKey.toString('base64'));
//console.log(privateKey.toString('base64'));

//var privateKeyOfServerTwo=privateKey.toString('base64');
var plainText="Message from Server two  ";
function encryptString (plainText, publicKey) {
    const encrypted = crypto.publicEncrypt(
         publicKey, Buffer.from(plainText,"base64"));
    return encrypted;
}

const socket = new WebSocket('ws://localhost:3003');
socket.addEventListener('open', function (event) {
    //socket.send(publicKey);
});
socket.addEventListener('message', function (event) {

        console.log('Public Key Of Server 1 :- ',event.data);
          var encrypted = encryptString(plainText,event.data);
         socket.send(encrypted);
});
