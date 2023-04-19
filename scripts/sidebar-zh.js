/********   读取 tsdoc/docs/ 下的所有文件夹，自动生成侧边栏sidebar.ts文件   ***********/
const { isArticleDir, splitPath, generateTopDir } = require('./utils')
const enTozh = require('./enTozh')
const fs = require('fs')
const path = require('path')


const localeDir = path.resolve(__dirname, '../docs/zh')
const sidebarPath = path.resolve(__dirname, '../docs/.vitepress/sidebar/zh.ts')

let sidebarObj = generateTopDir(localeDir,'zh')

const sidebars = deepGetFile(localeDir) // 读取 docs 目录下的所有文件夹
const sidebarlist = deepGenerateSidebar(sidebars)

//写入到docs/.vitepress/sidebar/index.ts

//把数组里面的每个对象合并到一个对象里面
const collapsedList = ['options', 'handbook-v1']
let sidebar = sidebarlist.reduce((pre, cur) => Object.assign(pre, cur), {})
Object.entries(sidebar).forEach(([key, items]) => {
  let keyArr = splitPath(key)
  let enText = keyArr[keyArr.length - 1]
  const isCollapsed = collapsedList.includes(enText)
  let text = enTozh[enText] || enText
  if (sidebarObj[`/zh/${keyArr[0]}/`]) {
    sidebarObj[`/zh/${keyArr[0]}/`].push({
      text,
      collapsible: true,
      collapsed: isCollapsed,
      items,
    })
  } else {
    sidebarObj[`/zh/${keyArr[0]}/`] = [{
      text,
      collapsible: true,
      collapsed: isCollapsed,
      items,
    }]
  }
})

const sidebarStr = JSON.stringify(sidebarObj, null, 2)
//把sidebarStr写入到docs/.vitepress/sidebar/index.ts

//没有则创建
if (!fs.existsSync(sidebarPath)) {
  fs.mkdirSync(path.resolve(__dirname, '../docs/.vitepress/sidebar'))
}

const res = fs.writeFile(sidebarPath, `export default ${sidebarStr}`, (err) => {
  if (err) console.log(err)
  console.log('===>  ZH-侧边栏生成成功!  <===\n')
})


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

// 生成侧边栏
function deepGenerateSidebar(arr) {
  //递归按照最后一级目录生成侧边栏
  const sidebar = {}
  sidebars.forEach((item) => {
    const [dir, ...rest] = splitPath(item)
    if (!sidebar[dir]) {
      sidebar[dir] = []
    }
    sidebar[dir].push(item)
  })
  let sidebarList = []
  //按最后一级目录分组
  for (let key in sidebar) {
    let pathPice = sidebar[key].map((item) => splitPath(item))
    //如果pathPice[pathPice.length-1]相同,则合并
    pathPice = pathPice.reduce((pre, cur) => {
      let dirStr = cur.slice(0, -1).join('/') // /problem/vueproject/
      let enText = cur[cur.length - 1].replace(/\.md$/, '')
      let text = enTozh[enText] || enText
      let link = '/zh/' + cur.join('/').replace(/\.md$/, '')
      pre[dirStr] = pre[dirStr] ? [...pre[dirStr], { text, link }] : [{ text, link }]
      return pre
    }, {})
    sidebarList.push(pathPice)
  }
  return sidebarList
}


