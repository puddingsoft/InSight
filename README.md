见智 · 股票投研复盘智能体
看盘，不替你下注 — 每日 A 股投研复盘系统（投研辅助工具，不提供买卖指令）

技术栈
Next.js 14 (App Router) + TypeScript + Tailwind CSS

快速开始
bash
npm install
npm run dev      # http://localhost:3000
目录结构
app/
  market/         市场复盘页
  stock/[code]/   个股复盘页（三 Tab：总览 / 当日复盘 / 基本面分析）
  archive/        复盘档案库页（时间线 + 验证回看）
components/
  layout/         Sidebar 侧边导航
  chat/           AssistantPanel 追问助手（含记忆）、ReportFeed 研报投喂
  market/         主线榜、逻辑归因、保存按钮
  stock/          三个 Tab + Tab 容器
lib/
  types/          TypeScript 类型定义（六层框架/存储模型）
  mock/           Mock 数据（阶段1）
  data.ts         数据访问层（唯一数据入口，阶段2在此替换真实数据源）
  utils/          格式化工具（红涨绿跌）
当前阶段
阶段 1：骨架 + Mock 数据驱动，四页面 UI 已跑通。

下一步（阶段 2）
数据层 lib/data.ts 是唯一数据入口，页面组件不感知来源。
接真实数据时只需替换其中的实现（接 westock-mcp / Tushare），函数签名保持不变。

设计依据
见 ../PRD.md（产品需求与技术规格）。原型见 ../prototype/。

合规红线
不输出买卖指令；结论附数据来源；操作提示仅作纪律提醒；每页强制免责声明。
