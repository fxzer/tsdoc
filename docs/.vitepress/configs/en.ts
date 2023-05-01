import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import getNavs from "../nav/en"
import sidebar from '../sidebar/en'
export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {

  themeConfig: {
      outlineTitle: 'Table of Contents',
      logo:'/logo.svg',
      lastUpdatedText: 'Last Updated',
      returnToTopLabel: 'Back to top',
      sidebarMenuLabel: 'Menu',
      darkModeSwitchLabel: 'Theme Switch',
  
    editLink: {
      pattern: 'https://github.com/fxzer/tsdoc-vitepress/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    outline: {
      label: 'On this page',
      level: [2, 3],
    },
    docFooter: {
      prev: 'Prev Page',
      next: 'Next Page',
    },

    nav: getNavs(),
    sidebar,
  },
}