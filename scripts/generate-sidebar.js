/********   读取 tsdoc/docs/ 下的所有文件夹，自动生成侧边栏sidebar.ts文件   ***********/
const { isArticleDir, itemsHandler, generateTopDir ,deepGenerateSidebar ,writeFile} = require('./utils')

const fs = require('fs')
const path = require('path')

let locales = ['en', 'zh']

locales.forEach((locale) => {

  const localeDir = path.resolve(__dirname, `../docs/${locale}`)
  const sidebarPath = path.resolve(__dirname, `../docs/.vitepress/sidebar/${locale}.ts`)

  const sidebars = deepGetFile(localeDir) // 读取 docs 目录下的所有文件夹

  //把数组里面的每个对象合并到一个对象里面
  let sidebar = deepGenerateSidebar(sidebars,locale).reduce((pre, cur) => Object.assign(pre, cur), {})

  let sidebarObj = itemsHandler(sidebar, generateTopDir(localeDir, locale), locale)

  writeFile(sidebarObj ,sidebarPath) 

  function deepGetFile(dir) {
    let backList = []
    let list = fs.readdirSync(dir).filter((item) => isArticleDir(item))

    for (let index in list) {
      let item = path.resolve(dir, list[index])
      if (fs.statSync(item).isDirectory()) {
        backList = backList.concat(deepGetFile(item))
      } else {
        //输出相对路径
        item = item.replace(localeDir, '').replace(/\\/g, '/')
        backList.push(item)
      }
    }
    return backList
  }
})
