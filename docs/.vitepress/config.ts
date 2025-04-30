import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ShareCRM SDK",
  description: "纷享销客 CRM JavaScript SDK",
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '授权认证', link: '/guide/authentication' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '客户端', link: '/api/' },
            { text: '授权', link: '/api/auth' },
            { text: '对象操作', link: '/api/objects' },
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '基础用法', link: '/examples/' },
            { text: '对象查询', link: '/examples/query' },
            { text: '对象创建', link: '/examples/create' },
            { text: '对象更新', link: '/examples/update' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/sharecrm-sdk-js' }
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2023'
    }
  }
})