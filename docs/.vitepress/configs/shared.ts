import { defineConfig, HeadConfig } from 'vitepress'

export const META_IMAGE = 'https://pinia.vuejs.org/social.png'


export const sharedConfig = defineConfig({
  //根据环境变量决定打包路径
  base:'/tsdoc-vitepress/',
  outDir: '../dist',
  cleanUrls: true,  //去掉url中的.html后缀
  title: "TSDoc",//网站标题
  description: "Front-end learning document collection.",
  lastUpdated: true,
  ignoreDeadLinks: true,//忽略无效链接
  appearance: 'dark',
  markdown: {
    theme: {
      light: 'github-light',
      // light: 'vitesse-light',
      dark: 'dracula-soft',
    },
    attrs: { 
      leftDelimiter: '%{', 
      rightDelimiter: '}%',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 3],

    socialLinks: [

    ],
    footer: {
      message: 'Released under the <a href="https://github.com/fxzer/tsdoc-vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/fxzer">fxzer</a>.',
    },

  },
})