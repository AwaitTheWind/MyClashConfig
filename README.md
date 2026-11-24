# MyClashConfig

Clash Verge / FlClash / Clash Meta 覆写脚本与 YAML 配置。

## 文件说明

- `MyConfig.js`：JavaScript 覆写脚本（用于 Clash Verge / FlClash 的 Script 覆写）
- `MyConfig.yaml`：直接可用的 YAML 配置片段（proxy-groups + rule-providers + rules）

## 使用方法

### JavaScript 脚本（推荐）
1. 复制 `MyConfig.js` 内容到客户端的 **Script / JavaScript 覆写** 功能中。
2. 启用覆写并重新加载配置。

### YAML 片段
可以把 `MyConfig.yaml` 的内容合并到你的完整 Clash 配置中（或使用 Merge 功能）。

> 注意：JS 脚本会**完全覆盖** `proxy-groups`、`rule-providers` 和 `rules` 字段。请确保订阅已提供基础节点（proxies）。

## 代理组说明

| 组名 | 用途 |
|------|------|
| 🚀 节点选择 | 总选择器 |
| 💬 AI服务 | ChatGPT、Claude 等 |
| 🐯 老虎证券 / 🐮 富途牛牛 | 证券相关 |
| 📹 油管 / 🎥 奈飞 | 视频流媒体 |
| 🎯 全球直连 | 国内网站、局域网 |
| 🛑 广告拦截 | 广告拦截 |
| 地区组 | 按地区自动分组 |

## 规则来源

- blackmatrix7/ios_rule_script
- ACL4SSR/ACL4SSR
- Loyalsoldier/clash-rules
- proxyBug/tigertrade-moomoo-rules
- VPSDance/ai-proxy-rules
