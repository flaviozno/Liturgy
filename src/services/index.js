import os from "os";
import path from "path";
import { dirname } from "path";
import pptxgen from "pptxgenjs";
import { fileURLToPath } from "url";
import { colors } from "../styles/index.js";
import { getLiturgy } from "../api/index.js";

const MAX_LINE_LENGTH = 600;

const imagePath = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, "../images/background.png");
};

const addLineBreak = (text, breakIndexNumber) => {
  text = text.replace(/\d+/g, "").trim();
  const breakIndex = text.lastIndexOf(" ", breakIndexNumber);
  if (breakIndex > -1) {
    return (
      text.substr(0, breakIndex) + "\n" + text.substr(breakIndex + 1).trim()
    );
  }
  return text;
};

const addTextToSlide = (slide, title, text) => {
  slide.addText(addLineBreak(title, 27), {
    x: 1,
    y: 0.5,
    w: "100%",
    h: 0.5,
    fontSize: 24,
    color: colors.title,
    align: "center",
    bold: true,
  });
  slide.addText(text, {
    x: 1,
    y: 0.5,
    w: "90%",
    h: "100%",
    fontSize: 20,
    color: colors.text,
    outline: { size: 0.7, color: colors.border },
    bold: true,
  });
};

const generateOpening = (pptx, text, cor, data) => {
  const slide = pptx.addSlide();
  slide.addText(text, {
    fontSize: 24,
    align: "center",
    w: "100%",
    h: 0.5,
    color: colors.title,
    bold: true,
  });
  slide.addText(`${data} - Cor: ${cor}`, {
    fontSize: 18,
    align: "center",
    w: "100%",
    h: "100%",
    color: colors.title,
    italic: true,
  });
};

const generateSalmo = (pptx, salmo) => {
  const slide = pptx.addSlide({ masterName: "WIDE" });
  slide.background = { path: imagePath() };
  addTextToSlide(slide, salmo.refrao.trim(), salmo.texto);
};

const generateSlideByTopic = (pptx, remainingText) => {
  const textLines = addLineBreak(remainingText.texto, MAX_LINE_LENGTH).split(
    os.EOL
  );
  for (const line of textLines) {
    const slide = pptx.addSlide({ masterName: "WIDE" });
    slide.background = { path: imagePath() };
    addTextToSlide(slide, remainingText.titulo, line);
  }
};

export const generateSlides = async (day, month) => {
  try {
    const pptx = new pptxgen();
    const liturgy = await getLiturgy(day, month);

    if (!liturgy) return null;

    const {
      liturgia,
      data,
      cor,
      primeiraLeitura,
      salmo,
      segundaLeitura,
      evangelho,
    } = liturgy;

    if (liturgia) generateOpening(pptx, liturgia, cor, data);
    if (primeiraLeitura && primeiraLeitura !== "Não há primeira leitura hoje!")
      generateSlideByTopic(pptx, primeiraLeitura);
    if (segundaLeitura && segundaLeitura !== "Não há segunda leitura hoje!")
      generateSlideByTopic(pptx, segundaLeitura);
    if (salmo) generateSalmo(pptx, salmo);
    if (evangelho) generateSlideByTopic(pptx, evangelho);

    return { pptx, path: `Liturgia_${data.replaceAll("/", "_")}.pptx` };
  } catch (error) {
    console.error(error);
  }
};
