# 纷享销客 SDK 介绍

## 什么是 ShareCRM SDK?

纷享销客 SDK 是一个用于连接纷享销客 CRM 系统的 JavaScript 库，它封装了纷享销客 OpenAPI 的常用功能，使开发者能够更加便捷地与纷享销客 CRM 系统进行交互。

## 主要功能

本 SDK 目前支持以下核心功能：

- **授权认证**：获取应用级授权，管理访问令牌
- **对象查询**：根据条件查询 CRM 对象数据
- **对象创建**：创建新的 CRM 对象数据
- **对象更新**：更新已有的 CRM 对象数据

## 为什么使用 ShareCRM SDK?

- **简化开发**：封装了复杂的 API 调用过程，提供简洁的接口
- **类型支持**：使用 TypeScript 编写，提供完整的类型定义
- **错误处理**：统一的错误处理机制，提高代码健壮性
- **自动令牌管理**：自动处理访问令牌的获取和刷新

## 安装

使用 npm 安装：

```bash
npm install sharecrm-sdk-js
```

或者使用 yarn：

```bash
yarn add sharecrm-sdk-js
```

## 下一步

- [快速开始](./getting-started.md) - 了解如何初始化和使用 SDK
- [授权认证](./authentication.md) - 了解授权认证的详细信息
- [API 参考](/api/) - 查看完整的 API 文档