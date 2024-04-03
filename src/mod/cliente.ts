import net from 'net';
import fs from 'fs';
import { exit } from 'process';

const client = new net.Socket();
const PORT = 3000;

if (process.argv.length < 3) {
  console.log('Usage: node dist/mod/cliente.js <filename>');
  exit(-1);
}

if (fs.existsSync(process.argv[2]) === false) {
  console.log(`File ${process.argv[2]} does not exist`);
  exit(-1);
}

client.connect(PORT, () => {
  console.log(`Connected to server`);
  client.write(process.argv[2]);
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('close', () => {
  console.log('Connection closed');
});
