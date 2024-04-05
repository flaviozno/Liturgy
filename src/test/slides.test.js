import { generateSlides } from '../services/index';

describe('generateSlides', () => {
  it('should generate slides correctly', async () => {
    const day = 4;
    const month = 12;
    const result = await generateSlides(day, month);

    expect(result.pptx).toBeDefined();
    expect(result.path).toBeDefined();

    expect(typeof day).toBe('number');
    expect(typeof month).toBe('number');
  });
});
