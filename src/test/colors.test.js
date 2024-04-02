import { colors } from '../styles/index.js';

test('colors are defined correctly in hexadecimal format', () => {
  for (const key in colors) {
    if (Object.hasOwnProperty.call(colors, key)) {
      expect(colors[key]).toMatch(/^#[0-9A-F]{6}$/i);
    }
  }
});
