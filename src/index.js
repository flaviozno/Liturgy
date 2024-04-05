import cors from "cors";
import express from "express";
import { generateSlides } from "./services/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const sendPPTX = async (pptx, path, res) => {
  try {
    const data = await pptx.stream();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    res.setHeader("Content-disposition", "attachment;filename=" + path);
    res.setHeader("Content-Length", data.length);
    res.end(data, "binary");
  } catch (error) {
    console.error("Error sending PPTX:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

app.get("/", async (req, res) => {
  try {
    const { pptx, path } = await generateSlides();
    sendPPTX(pptx, path, res);
  } catch (error) {
    console.error("Error generating slides:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const { day, month } = req.body;
    const { pptx, path } = await generateSlides(day, month);
    sendPPTX(pptx, path, res);
  } catch (error) {
    console.error("Error generating slides:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
