import { getLiturgy } from '../api/index';

describe('getLiturgy', () => {
  it('should get data correctly', async () => {
    const day = 4;
    const month = 12;
    const response = await getLiturgy(day, month);
    
    expect(response).toBeDefined();
  });
});
