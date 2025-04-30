import { ShareCRMClient } from '../client';
import { testConfig } from './test.config';
import { CombineData } from '../types';

describe('ShareCRMClient Integration Tests', () => {
  let client: ShareCRMClient;
  let testCustomerId: string;

  beforeAll(async () => {
    client = new ShareCRMClient(testConfig);
    // 等待 currentOpenUserId 设置完成
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  describe('客户对象操作', () => {
    it('应该能够创建新客户', async () => {
      const customerData = {
        object_data: {
          dataObjectApiName: 'AccountObj',
          name: `测试客户_${Date.now()}`,
          mobile: '13800138000',
          email: 'test@example.com',
          address: '测试地址',
          owner: testConfig.phone
        },
        details: {}
      };

      const result = await client.createObjData(customerData);
      expect(result.errorCode).toBe(0);
      expect(result.data).toHaveProperty('id');
      testCustomerId = result.data.id;
    });

    it('应该能够查询客户信息', async () => {
      const result = await client.queryObjData('AccountObj', {
        conditions: [
          { field: 'id', operator: 'EQ', value: testCustomerId }
        ]
      });

      expect(result.errorCode).toBe(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(testCustomerId);
    });

    it('应该能够更新客户信息', async () => {
      const updateData = {
        object_data: {
          dataObjectApiName: 'AccountObj',
          name: `更新后的客户_${Date.now()}`,
          address: '更新后的地址'
        },
        details: {}
      };

      const result = await client.updateObjData('AccountObj', testCustomerId, updateData);
      expect(result.errorCode).toBe(0);
      expect(result.data.success).toBe(true);

      // 验证更新是否成功
      const queryResult = await client.queryObjData('AccountObj', {
        conditions: [
          { field: 'id', operator: 'EQ', value: testCustomerId }
        ]
      });

      expect(queryResult.data[0].name).toBe(updateData.object_data.name);
      expect(queryResult.data[0].address).toBe(updateData.object_data.address);
    });

    it('应该能够删除客户', async () => {
      const result = await client.deleteObjData('AccountObj', testCustomerId);
      expect(result.errorCode).toBe(0);
      expect(result.data.success).toBe(true);

      // 验证删除是否成功
      const queryResult = await client.queryObjData('AccountObj', {
        conditions: [
          { field: 'id', operator: 'EQ', value: testCustomerId }
        ]
      });

      expect(queryResult.data).toHaveLength(0);
    });
  });
}); 