见智 · 股票投研复盘智能体 — 产品需求与技术规格
版本 v1.0 · 2026-06-29 · 本文档汇总全部澄清结论，作为开发唯一依据。

0. 一句话定位
见智 —— 一个以「看板 / 报告」为主、对话为辅的每日 A 股投研复盘系统。
Slogan：看盘，不替你下注。

合规边界（红线）：定位为投研辅助工具，只做数据整理、逻辑陈述、看涨理由与风险点的双向呈现，绝不输出"买入/卖出/持有"的明确指令。所有涉及操作的内容统一经"合规话术层"后处理，并强制附免责声明。

1. 产品形态与核心理念
维度	结论
产品本质	每日投研简报系统（非问答工具）
主交互	看板 / 报告为主，对话为辅（侧边追问助手）
复盘节奏	收盘后自动跑批生成当日报告，打开即读
内容生产	系统出数据 + LLM 生成归因初稿 → 人工可编辑定稿
市场范围	A 股为主（申万行业分类 + 概念题材/产业链体系）
个股逻辑深度	中线逻辑（行业景气 + 公司基本面为主，盘面为辅）
核心理念：对话是入口，工具是手脚，数据是地基；记忆让产品越用越懂你；验证让复盘形成进步闭环。

2. 页面与功能清单
2.1 市场复盘页（大盘）
指数概览条（上证/深成/创业板/成交额）
今日主线：双层切换 —— ①申万一级行业 ②概念题材/产业链
市场情绪温度（涨跌家数 + 资金，0–100 打分）
主力资金流向（含「进攻/防御」自动打标 + 自动研判）
北向资金
今日行情逻辑：政策 / 产业链 / 资金 三段归因，LLM 初稿可编辑，每条附数据来源
侧边追问助手 + 记忆模块
保存今日复盘 / 导出简报 / 订阅推送
2.2 个股复盘页（订阅标的）— 三 Tab
Tab1 总览：持仓市值/盈亏、买入策略（定投/网格/CV双突）、建仓记录、止盈止损线（进度条可视化）、下一步操作提示（依据策略+盘面，仍不下指令）
Tab2 当日复盘：行业景气背景 + 今日涨跌逻辑 + 看涨理由 vs 风险点（左右对照，附证据/观察项，不下结论）
Tab3 基本面分析：六层框架（见 §3）+ 六维星级评分 + 投资结论
侧边追问助手（含研报融合 + 记忆）
2.3 复盘档案库页（历史报告）
累计统计：存档数、逻辑兑现率、待验证数
左侧时间线 / 日历浏览历史复盘
档案详情：①当日市场快照 ②我的判断与笔记 ③验证回看
验证回看（灵魂功能）：存档记判断 → T+N 自动回填实际走势 → 标记 兑现✓/证伪✗/待观察 → 算准确率 → 沉淀经验
2.4 贯穿能力
研报融合：追问区可投喂研报（URL / 本地文件 PDF/HTML/图片）→ 解析摘要 → 与已有分析交叉比对 → 给融合观点
记忆系统：①常问问题（带次数，点击复用）②关注焦点（自动沉淀，跟踪变量复盘优先呈现）
合规话术层 + 全局免责声明
3. 基本面六层分析框架（Tab3 / 数据契约）
参考标的范本：中芯国际深度报告。每只个股的基本面分析按此六层结构生成：

生意模式与护城河：商业模式、护城河类型与强度（极强/强/中/弱）、总评
财务质量：营收/净利/毛利率/ROE/现金流/负债率/研发等核心指标 + 判断
估值方法体系：PE/PEG/PB/PS + 历史分位 + 估值核心判断
成长性与空间：增长来源、驱动力、可持续性、验证信号
风险研判：经营/财务/外部风险 + 严重程度
管理层与公司治理：能力/治理结构/红旗信号排查
综合评分：六维星级（★1–5）+ 核心结论（好公司？合理价格？核心矛盾？）
4. 数据存储模型
4.1 每日复盘档案
daily_review (主记录, 一天一条)
  id, user_id, date, market_status, sentiment_score,
  is_finalized(是否定稿), created_at, finalized_at

market_snapshot (市场快照, 1:1)
  review_id, indices(JSONB), mainlines(JSONB行业+概念),
  fund_flow(JSONB含打标), logic_attribution(TEXT定稿归因), sources(JSONB)

stock_snapshot (个股快照, 1:N)
  review_id, stock_code, close, change_pct, pnl,
  industry_prosperity, change_logic(TEXT),
  bull_points(JSONB), risk_points(JSONB), valuation(JSONB)

user_judgment (我的判断, 1:N by stock)
  review_id, stock_code, position, cost, action(买/卖/持),
  stop_loss, take_profit, note(TEXT), merged_report(JSONB)

verification (验证回看, 1:N, T+N回填)
  review_id, target(大盘/stock_code), judgment(TEXT),
  actual_return, status(兑现/证伪/待观察), verify_date, lesson(TEXT)
4.2 记忆与偏好
user_questions  user_id, question_fingerprint, raw_text, count, last_asked
user_focus      user_id, entity(板块/标的/指标), type, is_tracking, source
存储建议：结构化字段 → Postgres；长文本/榜单 → JSONB；验证回填 → BullMQ 定时任务（T+5 / T+20）。

5. 技术栈
层	选型
全栈框架	Next.js 14 (App Router) + TypeScript
UI	Tailwind CSS + shadcn/ui
对话	Vercel AI SDK (ai) — useChat 流式 + Tool Calling
图表	ECharts（财务/资金）+ lightweight-charts（K线）
LLM	DeepSeek / 通义千问（国内合规优先），支持 Function Calling
数据库	Postgres + Drizzle ORM
缓存/队列	Redis + BullMQ（行情缓存、复盘跑批、验证回填）
行情数据	A股：Tushare(REST) / AKShare(Python微服务) / 腾讯自选股 westock-mcp（优先验证）
研报解析	URL抓取 + PDF解析 + HTML正文提取（含微信文章正文剥离）
6. 架构分层
前端 (Next.js + AI SDK)  ── 对话界面 / 四页面看板 / 富卡片渲染
        ↓
智能体编排层            ── 意图路由 → 技能(复盘/基本面/决策参考) → 工具 → 组装
        ↓
工具/能力层 (Tools)     ── 行情查询 / 财报指标 / 新闻公告 / 技术指标 / 研报解析
        ↓
后端服务层 (API/Node)   ── 缓存 / 用户持仓 / 鉴权 / 定时任务 / 数据归一化 / 合规后处理
        ↓
数据源层               ── 行情API / 财报 / 新闻 / LLM
7. 开发路线（迭代式）
阶段1 骨架（当前）：Next.js 工程 + 四页面布局 + 导航 + Mock 数据驱动，体验跑通
阶段2 真实数据：接 westock-mcp/Tushare → Redis 缓存 → 市场页/个股页接真行情
阶段3 复盘+智能：定时跑批复盘、LLM 归因、研报解析 pipeline、验证回填、记忆沉淀
阶段4 上线：用户系统、鉴权、合规后处理层、监控、部署
8. 合规清单（每一条都要落实）
全产品不出现"买入/卖出/持有"指令性措辞，统一改为"值得关注的因素 / 看涨理由 / 风险点"
所有结论附数据来源 + 时间戳，杜绝 LLM 幻觉数字
"下一步操作"仅做纪律提醒（基于用户自设策略），明确标注"参考，非指令"
每页底部强制免责声明
用户持仓为敏感数据，加密存储 + 隐私协议
