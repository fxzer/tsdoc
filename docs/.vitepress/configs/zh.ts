import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import getNavs from "../nav/zh"
import sidebar from '../sidebar/zh'
export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {

  themeConfig: {
    // outline: 'deep',//侧边栏深度:数字或者deep
    outlineTitle: '文章目录',
    logo:'/logo.svg',
    lastUpdatedText: '上次更新',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题切换',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      pattern: 'https://github.com/fxzer/tsdoc-vitepress/edit/main/docs/:path',
      text: '对本页提出修改建议',
    },
    outline: {
      label: '本页内容',
    },
    nav: getNavs(),
    sidebar,
  },
}