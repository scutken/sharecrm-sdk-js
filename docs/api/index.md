# API 参考

本文档提供纷享销客 SDK 的 API 参考信息，帮助您了解如何使用各种功能。

## 客户端

### createClient

创建纷享销客 SDK 客户端实例。

```typescript
function createClient(options: AuthOptions): ShareCRMClient
```

**参数：**

- `options`: 授权选项
  - `appId`: 应用ID
  - `appSecret`: 应用密钥
  - `permanentCode`: 永久授权码
  - `corpId`: 企业ID

**返回值：**

- `ShareCRMClient`: 客户端实例

**示例：**

```javascript
import { createClient } from 'sharecrm-sdk-js';

const client = createClient({
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
  permanentCode: 'YOUR_PERMANENT_CODE',
  corpId: 'YOUR_CORP_ID'
});
```

### ShareCRMClient

纷享销客 SDK 客户端类，提供与纷享销客 CRM 系统交互的方法。

#### getToken

获取当前访问令牌。

```typescript
async getToken(): Promise<string>
```

**返回值：**

- `Promise<string>`: 访问令牌

**示例：**

```javascript
const token = await client.getToken();
console.log('当前访问令牌:', token);
```

#### queryObjData

根据条件查询对象数据。

```typescript
async queryObjData(objectApiName: string, options: QueryOptions): Promise<any>
```

**参数：**

- `objectApiName`: 对象API名称
- `options`: 查询选项
  - `conditions?`: 查询条件数组
  - `orders?`: 排序字段数组
  - `pageSize?`: 分页大小
  - `pageNo?`: 页码
  - `fields?`: 需要返回的字段数组

**返回值：**

- `Promise<any>`: 查询结果

**示例：**

```javascript
const result = await client.queryObjData('account', {
  pageSize: 10,
  pageNo: 1,
  fields: ['name', 'phone', 'owner_id'],
  conditions: [
    {
      field: 'name',
      operator: 'contains',
      value: '公司'
    }
  ],
  orders: [
    {
      field: 'created_at',
      order: 'desc'
    }
  ]
});
```

#### createObjData

创建对象数据。

```typescript
async createObjData(objectApiName: string, data: ObjectData): Promise<any>
```

**参数：**

- `objectApiName`: 对象API名称
- `data`: 对象数据

**返回值：**

- `Promise<any>`: 创建结果

**示例：**

```javascript
const result = await client.createObjData('account', {
  name: '测试客户',
  phone: '13800138000',
  // 其他字段...
});
```

#### updateObjData

更新对象数据。

```typescript
async updateObjData(objectApiName: string, dataId: string, data: ObjectData): Promise<any>
```

**参数：**

- `objectApiName`: 对象API名称
- `dataId`: 数据ID
- `data`: 更新的对象数据

**返回值：**

- `Promise<any>`: 更新结果

**示例：**

```javascript
const result = await client.updateObjData('account', 'customer_data_id', {
  name: '更新后的客户名称',
  // 其他需要更新的字段...
});
```

## 类型定义

### AuthOptions

授权选项。

```typescript
interface AuthOptions {
  appId: string;
  appSecret: string;
  permanentCode: string;
  corpId: string;
}
```

### QueryOptions

查询选项。

```typescript
interface QueryOptions {
  conditions?: QueryCondition[];
  orders?: OrderField[];
  pageSize?: number;
  pageNo?: number;
  fields?: string[];
}
```

### QueryCondition

查询条件。

```typescript
interface QueryCondition {
  field: string;
  operator: string;
  value: any;
}
```

### OrderField

排序字段。

```typescript
interface OrderField {
  field: string;
  order: 'asc' | 'desc';
}
```

### ObjectData

对象数据。

```typescript
type ObjectData = Record<string, any>;
```