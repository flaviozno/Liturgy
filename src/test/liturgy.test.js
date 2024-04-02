import { getLiturgy } from '../api/index';

describe('getLiturgy', () => {
  it('should get data correctly', async () => {
    const response = await getLiturgy();
    
    expect(response).toBeDefined();
  });
});
