import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/config";

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);
    app.listen(config.port, () => {
      console.log(`portfolio app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
