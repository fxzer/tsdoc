
如果您有一个 JavaScript 项目，其中 TypeScript 需要额外的指导来理解全局依赖关系，或者通过 [`disableFilenameBasedTypeAcquisition`](#disableFilenameBasedTypeAcquisition) 禁用了内置推理。
您可以使用 `include` 来指定应该使用 DefinitelyTyped 中的哪些类型：

```json
{
  "typeAcquisition": {
    "include": ["jquery"]
  }
}
```
