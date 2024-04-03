import net from 'net';
import { spawn } from 'child_process';

const PORT = 3000;

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const fileName = data.toString();
    const cat = spawn('cat', [fileName]);
    const wc = spawn('wc');
    cat.stdout.pipe(wc.stdin);
    
    wc.stdout.on('data', (output) => {
      const [space, lines, words, characters] = output.toString().split(/\s+/).map(Number);
      socket.write(`Lines: ${lines}, Words: ${words}, Characters: ${characters}`);
      console.log('Conection closed correctly.')
      server.close();
    });

    cat.on('error', (error) => {
      socket.write(`Error: ${error}`);
      server.close();
    });

    wc.on('error', (error) => {
      socket.write(`Error: ${error}`);
      server.close();
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
