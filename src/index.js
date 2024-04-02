import express from 'express';
import {generateSlides} from './services/index.js';

const app = express();
const port = process.env.PORT || 3000;
const {pptx, path} = await generateSlides();

app.get("/", (req, res) => {
    pptx.stream()
        .then((data) => {
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            res.writeHead(200, { "Content-disposition": "attachment;filename=" + path, "Content-Length": data.length });
            res.end(new Buffer.alloc(data.byteLength, data, "binary"));
        })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
