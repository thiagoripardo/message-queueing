import 'dotenv/config';
import './configs/modules-alias';
import mongooseConnection from './configs/mongoose';
import Server from './server';

const init = async () => {  
  try {
    await mongooseConnection();
    const server = new Server();
    server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

init();