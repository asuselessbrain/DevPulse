import app from "./app";
import { config } from "./app/config";
import { initDB } from "./app/db";

const main = async () => {
  await initDB();
  app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
  });
}

main();