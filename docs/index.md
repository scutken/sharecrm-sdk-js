---
layout: home
hero:
  name: ShareCRM SDK
  text: 纷享销客 CRM JavaScript SDK
  tagline: 简单、易用的纷享销客 CRM 接口封装
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: API 文档
      link: /api/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/your-username/sharecrm-sdk-js
features:
  - icon: 🚀
    title: 简单易用
    details: 提供简洁的 API，快速集成纷享销客 CRM 系统
  - icon: 🔑
    title: 完整类型
    details: 使用 TypeScript 编写，提供完整的类型定义
  - icon: 📦
    title: 轻量级
    details: 体积小，依赖少，适合各种 JavaScript 环境
  - icon: 🛠️
    title: 功能丰富
    details: 支持授权认证、对象查询、创建和修改等核心功能
---

## 安装

```bash
npm install sharecrm-sdk-js
```

## 基本用法

```js
import { createClient } from 'sharecrm-sdk-js';

// 创建客户端
const client = createClient({
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
  permanentCode: 'YOUR_PERMANENT_CODE',
  corpId: 'YOUR_CORP_ID'
});

// 查询客户对象
async function queryCustomers() {
  try {
    const result = await client.queryObjData('account', {
      pageSize: 10,
      pageNo: 1
    });
    console.log(result);
  } catch (error) {
    console.error('查询失败:', error);
  }
}

queryCustomers();
```