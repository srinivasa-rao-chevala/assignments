const crypto = require('crypto');
const WebSocket = require('ws');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 1024 * 2,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
    }
});

var plainText="Message from Server One  ";
function encryptString (plainText, publicKey) {
    const encrypted = crypto.publicEncrypt(
        publicKey, Buffer.from(plainText,"base64"));
    return encrypted;
}

function decryptString(plaintext, privateKey) {
    const decrypted = crypto.privateDecrypt({
        
        key: privateKey,
        passphrase: ''
    },
        Buffer.from(plaintext));
    return decrypted.toString('base64');
}

const wss = new WebSocket.Server({ port: 3003 });
var deCipherValue;
wss.on('connection', function connection(ws) {
    var i = 0,publicKeyOfServerTwo;
    ws.send(publicKey);
    ws.on('message', function incoming(message) {
            
            deCipherValue = decryptString(message, privateKey);
            console.log(deCipherValue);
    });
});