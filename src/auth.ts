/**
 * 授权模块
 * 处理与纷享销客 OpenAPI 的授权相关功能
 */

import axios from 'axios';
import { AuthOptions, TokenResponse } from './types';

/**
 * 获取应用级授权的访问令牌
 * @param options 授权选项
 * @returns 访问令牌响应
 */
export async function getAccessToken(options: AuthOptions): Promise<TokenResponse> {
  const { appId, appSecret, permanentCode } = options;

  try {
    const response = await axios.post('https://open.fxiaoke.com/cgi/corpAccessToken/get/V2', {
      appId,
      appSecret,
      permanentCode
    });

    const data = response.data;

    if (data.errorCode !== 0) {
      throw new Error(`获取访问令牌失败: ${data.errorCode} - ${data.errorMessage}`);
    }

    return {
      accessToken: data.corpAccessToken,
      expiresIn: data.expiresIn || 7200, // 默认2小时过期
      corpId: data.corpId
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`授权请求失败: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}