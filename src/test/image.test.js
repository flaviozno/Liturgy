import fs from 'fs';
import path from 'path';

describe('Testing the existence of an image in the folder', () => {
    it('Should check if the image exists in the folder', () => {
        const imagePath = path.join(__dirname, '../', 'images', 'background.png');
        const imageExists = fs.existsSync(imagePath);
        expect(imageExists).toBe(true);
    });
});
