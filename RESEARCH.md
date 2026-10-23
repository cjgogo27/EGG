# 检索范围与证据说明

核查日期：2026-10-24（Asia/Shanghai）。这是有明确截止日的研究快照，不是实时排行，不保证穷尽全网。

## 竞赛依据

用户提供了 2026-10-23 的 OmniEEG Challenge 2026 笔记，其中报名截止 10 月 31 日、Proposal 初赛 11 月 2 日开始、决赛从零预训练、禁用公开权重、指定 21 个 OpenNeuro 数据集、七赛道、跨被试划分与三种子平均等，来自其记录的赛事海报。没有在本仓库公开原始个人笔记或本地附件。

[腾讯大衍 AI4S 社区赛事页](https://test-science.tencent.com/dayanAI4S/activities/)确认赛事与举办方，显示整体活动区间 10.09–12.19。该公开列表不含完整赛制，不能独立核验笔记中每一条规则。[报名表](https://docs.qq.com/form/page/DWWpuYWp5enBReVRG)为原笔记所给入口。

[OmniEEG-Bench 论文](https://arxiv.org/abs/2606.00815)与[作者代码](https://github.com/ncclab-sustech/omni-eegbench)是技术接口参考；论文的 54 个数据集和六类任务组织不应替换竞赛的 21 个数据集及七赛道。

未决事项：数据集 ID/版本、允许的外部数据、tokenizer/teacher/蒸馏模型是否纳入权重禁令、代码复用范围、算力配额、最终评分及提交格式。网站不替赛事主办方决定准入。

## 检索策略

1. 从 OmniEEG-Bench 作者仓库与模型接口出发，沿模型引用和作者实现查找。
2. 扩展至 2026 年 EEG-Arena、EEG-FM-Bench、EEG-FM-Compass、OpenEEGBench、NeuralBench 等新评测框架。
3. 按七赛道分别查找任务代码，补齐信号可靠性、疾病、睡眠、认知情绪、运动想象、视觉/听觉自然刺激解码、SSVEP。
4. 检查 MNE/BIDS/OpenNeuro 数据流程、自监督预训练、模型训练与评测工程。
5. 使用综述/awesome 列表发现候选，再回到作者仓库、论文、官方文档核验。失效链接、占位仓库、仅模型卡和受门控但未核验的代码不会算作可用实现。

发现入口包括 [awesome-eeg-fm](https://github.com/iroblesrazzaq/awesome-eeg-fm)、[EEG-Arena](https://github.com/OrangeP0P/eeg-arena)、[NeuroInfra 模型目录](https://neuroinfra.net/models/)。候选最终证据保存在各项目 `sources` 字段，未把发现列表本身当作所有项目事实的依据。

## 收录与去重

主目录包含 97 个公开代码项目/工具，其中 42 个基座与预训练项目、31 个任务方法、7 个评测框架、12 个数据与预处理工具、5 个训练工程工具。分类是主要用途，部分项目天然跨类。

按实际仓库去重；ST-EEGFormer 采用作者 `LiuyinYang1101/STEEGFormer`，不把 fork 另计。BioFoundation 的 LUNA/FEMBA/LuMamba 归为统一项目。NeuralBench 链接到 monorepo 子目录，许可按该子目录核实。

另有 15 个待核/未就绪项目。Brant 原版受门控源码未核验；NeuroMM 基线的许可证仍为 All rights reserved 占位；FoME、BrainWave 等未找到完整公开实现。相关线索保留在 `watchlist`，不混入主目录数量。

## 字段含义

- `year`：来源明确的论文/项目年份；长期工具不强行指定研究年份，使用 `null`。不是仓库最后更新时间。
- `pushedAt`：GitHub API 的 `pushed_at`（UTC），可反映分支推送，不等于最新论文时间、正式版本或核心模型更新。
- `commit`：核查时默认分支最新 commit，便于访问快照。
- `checkedAt`：本次人工/工具核查日期。
- `priority`：P0 先读/先接通，P1 重点实验候选，P2 拓展参考。属于工程判断，未用它代替性能比较。
- `tracks`：可能适用的任务范围；“全赛道”表示通用骨干/工程工具，不代表已验证所有赛道有效。
- `readiness`：`pretrain` 表示发现预训练入口，`task` 表示任务训练实现，`tool` 表示工具/评测，`partial` 表示仅推理、局部代码或最小示例。均未承诺可一键复现。
- `licenseClass`：`open` 为已识别标准开源许可或项目明确声明，`restricted` 为非商业/自定义等限制，`unclear` 为未明确许可或待核。不是法律结论；实际使用应核对原许可、来源文件及第三方依赖。

GitHub API 的 `NOASSERTION` 只说明未自动识别，不能直接解读为无许可证。因此另行读取了 BrainOmni、EEG-DLite、NeuroDoc、DataLad、EEGUnity 等真实许可。README 只有许可声明的项目在标签中明确标注。API 原始摘要见 [github-metadata.json](data/github-metadata.json)。

## 七赛道 Top 3 的选择

每个赛道选择三个最值得开始阅读或实验的项目，不限制全部为 2026 年项目。成熟基线用于验证预处理与协议，新方法用于提出可执行的实验变化。信号可靠性优先无预训练依赖的质量控制；疾病同时考虑事件检测、疾病表征和通用骨干；自然刺激解码同时覆盖视觉与听觉。具体推荐理由及注意事项保存在 [track-picks.json](data/track-picks.json)。

部分参考代码缺少明确许可或依赖公开教师/编码器，已在推荐卡和项目详情两处提示。这些项目可以用于理解研究路线，不能因此认定可直接复制、训练或用于决赛。

## 已完成的验证与限制

- 99 个候选 GitHub 仓库的 API 可访问性、推送时间、默认分支 commit 和自动许可信息已获取；其中两项移入待核列表，主目录为 97 项。
- 对 README、代码文件列表、训练入口与特殊许可证进行了来源核查，未逐个运行模型训练或下载数据/权重。
- 网页 JavaScript 语法和结构化数据检查通过。
- 使用 jsdom 执行实际前端脚本，检查数据加载、七赛道 21 项推荐、详情跳转、搜索、筛选、收藏、键盘焦点、四项对比上限、对话框、空状态、CSV 下载与 URL 状态。
- 当前浏览器自动化接口未提供可用浏览器，因此未完成真实浏览器截图、移动设备视觉验收。响应式布局依据静态样式及结构检查。
- 未承诺论文性能可迁移到官方数据，也没有把网站推荐包装成已完成竞赛实验。
