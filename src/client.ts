/**
 * ShareCRM 客户端实现
 * 提供与纷享销客 OpenAPI 交互的核心功能
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAccessToken } from './auth';
import { AuthOptions, CombineData, GetUserByMobileResponse, ObjectData, QueryOptions, RequestOptions } from './types';

interface ApiResponse<T = any> {
  errorCode: number;
  errorMessage?: string;
  data?: T;
  openUserId?: string;
}

export class ShareCRMClient {
  private baseUrl: string = 'https://open.fxiaoke.com';
  private client: AxiosInstance;
  private options: AuthOptions;
  private accessToken: string | null = null;
  private corpId: string | null = null;
  private currentOpenUserId: string | null = null;
  private tokenExpireTime: number = 0;

  /**
   * 创建 ShareCRM 客户端实例
   * @param options 授权选项
   */
  constructor(options: AuthOptions) {
    this.options = options;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // 如果提供了phone，使用手机号换取openUserId
    if (options.phone) {
      this.querySetCurrentOpenUserIdByPhone(options.phone)
    }
  }

  /**
   * 检查访问令牌是否过期
   * @returns 访问令牌
   */
  async checkAndGetToken(): Promise<string> {
    const now = Date.now();
    // 如果令牌存在且未过期，直接返回
    if (this.accessToken && this.tokenExpireTime > now) {
      return this.accessToken;
    }
    // 获取新的访问令牌
    const tokenData = await getAccessToken(this.options);
    this.accessToken = tokenData.accessToken;
    this.corpId = tokenData.corpId;
    // 设置过期时间，提前5分钟过期以确保安全
    this.tokenExpireTime = now + (tokenData.expiresIn - 300) * 1000;
    return this.accessToken;
  }

  /**
   * 获取openUserId
   * @param phone 手机号
   * @returns openUserId
   */
  private async querySetCurrentOpenUserIdByPhone(phone: string) {
    try {
      console.log('开始查询用户信息，手机号:', phone);
      const token = await this.checkAndGetToken();
      console.log('获取到访问令牌:', token);

      const result = await this.request<GetUserByMobileResponse>("/cgi/user/getByMobile", {
        mobile: phone
      }) as ApiResponse & GetUserByMobileResponse;

      console.log('查询用户结果:', JSON.stringify(result, null, 2));

      if (result.errorCode !== 0) {
        throw new Error(`获取openUserId失败: ${result.errorCode} - ${result.errorMessage}`);
      }
      if (!result.empList || result.empList.length === 0) {
        throw new Error('未找到对应的用户');
      }
      // 更新options中的currentOpenUserId
      this.currentOpenUserId = result.empList[0].openUserId;
      console.log('设置 currentOpenUserId:', this.currentOpenUserId);
    } catch (error) {
      console.error('查询用户信息失败:', error);
      throw error;
    }
  }

  /**
   * 发送请求到 ShareCRM API
   * @param path API 路径
   * @param data 请求数据
   * @param options 请求选项
   * @returns 响应数据
   */
  private async request<T>(path: string, data: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const token = await this.checkAndGetToken();
    const config: AxiosRequestConfig = {
      url: path,
      method: options.method || 'POST',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json'
      }
    };

    // 根据请求方法设置数据
    if ((config.method as string).toUpperCase() === 'GET') {
      config.params = data;
    } else {
      config.data = {
        corpAccessToken: token,
        corpId: this.corpId,
        currentOpenUserId: this.currentOpenUserId,
        ...data
      };
    }

    console.log('发送请求:', {
      path,
      method: config.method,
      data: config.data
    });

    try {
      const response = await this.client.request<ApiResponse<T>>(config);
      console.log('收到响应:', response.data);
      return response.data;
    } catch (error) {
      // 处理错误
      console.error('请求失败:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`ShareCRM API 错误: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * 获取访问令牌
   * @returns 访问令牌
   */
  async getToken(): Promise<string> {
    return this.checkAndGetToken();
  }

  /**
   * 根据条件查询对象数据
   * @param objectApiName 对象API名称
   * @param options 查询选项
   * @returns 查询结果
   */
  async queryObjData(objectApiName: string, options: QueryOptions): Promise<any> {
    const path = '/cgi/crm/v2/data/query';
    const data = {
      objectApiName,
      ...options
    };
    return this.request(path, data);
  }

  /**
   * 创建对象数据
   * @param objectApiName 对象API名称
   * @param data 对象数据
   * @returns 创建结果
   */
  async createObjData(data: CombineData): Promise<any> {
    const path = '/cgi/crm/v2/data/create';
    return this.request(path, {
      data
    });
  }

  /**
   * 更新对象数据
   * @param objectApiName 对象API名称
   * @param dataId 数据ID
   * @param data 更新的对象数据
   * @returns 更新结果
   */
  async updateObjData(data: CombineData): Promise<any> {
    const path = '/cgi/crm/v2/data/update';
    return this.request(path, {
      data
    });
  }

  /**
   * 删除对象数据
   * @param objectApiName 对象API名称
   * @param dataId 数据ID
   * @returns 删除结果
   */
  async deleteObjData(objectApiName: string, dataId: string): Promise<any> {
    const path = '/cgi/crm/v2/data/delete';
    return this.request(path, {
      objectApiName,
      dataId
    });
  }
}