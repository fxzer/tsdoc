---
title: Compiler Options in MSBuild
layout: docs
permalink: /docs/handbook/compiler-options-in-msbuild.html
oneline: Which compiler options are available in MSBuild projects.
---

## Overview

When you have an MSBuild based project which utilizes TypeScript such as an ASP.NET Core project, you can configure TypeScript in two ways. Either via a `tsconfig.json` or via the project settings.

## Using a `tsconfig.json`

We recommend using a `tsconfig.json` for your project when possible. To add one to an existing project, add a new item to your project which is called a "TypeScript JSON Configuration File" in modern versions of Visual Studio.

The new `tsconfig.json` will then be used as the source of truth for TypeScript-specific build information like files and configuration. You can learn  <a href="/project-config/tsconfig">about how TSConfigs works here</a>  and there is a  comprehensive reference here .

## Using Project Settings

You can also define the configuration for TypeScript inside you project's settings. This is done by editing the XML in your `.csproj` to define `PropertyGroups` which describe how the build can work:

```xml
<PropertyGroup>
  <TypeScriptNoEmitOnError>true</TypeScriptNoEmitOnError>
  <TypeScriptNoImplicitReturns>true</TypeScriptNoImplicitReturns>
</PropertyGroup>
```

There is a series of mappings for common TypeScript settings, these are settings which map directly to  <a href="/project-config/Compiler Options">TypeScript cli options</a> and are used to help you write a more understandable project file. You can use the [TSConfig reference](/project-config/tsconfig#tsconfig-reference) to get more information on what values and defaults are for each mapping.

<script setup>
import MSBuild from './demo/MSBuild.vue'; 
</script>
<DemoWrap pkg="project-config/demo"   path='MSBuild.vue'>
    <MSBuild/>
</DemoWrap>


### Additional Flags

Because the MSBuild system passes arguments directly to the TypeScript CLI, you can use the option `TypeScriptAdditionalFlags` to provide specific flags which don't have a mapping above.

For example, this would turn on [`noPropertyAccessFromIndexSignature`](/project-config/tsconfig#noPropertyAccessFromIndexSignature):

```xml
<TypeScriptAdditionalFlags> $(TypeScriptAdditionalFlags) --noPropertyAccessFromIndexSignature</TypeScriptAdditionalFlags>
```

### Debug and Release Builds

You can use PropertyGroup conditions to define different sets of configurations. For example, a common task is stripping comments and sourcemaps in production. In this example, we define a debug and release property group which have different TypeScript configurations:

```xml
<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
  <TypeScriptRemoveComments>false</TypeScriptRemoveComments>
  <TypeScriptSourceMap>true</TypeScriptSourceMap>
</PropertyGroup>

<PropertyGroup Condition="'$(Configuration)' == 'Release'">
  <TypeScriptRemoveComments>true</TypeScriptRemoveComments>
  <TypeScriptSourceMap>false</TypeScriptSourceMap>
</PropertyGroup>

<Import
    Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets"
    Condition="Exists('$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets')" />
```

### ToolsVersion

The value of `<TypeScriptToolsVersion>1.7</TypeScriptToolsVersion>` property in the project file identifies the compiler version to use to build (1.7 in this example).
This allows a project to build against the same versions of the compiler on different machines.

If `TypeScriptToolsVersion` is not specified, the latest compiler version installed on the machine will be used to build.

Users using newer versions of TS, will see a prompt to upgrade their project on first load.

### TypeScriptCompileBlocked

If you are using a different build tool to build your project (e.g. gulp, grunt , etc.) and VS for the development and debugging experience, set `<TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>` in your project.
This should give you all the editing support, but not the build when you hit F5.

### TypeScriptEnableIncrementalMSBuild (TypeScript 4.2 Beta and later)

By default, MSBuild will attempt to only run the TypeScript compiler when the project's source files have been updated since the last compilation.
However, if this behavior is causing issues, such as when TypeScript's [`incremental`](/project-config/tsconfig#incremental) option is enabled, set `<TypeScriptEnableIncrementalMSBuild>false</TypeScriptEnableIncrementalMSBuild>` to ensure the TypeScript compiler is invoked with every run of MSBuild.
