/**
 * 类型定义
 * 定义SDK中使用的各种类型和接口
 */

/**
 * 授权选项
 */
export interface AuthOptions {
  /** 应用ID */
  appId: string;
  /** 应用密钥 */
  appSecret: string;
  /** 永久授权码 */
  permanentCode: string;
  /** 手机号，用于获取openUserId */
  phone?: string;
}

/**
 * 令牌响应
 */
export interface TokenResponse {
  /** 访问令牌 */
  accessToken: string;
  /** 过期时间（秒） */
  expiresIn: number;
  // 开放平台派发的公司帐号
  corpId: string;
}

/**
 * 请求选项
 */
export interface RequestOptions {
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** 请求头 */
  headers?: Record<string, string>;
}

/**
 * 查询选项
 */
export interface QueryOptions {
  /** 查询条件 */
  conditions?: QueryCondition[];
  /** 排序字段 */
  orders?: OrderField[];
  /** 分页大小 */
  pageSize?: number;
  /** 页码 */
  pageNo?: number;
  /** 需要返回的字段 */
  fields?: string[];
}

/**
 * 查询条件
 */
export interface QueryCondition {
  /** 字段名 */
  field: string;
  /** 操作符 */
  operator: string;
  /** 值 */
  value: any;
}

/**
 * 排序字段
 */
export interface OrderField {
  /** 字段名 */
  field: string;
  /** 排序方向 */
  order: 'asc' | 'desc';
}

/**
 * 对象数据
 */
export type ObjectData = {
  /** 对象ApiName */
  dataObjectApiName?: string;
  // 数据ID
  _id?: string;
  
  /** 其他数据字段 */
  [key: string]: any;
};

export type CombineData = {
  /** 对象数据 */
  object_data: ObjectData;
  /** 详情数据，key为字符串，value为ObjectData数组 */
  details: Record<string, ObjectData[]>;
}

/**
 * 根据手机号查询用户的响应
 */
export interface GetUserByMobileResponse {
  /** 员工列表 */
  empList: {
    /** 用户ID */
    openUserId: string;
  }[];
}

/**
 * API响应
 */
export interface ApiResponse<T = any> {
  /** 错误码 */
  errorCode: number;
  /** 错误信息 */
  errorMessage: string;
  /** 响应数据 */
  data?: T;
  /** 其他响应字段 */
  [key: string]: any;
}