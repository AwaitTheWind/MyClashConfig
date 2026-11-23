const REGIONS = [
  { name: "🇭🇰 香港节点", filter: "(🇭🇰|\\.hk|HK|香港|港)" },
  { name: "🇺🇸 美国节点", filter: "(🇺🇸|\\.us|US|美国|美)" },
  { name: "🇹🇼 台湾节点", filter: "(🇹🇼|\\.tw|TW|台湾|台)" },
  { name: "🇸🇬 狮城节点", filter: "(🇸🇬|\\.sg|SG|新加坡|狮城|坡)" },
  { name: "🇯🇵 日本节点", filter: "(🇯🇵|\\.jp|JP|日本|日)" },
  { name: "🇰🇷 韩国节点", filter: "(🇰🇷|\\.kr|KR|韩国|韩)" },
];

const HK = "🇭🇰 香港节点";
const US = "🇺🇸 美国节点";
const TW = "🇹🇼 台湾节点";
const SG = "🇸🇬 狮城节点";
const JP = "🇯🇵 日本节点";
const KR = "🇰🇷 韩国节点";
const OTHER = "🌍 其他节点";
const MANUAL = "🚀 手动切换";
const SELECT = "🚀 节点选择";

const ALL_REGIONS = [HK, US, TW, SG, JP, KR, OTHER, MANUAL];

const select = (name, proxies) => ({ name, type: "select", proxies });

const proxyGroups = [
  select(SELECT, [...ALL_REGIONS, "DIRECT"]),
  select("💬 AI服务", [US, TW, SG, JP, KR, OTHER, MANUAL]),
  select("🐯 老虎证券", ["DIRECT", SELECT, ...ALL_REGIONS]),
  select("🐮 富途牛牛", ["DIRECT", SELECT, ...ALL_REGIONS]),
  select("📹 油管视频", [SELECT, ...ALL_REGIONS]),
  select("🎥 奈飞视频", [SELECT, ...ALL_REGIONS]),
  select("📺 哔哩哔哩", ["🎯 全球直连", HK, TW]),
  select("🌏 国内媒体", ["DIRECT", HK, TW, SG, JP, MANUAL]),
  select("🌍 国外媒体", [SELECT, ...ALL_REGIONS, "DIRECT"]),
  select("📲 电报消息", [SELECT, ...ALL_REGIONS]),
  select("📢 谷歌服务", [SELECT, ...ALL_REGIONS]),
  select("🍎 苹果服务", ["DIRECT", SELECT, ...ALL_REGIONS]),
  select("Ⓜ️ 微软服务", ["DIRECT", SELECT, ...ALL_REGIONS]),
  select("🎮 游戏平台", ["DIRECT", SELECT, ...ALL_REGIONS]),
  select("🎯 全球直连", ["DIRECT", SELECT, MANUAL]),
  select("🛑 广告拦截", ["REJECT", "DIRECT"]),
  ...REGIONS.map(({ name, filter }) => ({
    name,
    type: "select",
    "include-all": true,
    filter,
  })),
  {
    name: OTHER,
    type: "select",
    "include-all": true,
    filter: `^(?!.*(${REGIONS.map((r) => r.filter.slice(1, -1)).join("|")})).*$`,
  },
  { name: MANUAL, type: "select", "include-all": true },
];

const BM = "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash";
const ACL = "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash";
const TIGER = "https://raw.githubusercontent.com/proxyBug/tigertrade-moomoo-rules/main/rule/Clash";

const provider = (name, url, format = "yaml", behavior = "classical") => [
  name,
  {
    type: "http",
    behavior,
    format,
    interval: 86400,
    proxy: SELECT,
    url,
    path: `./ruleset/${name}.yaml`,
  },
];

const ruleProviders = Object.fromEntries([
  provider("AI", "https://cdn.jsdelivr.net/gh/VPSDance/ai-proxy-rules@main/rules/clash/global.yaml"),
  provider("TigerTrade", `${TIGER}/TigerTrade.yaml`),
  provider("Moomoo", `${TIGER}/Moomoo.yaml`),
  provider("YouTube", `${BM}/YouTube/YouTube_No_Resolve.yaml`),
  provider("Netflix", `${BM}/Netflix/Netflix_Classical_No_Resolve.yaml`),
  provider("Bilibili", `${BM}/BiliBili/BiliBili_No_Resolve.yaml`),
  provider("ChinaMedia", `${BM}/ChinaMedia/ChinaMedia_No_Resolve.yaml`),
  provider("GlobalMedia", `${BM}/GlobalMedia/GlobalMedia_No_Resolve.yaml`),
  provider("Telegram", `${BM}/Telegram/Telegram_No_Resolve.yaml`),
  provider("Google", `${BM}/Google/Google_No_Resolve.yaml`),
  provider("Apple", `${BM}/Apple/Apple_Classical_No_Resolve.yaml`),
  provider("Microsoft", `${BM}/Microsoft/Microsoft.yaml`),
  provider("OneDrive", `${BM}/OneDrive/OneDrive.yaml`),
  provider("Game", `${BM}/Game/Game_No_Resolve.yaml`),
  provider("BanAD", `${ACL}/BanAD.list`, "text"),
  provider("BanProgramAD", `${ACL}/BanProgramAD.list`, "text"),
  provider("ChinaDomain", "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/direct.txt", "yaml", "domain"),
]);

const rules = [
  "DOMAIN-SUFFIX,local,DIRECT",
  "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
  "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
  "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
  "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
  "IP-CIDR,100.64.0.0/10,DIRECT,no-resolve",
  "IP-CIDR6,::1/128,DIRECT,no-resolve",
  "IP-CIDR6,fc00::/7,DIRECT,no-resolve",
  "IP-CIDR6,fe80::/10,DIRECT,no-resolve",
  "RULE-SET,BanAD,🛑 广告拦截",
  "RULE-SET,BanProgramAD,🛑 广告拦截",
  "RULE-SET,AI,💬 AI服务",
  "RULE-SET,TigerTrade,🐯 老虎证券",
  "RULE-SET,Moomoo,🐮 富途牛牛",
  "RULE-SET,YouTube,📹 油管视频",
  "RULE-SET,Netflix,🎥 奈飞视频",
  "RULE-SET,Bilibili,📺 哔哩哔哩",
  "RULE-SET,ChinaMedia,🌏 国内媒体",
  "RULE-SET,GlobalMedia,🌍 国外媒体",
  "RULE-SET,Telegram,📲 电报消息",
  "RULE-SET,Google,📢 谷歌服务",
  "RULE-SET,Apple,🍎 苹果服务",
  "RULE-SET,Microsoft,Ⓜ️ 微软服务",
  "RULE-SET,OneDrive,Ⓜ️ 微软服务",
  "RULE-SET,Game,🎮 游戏平台",
  "RULE-SET,ChinaDomain,🎯 全球直连",
  "GEOIP,CN,🎯 全球直连",
  "MATCH,🚀 节点选择",
];

function main(config) {
  config["proxy-groups"] = proxyGroups;
  config["rule-providers"] = ruleProviders;
  config.rules = rules;
  return config;
}
