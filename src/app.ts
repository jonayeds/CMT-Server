import express, { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";
import { Attendance } from "./app/modules/attendance/attendance.model";
const app: Application = express();

// persers
app.use(express.json());
app.use(cors());

// application Routes
app.use("/api/v1/", router);

app.get("/api/v1", async (req: Request, res: Response) => {
  res.send("Server is Running...🏃🏼‍♂️‍➡️");
});

app.use(errorHandler);

app.use(notFound);

export default app;
