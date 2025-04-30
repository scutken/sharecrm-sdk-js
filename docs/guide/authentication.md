# 授权认证

纷享销客 SDK 使用应用级授权方式与纷享销客 CRM 系统进行交互。本文档将详细介绍授权认证的相关内容。

## 授权流程

1. 在纷享销客开放平台创建应用并获取应用凭证
2. 获取企业永久授权码
3. 使用应用凭证和永久授权码获取访问令牌
4. 使用访问令牌调用 API

## 授权参数说明

初始化 SDK 客户端时，需要提供以下授权参数：

| 参数 | 说明 | 获取方式 |
| --- | --- | --- |
| appId | 应用ID | 在纷享销客开放平台创建应用后获取 |
| appSecret | 应用密钥 | 在纷享销客开放平台创建应用后获取 |
| permanentCode | 永久授权码 | 企业授权应用后获取 |
| corpId | 企业ID | 企业授权应用后获取 |

## 初始化客户端

```javascript
import { createClient } from 'sharecrm-sdk-js';

// 创建客户端实例
const client = createClient({
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
  permanentCode: 'YOUR_PERMANENT_CODE',
  corpId: 'YOUR_CORP_ID'
});
```

## 访问令牌管理

SDK 会自动管理访问令牌的获取和刷新，您无需手动处理。访问令牌的默认有效期为 7200 秒（2小时），SDK 会在令牌过期前自动刷新。

如果您需要手动获取当前的访问令牌，可以使用以下方法：

```javascript
// 获取当前访问令牌
async function getToken() {
  const token = await client.getToken();
  console.log('当前访问令牌:', token);
}

getToken();
```

## 常见问题

### 授权失败

如果授权失败，可能有以下原因：

1. 应用凭证（AppId 或 AppSecret）不正确
2. 永久授权码（PermanentCode）不正确或已过期
3. 企业ID（CorpId）不正确
4. 网络连接问题

### 访问令牌过期

SDK 会自动处理访问令牌的刷新，但如果您收到 `access_token已过期` 的错误，可以尝试重新初始化客户端：

```javascript
// 重新初始化客户端
const client = createClient({
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
  permanentCode: 'YOUR_PERMANENT_CODE',
  corpId: 'YOUR_CORP_ID'
});
```

### 权限不足

如果您收到权限相关的错误，请确保您的应用已获得相应的 API 权限。您可以在纷享销客开放平台的应用管理页面查看和修改应用权限。

## 相关资源

- [纷享销客开放平台文档](https://open.fxiaoke.com/wiki.html#/)
- [应用授权流程](https://open.fxiaoke.com/wiki.html#/1.0/service/authorize/flow)
- [错误码说明](https://open.fxiaoke.com/wiki.html#/1.0/service/error_code)