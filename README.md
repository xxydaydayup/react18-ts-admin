# React + TypeScript + Vite

## 文件介绍

### yarn.lock :

-   给依赖上锁，确保本地开发的依赖版本和线上打包的依赖版本一致。
-   因为以往上线打包，会自动下载依赖的最新版本，会导致版本不一致报错

### 开发依赖和依赖

-   开发依赖和依赖只是约定放在不同的地方，不放正确也没关系
-   开发依赖：开发过程中需要，但上线不需要的依赖，比如一些类型检查、ts，因为上线最后还是会编写为js
-   依赖：线上运行一定需要的依赖

### .editorconfig .prettierrc .eslint

-   editorconfig控制本项目在不同编辑器上打开的编辑器格式统一
-   prettierrc控制代码格式，增加可读性
-   eslint控制语法格式,extends:继承一些规则

### vite.config

-   resolve.alias:配置路径别名
-   server.proxy:代理配置
