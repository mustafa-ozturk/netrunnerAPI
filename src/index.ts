import { app } from "./app.js";
import { config } from "./config.js";

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});
