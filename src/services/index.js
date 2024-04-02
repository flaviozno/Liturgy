import os from 'os';
import path from 'path';
import { dirname } from 'path';
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'url';
import {colors} from '../styles/index.js'
import {getLiturgy} from '../api/index.js';

export const generateSlides = async () => {
    try {
        const pptx = new pptxgen();

        const liturgy = await getLiturgy()

        if(!liturgy) return null;

        const { liturgia, data, cor, primeiraLeitura, segundaLeitura, evangelho } = liturgy;
        
        if(liturgia)
            generateOpening(pptx.addSlide(), liturgia, cor, data)
        if(primeiraLeitura && primeiraLeitura !== "Não há primeira leitura hoje!")
            generateSlideByTopic(pptx, primeiraLeitura)
        if(segundaLeitura && segundaLeitura !== "Não há segunda leitura hoje!")
            generateSlideByTopic(pptx, segundaLeitura)
        if(evangelho)
            generateSlideByTopic(pptx, evangelho)

        return {pptx: pptx, path: `Liturgia_${data.replaceAll("/", "_")}.pptx`};
    } catch (error) {
        console.log(error)
    }
}

const addLineBreak = (text, breakIndexNumber) => {
    text = text.replace(/\d+/g, '').trim();
    const breakIndex = text.lastIndexOf(' ', breakIndexNumber);
    if (breakIndex > -1) {
      return text.substr(0, breakIndex) + '\n' + text.substr(breakIndex + 1).trim()
    }
    return text;
};

const generateOpening = (pptx, text, cor, data) => {
    pptx.addText(text, { fontSize: 24, align: "center", w: '100%', h: 0.5, color: colors.title, bold: true});
    pptx.addText(data + ' - Cor: ' + cor, { fontSize: 18, align: "center", w: '100%', h: '100%', color: colors.title, italic: true});
} 

const generateSlideByTopic = (pptx, remainingText) => {
    let text = addLineBreak(remainingText.texto, 600).split(os.EOL)
    for(let i = 0; i < text.length; i++) {
        const slide = pptx.addSlide({ masterName: "WIDE" });
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const imagePath = path.join(__dirname, '../', 'images', 'background.png');
        slide.background = {path: imagePath}
        
        slide.addText(addLineBreak(remainingText.titulo, 27), { x: 1, y: 0.5, w: '100%', h: 0.5, fontSize: 24, color: colors.title, align: 'center', bold: true });
        slide.addText(text[i], { x: 1, y: .5, w: '90%', h: '100%', fontSize: 20, color: colors.text, outline:{ size:.7, color: colors.border}, bold: true});
    }
}