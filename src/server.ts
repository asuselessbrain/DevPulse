import app from "./app";
import { config } from "./app/config";

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});