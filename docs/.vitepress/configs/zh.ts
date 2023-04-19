import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import getNavs from "../nav/zh"
import sidebar from '../sidebar/zh'
export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/fxzer/tsdoc-vitepress/edit/main/docs/:path',
      text: '对本页提出修改建议',
    },
    outline: {
      label: '本页内容',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    nav: getNavs(),
    sidebar,
  },
}