## 构建选项

类型获取只对JavaScript项目很重要。在TypeScrip项目中，您需要显式包括项目中的类型。但是，对于JavaScript项目，类型脚本工具将在后台下载模块的类型，并将其下载到您的NODE_MODULES文件夹之外。

如果您不想要这个功能，那么您可以通过在项目根目录下创建 `jsconfig.json` 文件来关闭类型获取：

```json
{
  "typeAcquisition": {
    "enable": false
  }
}
```

`jsconfig.json`此部分的常见用法，是告诉TypeScript下载额外的定义，以供您的工具体验：

```json
{
  "typeAcquisition": {
    "include": ["jquery"]
  }
}
```
