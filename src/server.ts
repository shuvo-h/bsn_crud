import { Server } from 'http';
import app from "./app";
import { config } from "./config/config";

async function bootstrap_server(){
  if (!config.PORT) {
    throw new Error("Please provide PORT on env")
    return
  }
    const server:Server = app.listen(config.PORT,()=>{
        console.log(`Server running on `, config.PORT);
    })
    const exitHandler = () => {
        if (server) {
          server.close(() => {
            console.info('Server closed');
          });
        }
        process.exit(1);
      };

      const unexpectedErrorHandler = (error: unknown) => {
        console.error(error);
        exitHandler();
      };

      process.on('uncaughtException', unexpectedErrorHandler);
      process.on('unhandledRejection', unexpectedErrorHandler);

 }

 bootstrap_server()