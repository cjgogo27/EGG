# EGG · OmniEEG 开源研究库

[打开网页](https://cjgogo27.github.io/EGG/) · [项目数据](data/resources.json) · [赛道 Top 3](data/track-picks.json) · [检索与核查说明](RESEARCH.md)

以 OmniEEG Challenge 2026 为目标，整理 EEG 基座、自监督预训练、七赛道方法、数据处理及评测工程。

研究快照：**2026-10-24**。共 **97 个项目**，其中 **39 个为 2026 年研究**、**65 个有明确的标准开源许可证或项目声明**；另列 **15 个待核或未就绪项目**。许可证声明、代码完整度与竞赛准入是不同维度，均需分别确认。

## 七赛道最值得参考的 3 个项目

这些是面向本次竞赛的工程参考选择，兼顾完整代码、可靠基线和近期方法，不是效果排行榜。

| 赛道 | 重点参考 1 | 重点参考 2 | 重点参考 3 |
| --- | --- | --- | --- |
| 信号可靠性 | [AutoReject](https://github.com/autoreject/autoreject) | [PyPREP](https://github.com/sappelhoff/pyprep) | [EEGdenoiseNet](https://github.com/ncclabsustech/EEGdenoiseNet) |
| 疾病 | [SeizureTransformer](https://github.com/keruiwu/SeizureTransformer) | [LEAD](https://github.com/DL4mHealth/LEAD) | [CBraMod](https://github.com/wjq-learning/CBraMod) |
| 睡眠 | [U-Time / U-Sleep](https://github.com/perslev/U-Time) | [AttnSleep](https://github.com/emadeldeen24/AttnSleep) | [StageGuard](https://github.com/Q9gJYx/StageGuard) |
| 认知情绪 | [LibEER](https://github.com/XJTU-EEG/LibEER) | [HDGNet](https://github.com/affctivai/HDGNet) | [CBraMod](https://github.com/wjq-learning/CBraMod) |
| 运动想象 | [EEGNet](https://github.com/vlawhern/arl-eegmodels) | [EEG-ATCNet](https://github.com/Altaheri/EEG-ATCNet) | [TCFormer](https://github.com/Altaheri/TCFormer) |
| 自然刺激解码 | [ATM / EEG_Image_decode](https://github.com/ncclab-sustech/EEG_Image_decode) | [ViEEG](https://github.com/LauMason/ViEEG) | [BrainMagick](https://github.com/facebookresearch/brainmagick) |
| SSVEP | [SSVEP Analysis Toolbox](https://github.com/pikipity/SSVEP-Analysis-Toolbox) | [TRCA-SSVEP](https://github.com/mnakanishi/TRCA-SSVEP) | [SSVEP Detection Toolbox](https://github.com/Mohammad-Norizadeh-Cherloo/SSVEP-Detection-Toolbox) |

每项推荐的理由、可复用部分与限制可在网页查看。自然刺激解码项目尤其需要审计视觉、音频和扩散模型的公开权重依赖；HDGNet 与部分 SSVEP 项目未明确许可，BrainMagick 使用非商业许可。

## 网页功能

- 七赛道 Top 3，资源条目同步显示推荐标签。
- 按用途、赛道、研究年份、许可证和代码状态筛选；关键词搜索和仓库推送时间排序。
- 收藏仅保存在当前浏览器；最多四项并排对比。
- 导出当前筛选结果为 CSV；完整 JSON 可直接下载。
- 每个项目保留用途、规则风险、一手来源、许可证、推送时间和 Git commit 快照。

## 本地运行

无需构建或安装前端依赖。在仓库根目录运行：

```bash
python -m http.server 8765
```

打开 `http://localhost:8765`。请通过 HTTP 服务器预览，直接双击 HTML 时浏览器可能禁止读取 JSON。

检查数据与页面引用：

```bash
python scripts/validate.py
node --check assets/app.js
```

GitHub Pages 使用 `main` 分支根目录，`.nojekyll` 保持静态文件原样发布。

## 维护与边界

修改 `data/resources.json` 更新项目，修改 `data/track-picks.json` 更新推荐。核查真实仓库、训练入口、许可证和来源后再写入；不要仅依据论文宣称或综述链接判断代码可用。

本站不是官方赛事网站。决赛禁用公开权重、21 个指定数据集等依据所提供竞赛笔记；正式规则优先。未下载模型权重或竞赛数据，未逐个安装/复现实验。本站发布原创研究摘要与源链接，第三方代码、权重及数据受各自条款约束。
