
import React from 'react';
import { ArrowRight, FileSpreadsheet, LucideKanban as LayoutKanban, Calendar, BarChart3, CheckCircle, Lightbulb, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleNavigateToOfferTrail = () => {
    navigate('/offer-trail');
  };

  const features = [
    {
      mark: '❶',
      title: '少一点产品，多一点空间',
      desc: '用户已经够焦虑了。所有提示、推送、弹窗都刻意降低压迫感，不制造新的情绪负担。',
      anti: '反例：每次打开就弹"你还没复盘！"'
    },
    {
      mark: '❷', 
      title: '只解读用户信得过的信息',
      desc: '官网流程状态是用户可验证的事实，所以我们主动聚合；没有数据支撑的"行业参考"不做，宁可不说。',
      anti: '反例：假造"平均 14 天出结果"这种没来源的数字。'
    },
    {
      mark: '❸',
      title: '结构不强制，成长自然发生',
      desc: '复盘是好事但不是强制任务。给结构、给时机、给入口，写不写由用户，写过的价值会自动回流到下一次。',
      anti: '反例："未完成复盘不能进入下一次投递"。'
    }
  ];

  const painPoints = [
    {
      num: '01',
      label: 'INPUT · 输入侧问题',
      title: '到底投了',
      highlight: '哪个版本',
      end: '的简历？',
      desc: '官网、BOSS、内推码、邮件、校招群——求职输入散落在 5+ 个渠道，手动同步成本极高，容易遗漏、容易重复。'
    },
    {
      num: '02',
      label: 'COGNITION · 认知侧问题', 
      title: '这家笔试',
      highlight: '是今天还是明天',
      end: '？',
      desc: '跨时间线、跨流程节点的多线程任务，用户无法在一个视图里看清自己的整体位置，DDL 临近才慌。'
    },
    {
      num: '03',
      label: 'LEARNING · 成长侧问题',
      title: '面试完就忘，',
      highlight: '下一次还是踩同样的坑',
      end: '。',
      desc: '宝贵的面试经验没有被结构化沉淀，每次都是从头再来。背后不是"不想写"，是没有低门槛的触发和框架。'
    },
    {
      num: '04',
      label: 'FEEDBACK · 反馈侧问题',
      title: '满屏"流程中"，',
      highlight: '我还要等吗',
      end: '？',
      desc: '压力的根源不是等待本身，而是无法区分"正常推进"和"已经凉了"，所有不确定等待都在消耗情绪。'
    }
  ];

  const views = [
    { num: '01', title: '总览', tag: 'OVERVIEW', desc: '看局面。漏斗定位瓶颈、AI 给出下一步、本周节奏一眼。', color: 'bg-slate-900' },
    { num: '02', title: '看板', tag: 'KANBAN', desc: '看进度。六阶段拖拽，DDL 分级预警，复盘入口藏在卡片里。', color: 'bg-red-700' },
    { num: '03', title: '表格', tag: 'TABLE', desc: '看细节。Excel 党友好，所有字段一览，可搜索可导出。', color: 'bg-amber-700' },
    { num: '04', title: '日历', tag: 'CALENDAR', desc: '看时间。DDL、笔试、面试按天铺开，颜色区分事件类型。', color: 'bg-emerald-700' }
  ];

  const steps = [
    { icon: '＋', title: '粘链接', desc: '抓公司 / 岗位 / JD 快照' },
    { icon: '▦', title: '入看板', desc: '自动分类到"想申请"' },
    { icon: '⟐', title: '推 DDL', desc: '临近 3 天内红标预警' },
    { icon: '↻', title: '追状态', desc: '官网跳转查最新流程' },
    { icon: '✎', title: '轻复盘', desc: '面试后温和提示' },
    { icon: '☷', title: '回流洞察', desc: '复盘 → 下次岗位建议' }
  ];

  return (
    <div className="min-h-screen bg-[#f4efe6] text-[#1a1a1a] font-serif relative overflow-x-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[18%] left-[24%] w-[600px] h-[600px] rounded-full bg-red-700/[0.03] blur-3xl"></div>
        <div className="absolute top-[70%] right-[20%] w-[500px] h-[500px] rounded-full bg-amber-600/[0.05] blur-3xl"></div>
      </div>

      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-7 py-3.5 bg-[#f4efe6]/[0.92] backdrop-blur-md border-b border-[#d4ccb8]">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] bg-red-700 text-white font-bold flex items-center justify-center -rotate-6 shadow-sm">轨</div>
          <div>
            <h1 className="text-[28px] italic font-serif leading-none">Offer 轨迹</h1>
            <p className="text-xs font-mono text-[#827b6d] tracking-widest mt-1">offer trail · 看得清的求职过程</p>
          </div>
        </div>
        <button 
          onClick={handleNavigateToOfferTrail}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-[#f6f1e8] text-sm font-medium hover:bg-red-700 transition-colors duration-200"
        >
          进入系统 <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      <main className="relative z-10 max-w-[1120px] mx-auto px-7 pb-16">
        {/* Hero 区域 */}
        <section className="pt-14 pb-10 border-b border-[#e3dcc9]">
          <div className="text-red-700 text-xs font-mono tracking-[0.2em] mb-4 uppercase">Offer Trail · 求职申请管理看板</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6 max-w-[900px] tracking-tight">
            求职的本质困境,<br/>
            不是 <span className="line-through text-[#8a8374] decoration-red-700 decoration-[3px]">记录太麻烦</span>,<br/>
            而是<em className="text-red-700 italic"> 在不确定里独自作战</em>。
          </h2>
          <div className="max-w-[760px] space-y-3 text-[#4a453c] leading-relaxed text-base sm:text-lg">
            <p>大学生同时在投 30–100 个岗位、跨 5 个平台、面对数十个 DDL。表面上看是"信息散乱"，但真正让人焦虑的，是<strong className="text-[#1a1a1a] font-semibold border-b border-red-700">不知道自己在哪、下一步做什么、哪里出了问题</strong>。</p>
            <p>一句话概括——大学生求职的本质困境是：在一个<strong className="text-[#1a1a1a]">高度不确定、多线程、情绪消耗大</strong>的过程里，独自作战，<strong className="text-[#1a1a1a]">缺乏结构感和反馈感</strong>。"结构感"对应信息碎片化和进度断层，"反馈感"对应复盘难和情绪内耗。所以这个产品不是更漂亮的 Excel，也不是另一个招聘 APP——它是求职过程的<strong className="text-red-700">作战地图 + 反馈引擎</strong>。</p>
          </div>
          
          {/* CTA 按钮 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleNavigateToOfferTrail}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-700 text-white text-base font-medium hover:bg-red-800 transition-all duration-200 shadow-lg shadow-red-700/20"
            >
              <LayoutKanban className="w-5 h-5" />
              开始使用 Offer 轨迹
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ebe4d5] text-[#1a1a1a] text-base hover:bg-[#e3dcc9] transition-colors duration-200 border border-[#d4ccb8]"
            >
              了解更多
            </button>
          </div>
        </section>

        {/* 痛点分析 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-4 pb-3 mb-6 border-b border-[#e3dcc9]">
            <div className="text-5xl italic font-serif text-red-700">01</div>
            <h3 className="text-2xl font-bold">从用户抱怨，到真正的根因</h3>
            <span className="ml-auto text-xs font-mono text-[#827b6d] tracking-[0.14em]">ROOT CAUSE</span>
          </div>
          <p className="max-w-[760px] text-[#4a453c] mb-6 leading-relaxed">
            搜集中文社区的求职吐槽很容易，难的是从中抽象出真正的用户需求。很多看起来是并列的痛点，其实属于不同层级——有的是场景，有的是症状，有的是工具缺陷带来的二次痛苦。我们把它们归并到四个根因，它们两两成对，对应用户的两类底层需求。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#d4ccb8] bg-[#faf6ee]">
            {painPoints.map((point, idx) => (
              <div key={idx} className={`p-7 ${idx % 2 === 0 ? 'border-r border-[#e3dcc9]' : ''} ${idx < 2 ? 'border-b border-[#e3dcc9]' : ''}`}>
                <div className="text-[11px] font-mono text-[#827b6d] tracking-[0.12em] uppercase mb-2.5">{point.num} · {point.label}</div>
                <h4 className="text-2xl italic font-serif mb-3 leading-tight">
                  {point.title}<strong className="text-red-700 not-italic text-xl">{point.highlight}</strong>{point.end}
                </h4>
                <p className="text-sm text-[#4a453c] leading-relaxed mb-3">{point.desc}</p>
                <div className="pt-2 border-t border-dashed border-[#d4ccb8]">
                  <em className="text-[11px] font-mono text-[#827b6d] tracking-[0.08em] not-italic uppercase">{point.label}</em>
                </div>
              </div>
            ))}
          </div>

          {/* 核心主张 */}
          <div className="mt-6 p-8 sm:p-10 bg-slate-900 text-[#f6f1e8] relative">
            <div className="absolute left-5 top-5 w-[30px] h-[2px] bg-red-700"></div>
            <div className="text-[11px] font-mono text-[#9a9385] tracking-[0.12em] uppercase mb-3 pl-12">CORE CLAIM</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif italic leading-snug pl-12">
              这个产品解决的不是"<strong className="text-red-700 not-italic text-[0.85em]">记录不方便</strong>"，而是"<strong className="text-red-700 not-italic text-[0.85em]">用户在高不确定求职过程中，没有结构感，也没有反馈感</strong>"。
            </div>
            <div className="mt-4 pl-12 text-sm text-[#c8c1b3] leading-relaxed">
              所以它的定位不是招聘平台，也不是通用表格，而是一个把申请过程重新组织起来的作战界面：帮用户看清局面、管理多线程任务、沉淀经验、缓冲情绪。
            </div>
          </div>
        </section>

        {/* 设计原则 */}
        <section id="features" className="mt-14">
          <div className="flex items-baseline gap-4 pb-3 mb-6 border-b border-[#e3dcc9]">
            <div className="text-5xl italic font-serif text-red-700">02</div>
            <h3 className="text-2xl font-bold">三条刻在产品里的设计原则</h3>
            <span className="ml-auto text-xs font-mono text-[#827b6d] tracking-[0.14em]">PRINCIPLES</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, idx) => (
              <div key={idx} className="relative bg-[#faf6ee] border border-[#d4ccb8] p-6 pt-8 shadow-[0_10px_30px_rgba(60,40,10,0.08)]">
                <div className="absolute -top-3 left-4 px-2 bg-[#f4efe6] text-red-700 italic font-serif text-xl">{f.mark}</div>
                <h4 className="text-base font-bold mb-2">{f.title}</h4>
                <p className="text-[13px] text-[#4a453c] leading-relaxed mb-4">{f.desc}</p>
                <div className="pt-3 border-t border-dashed border-[#d4ccb8] text-[11px] text-[#827b6d]">
                  <strong className="text-red-700">{f.anti.split('：')[0]}：</strong>{f.anti.split('：')[1]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 竞品对比 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-4 pb-3 mb-6 border-b border-[#e3dcc9]">
            <div className="text-5xl italic font-serif text-red-700">03</div>
            <h3 className="text-2xl font-bold">定位：把根因翻译成别人没做的事</h3>
            <span className="ml-auto text-xs font-mono text-[#827b6d] tracking-[0.14em]">POSITIONING</span>
          </div>
          <p className="max-w-[760px] text-[#4a453c] mb-6 leading-relaxed">
            市面上的产品要么是<strong>找岗位</strong>（Boss、牛客、OfferShow），要么是<strong>通用记录</strong>（Excel、Notion），但<strong className="text-red-700">"过程管理 + 反馈解读"</strong>这个中间地带，几乎是空白。四个根因，对应四组关键功能，下表同时呈现推导逻辑和竞品覆盖情况：
          </p>
          
          <div className="overflow-x-auto border border-[#d4ccb8] bg-[#faf6ee]">
            <table className="w-full text-[13px]">
              <thead>
                <tr>
                  <th className="p-4 bg-[#ebe4d5] font-bold text-left border-b border-[#d4ccb8]">根因 / 对应功能</th>
                  <th className="p-4 bg-[#ebe4d5] font-bold text-left border-b border-[#d4ccb8]">Excel / 腾讯文档</th>
                  <th className="p-4 bg-[#ebe4d5] font-bold text-left border-b border-[#d4ccb8]">Boss / 牛客</th>
                  <th className="p-4 bg-[#ebe4d5] font-bold text-left border-b border-[#d4ccb8]">Notion 模板</th>
                  <th className="p-4 bg-slate-900 text-white font-bold text-left border-b border-[#d4ccb8] relative">
                    Offer 轨迹
                    <span className="absolute right-2 top-1 text-[10px] font-mono text-red-400">US</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e3dcc9]">
                  <td className="p-4 align-top w-[19%]">
                    <div className="text-[11px] font-mono text-[#827b6d] tracking-[0.12em] uppercase">信息碎片化</div>
                    <div className="text-xs text-[#4a453c] mt-1">→ 跨渠道统一入口</div>
                  </td>
                  <td className="p-4 align-top">手工录入</td>
                  <td className="p-4 align-top">仅自家岗位</td>
                  <td className="p-4 align-top">手工录入</td>
                  <td className="p-4 align-top bg-[#fbe8e4] font-bold">JD 链接一键抓取 + 快照留存</td>
                </tr>
                <tr className="border-b border-[#e3dcc9]">
                  <td className="p-4 align-top">
                    <div className="text-[11px] font-mono text-[#827b6d] tracking-[0.12em] uppercase">进度断层</div>
                    <div className="text-xs text-[#4a453c] mt-1">→ 看清当前位置</div>
                  </td>
                  <td className="p-4 align-top">平铺表格</td>
                  <td className="p-4 align-top">单岗位状态</td>
                  <td className="p-4 align-top">需自建看板</td>
                  <td className="p-4 align-top bg-[#fbe8e4] font-bold">看板 / 日历 / 表格三视图 + DDL 预警</td>
                </tr>
                <tr className="border-b border-[#e3dcc9]">
                  <td className="p-4 align-top">
                    <div className="text-[11px] font-mono text-[#827b6d] tracking-[0.12em] uppercase">复盘难</div>
                    <div className="text-xs text-[#4a453c] mt-1">→ 低压触发 + 结构化框架</div>
                  </td>
                  <td className="p-4 align-top">无</td>
                  <td className="p-4 align-top">无</td>
                  <td className="p-4 align-top">有模板 · 需手动触发</td>
                  <td className="p-4 align-top bg-[#fbe8e4] font-bold">场景自动触发 · 非强制可跳过</td>
                </tr>
                <tr>
                  <td className="p-4 align-top">
                    <div className="text-[11px] font-mono text-[#827b6d] tracking-[0.12em] uppercase">情绪内耗</div>
                    <div className="text-xs text-[#4a453c] mt-1">→ 解读局面，而非罗列</div>
                  </td>
                  <td className="p-4 align-top">无</td>
                  <td className="p-4 align-top">无</td>
                  <td className="p-4 align-top">无</td>
                  <td className="p-4 align-top bg-[#fbe8e4] font-bold">跳转官网查状态 + 漏斗瓶颈定位</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 四个视图 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-4 pb-3 mb-6 border-b border-[#e3dcc9]">
            <div className="text-5xl italic font-serif text-red-700">04</div>
            <h3 className="text-2xl font-bold">四个视图，对应三层需求</h3>
            <span className="ml-auto text-xs font-mono text-[#827b6d] tracking-[0.14em]">PRODUCT STRUCTURE</span>
          </div>
          <p className="max-w-[760px] text-[#4a453c] mb-6 leading-relaxed">
            每个视图都有明确的认知任务。不是功能越多越好，而是每个视图都要有"它解决了哪件事"的明确答案。
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {views.map((view, idx) => (
              <div key={idx} className={`${view.color} text-white min-h-[166px] p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(60,40,10,0.08)]`}>
                <div>
                  <div className="text-5xl italic font-serif opacity-35">{view.num}</div>
                  <h4 className="text-xl font-bold mt-2">{view.title}</h4>
                  <div className="text-[10px] font-mono tracking-[0.12em] opacity-80 mt-1">{view.tag}</div>
                </div>
                <p className="text-[13px] leading-relaxed opacity-95 mt-4">{view.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 数据流程 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-4 pb-3 mb-6 border-b border-[#e3dcc9]">
            <div className="text-5xl italic font-serif text-red-700">05</div>
            <h3 className="text-2xl font-bold">一条申请的完整生命周期</h3>
            <span className="ml-auto text-xs font-mono text-[#827b6d] tracking-[0.14em]">DATA FLOW</span>
          </div>
          <p className="max-w-[760px] text-[#4a453c] mb-6 leading-relaxed">
            一次申请从"看到岗位"到"成为经验资产"要经过这些关键节点，产品在每一环都降低了摩擦：
          </p>
          
          <div className="p-7 bg-[#faf6ee] border border-[#d4ccb8] overflow-x-auto">
            <div className="flex gap-2 justify-between min-w-[780px]">
              {steps.map((step, idx) => (
                <div key={idx} className="flex-1 text-center relative">
                  {idx < steps.length - 1 && (
                    <div className="absolute -right-4 top-8 text-red-700 text-2xl font-serif hidden sm:block">→</div>
                  )}
                  <div className="w-16 h-16 mx-auto mb-2.5 flex items-center justify-center bg-[#ebe4d5] border border-[#d4ccb8] text-red-700 italic font-serif text-3xl">
                    {step.icon}
                  </div>
                  <h4 className="text-sm font-bold mb-1">{step.title}</h4>
                  <p className="text-[11px] text-[#827b6d] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 最终 CTA */}
        <section className="mt-16 text-center">
          <div className="inline-block p-10 bg-[#faf6ee] border border-[#d4ccb8] max-w-2xl">
            <h3 className="text-2xl font-serif italic mb-4">
              准备好管理你的求职申请了<em className="text-red-700 not-italic">？</em>
            </h3>
            <p className="text-[#4a453c] mb-6 leading-relaxed">
              不是更漂亮的 Excel，也不是另一个招聘 APP——<br/>
              它是你求职过程的<strong className="text-red-700">作战地图 + 反馈引擎</strong>
            </p>
            <button 
              onClick={handleNavigateToOfferTrail}
              className="inline-flex items-center gap-3 px-10 py-4 bg-red-700 text-white text-lg font-medium hover:bg-red-800 transition-all duration-200 shadow-lg shadow-red-700/20"
            >
              <CheckCircle className="w-5 h-5" />
              进入 Offer 轨迹系统
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-xs text-[#827b6d] font-mono">解决的不是"记录不方便"，而是"在不确定里独自作战"</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-5 border-t border-[#d4ccb8] text-center text-[11px] font-mono text-[#827b6d] tracking-[0.12em]">
          OFFER 轨迹 · PRODUCT DESIGN · 看得清的求职过程
        </footer>
      </main>
    </div>
  );
};

export default Index;

