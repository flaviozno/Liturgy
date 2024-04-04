import cors from 'cors'
import express from 'express';
import {generateSlides} from './services/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const sendPPTX = (pptx, path, res) => {
    pptx.stream()
        .then((data) => {
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            res.writeHead(200, { "Content-disposition": "attachment;filename=" + path, "Content-Length": data.length });
            res.end(new Buffer.alloc(data.byteLength, data, "binary"));
        })
}

app.get("/", async (req, res) => {
    const {pptx, path} = await generateSlides();
    sendPPTX(pptx, path, res)
});

app.post('/' , async (req, res) => {
    const {day, mounth} = req.body;
    const {pptx, path} = await generateSlides(day, mounth);

    sendPPTX(pptx, path, res)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
