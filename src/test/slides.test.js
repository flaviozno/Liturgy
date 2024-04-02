import { generateSlides } from '../services/index.js';

describe('generateSlides', () => {
  it('should generate slides correctly', async () => {
    const result = await generateSlides();
    
    expect(result.pptx).toBeDefined();
    expect(result.path).toBeDefined();
  });
});
