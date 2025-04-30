import { ShareCRMClient } from '../client';
import { AuthOptions } from '../types';
import axios from 'axios';
import { AxiosInstance } from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ShareCRMClient', () => {
  const mockOptions: AuthOptions = {
    appId: 'test-app-id',
    appSecret: 'test-app-secret',
    permanentCode: 'test-permanent-code'
  };

  let client: ShareCRMClient;
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    // 创建模拟的 axios 实例
    mockAxiosInstance = {
      request: jest.fn(),
      defaults: {},
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
    } as any;

    // 设置 axios.create 返回模拟实例
    (mockedAxios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    // 设置默认的 token 响应
    mockedAxios.post.mockResolvedValue({
      data: {
        errorCode: 0,
        corpAccessToken: 'test-token',
        expiresIn: 7200
      }
    });

    client = new ShareCRMClient(mockOptions);
  });

  describe('queryObjects', () => {
    it('应该正确发送查询请求', async () => {
      const mockResponse = {
        data: {
          errorCode: 0,
          data: [{ id: 1, name: 'test' }]
        }
      };

      mockAxiosInstance.request.mockResolvedValueOnce(mockResponse);

      const result = await client.queryObjData('Opportunity', {
        conditions: [{ field: 'name', operator: 'EQ', value: 'test' }]
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/cgi/crm/v2/data/query'
        })
      );
    });
  });

  describe('createObject', () => {
    it('应该正确发送创建请求', async () => {
      const mockResponse = {
        data: {
          errorCode: 0,
          data: { id: 'new-id' }
        }
      };

      mockAxiosInstance.request.mockResolvedValueOnce(mockResponse);

      const result = await client.createObjData('Opportunity', {
        name: 'test opportunity',
        amount: 10000
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/cgi/crm/v2/data/create'
        })
      );
    });
  });

  describe('updateObject', () => {
    it('应该正确发送更新请求', async () => {
      const mockResponse = {
        data: {
          errorCode: 0,
          data: { success: true }
        }
      };

      mockAxiosInstance.request.mockResolvedValueOnce(mockResponse);

      const result = await client.updateObjData('Opportunity', 'test-id', {
        name: 'updated opportunity'
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/cgi/crm/v2/data/update'
        })
      );
    });
  });

  describe('错误处理', () => {
    it('应该正确处理 API 错误', async () => {
      const errorResponse = {
        data: {
          errorCode: 1001,
          errorMessage: '无效的参数'
        }
      };

      mockAxiosInstance.request.mockResolvedValueOnce(errorResponse);

      const result = await client.queryObjData('Opportunity', {});
      expect(result).toEqual(errorResponse.data);
    });

    it('应该正确处理网络错误', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.request.mockRejectedValueOnce(networkError);

      await expect(client.queryObjData('Opportunity', {}))
        .rejects
        .toThrow('Network Error');
    });
  });
}); 
