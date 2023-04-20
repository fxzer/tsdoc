import { enConfig } from './configs/en'
import { zhConfig } from './configs/zh'
import { sharedConfig } from './configs/shared'
export default  {
  ...sharedConfig,
  locales: {
    zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/', ...zhConfig },
    root: { label: 'English', lang: 'en-US', link: '/en/', ...enConfig },
  },
} 
