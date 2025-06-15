import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/routers";
import notFound from "./app/middlwares/notFound";
import gobalErrorHandilers from "./app/middlwares/gobalErrorHandilers";
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://md-sanim-mia.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.json("prortfolio server");
});

app.use(gobalErrorHandilers);
app.use(notFound);
export = app;
