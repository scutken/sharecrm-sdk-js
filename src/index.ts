/**
 * 纷享销客 CRM SDK
 * 提供与纷享销客 OpenAPI 交互的简单接口
 */

import { ShareCRMClient } from './client';
import { AuthOptions, RequestOptions } from './types';

export { ShareCRMClient };
export * from './types';

/**
 * 创建纷享销客 SDK 客户端实例
 * @param options 授权选项
 * @returns ShareCRMClient 实例
 */
export function createClient(options: AuthOptions): ShareCRMClient {
  return new ShareCRMClient(options);
}

// 默认导出 createClient 函数
export default createClient;