import createServer from './app';
import db from './config/database'
import config from "./config";
import Cache from "./config/redis"

const port = config.PORT || 5000;

const app = createServer();

Cache.connect();

console.log("Waiting for DATABASE Connection...");
db.connect();

(async () => {
  process.on("warning", (e) => config.logger.warn(e.stack));
  app.listen(config.PORT || 4000, async () => {
    console.log(
      `${config.APP_NAME} API listening on ${port || 4000}`
    );
  });
})();

process.on("unhandledRejection", (error: any) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
  //  throw error;
});