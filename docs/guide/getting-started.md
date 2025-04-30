# 快速开始

本指南将帮助您快速上手纷享销客 SDK，实现与纷享销客 CRM 系统的基本交互。

## 前提条件

在开始使用 SDK 之前，您需要：

1. 在纷享销客开放平台创建应用并获取以下信息：
   - 应用ID（AppId）
   - 应用密钥（AppSecret）
   - 企业ID（CorpId）
   - 永久授权码（PermanentCode）

2. 确保您的应用已获得相应的 API 权限

## 安装

```bash
npm install sharecrm-sdk-js
```

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

## 基本用法

### 查询对象数据

```javascript
// 查询客户对象
async function queryCustomers() {
  try {
    const result = await client.queryObjData('account', {
      pageSize: 10,
      pageNo: 1,
      // 可选：指定返回字段
      fields: ['name', 'phone', 'owner_id'],
      // 可选：查询条件
      conditions: [
        {
          field: 'name',
          operator: 'contains',
          value: '公司'
        }
      ],
      // 可选：排序
      orders: [
        {
          field: 'created_at',
          order: 'desc'
        }
      ]
    });
    
    console.log('查询结果:', result);
  } catch (error) {
    console.error('查询失败:', error);
  }
}

queryCustomers();
```

### 创建对象数据

```javascript
// 创建客户对象
async function createCustomer() {
  try {
    const result = await client.createObjData('account', {
      name: '测试客户',
      phone: '13800138000',
      // 其他字段...
    });
    
    console.log('创建成功:', result);
  } catch (error) {
    console.error('创建失败:', error);
  }
}

createCustomer();
```

### 更新对象数据

```javascript
// 更新客户对象
async function updateCustomer(dataId) {
  try {
    const result = await client.updateObjData('account', dataId, {
      name: '更新后的客户名称',
      // 其他需要更新的字段...
    });
    
    console.log('更新成功:', result);
  } catch (error) {
    console.error('更新失败:', error);
  }
}

updateCustomer('customer_data_id');
```

## 错误处理

SDK 会抛出具体的错误信息，您可以使用 try/catch 进行捕获和处理：

```javascript
try {
  // SDK 操作
} catch (error) {
  console.error('错误类型:', error.name);
  console.error('错误消息:', error.message);
  // 根据错误类型进行不同处理
}
```

## 下一步

- [授权认证](./authentication.md) - 了解更多关于授权的信息
- [API 参考](/api/) - 查看完整的 API 文档
- [示例](/examples/) - 查看更多使用示例