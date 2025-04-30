import { createClient, ShareCRMClient } from '../index';
import { AuthOptions } from '../types';

describe('createClient', () => {
  const mockOptions: AuthOptions = {
    appId: 'test-app-id',
    appSecret: 'test-app-secret',
    permanentCode: 'test-permanent-code'
  };

  it('应该返回 ShareCRMClient 实例', () => {
    const client = createClient(mockOptions);
    expect(client).toBeInstanceOf(ShareCRMClient);
  });
}); 