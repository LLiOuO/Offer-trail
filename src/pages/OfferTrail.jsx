import React, { useState, useEffect, useRef, useCallback } from 'react';

// 静态数据
const DEFAULT_DATA = [
  {id:1,company:"网易",logo:"N",color:"#c8442a",role:"游戏策划实习",stage:"want",priority:"high",deadline:"04-25",applyDate:"",tags:["互联网","游戏"],location:"杭州",salary:"300/天",source:"牛客",officialUrl:"https://game.campus.163.com",notes:"朋友内推，周一前投简历。",nextAction:"本周内提交",timeline:[],review:null},
  {id:2,company:"美团",logo:"美",color:"#ffc000",role:"产品实习生",stage:"want",priority:"high",deadline:"04-19",applyDate:"",tags:["产品","互联网"],location:"北京",salary:"280/天",source:"官网",officialUrl:"https://zhaopin.meituan.com",notes:"❗️今晚 24:00 截止",nextAction:"马上投",timeline:[],review:null},
  {id:3,company:"招商银行",logo:"招",color:"#d4232a",role:"管培生-金融科技",stage:"want",priority:"med",deadline:"04-30",applyDate:"",tags:["金融"],location:"深圳",salary:"16w+6",source:"校招公众号",officialUrl:"https://career.cmbchina.com",notes:"需写 800 字开放题。",nextAction:"周末写题",timeline:[],review:null},
  {id:4,company:"字节跳动",logo:"字",color:"#000",role:"产品经理-抖音",stage:"applied",priority:"high",deadline:"—",applyDate:"04-10",tags:["产品","互联网"],location:"北京",salary:"400/天",source:"内推",officialUrl:"https://jobs.bytedance.com",notes:"简历筛选中，已 9 天。",nextAction:"等待回复",timeline:[{date:"04-10",text:"提交简历",done:true},{date:"04-12",text:"HR 已查看",done:true},{date:"—",text:"简历筛选中",done:false}],review:null},
  {id:5,company:"小红书",logo:"红",color:"#ff2442",role:"用户运营实习生",stage:"applied",priority:"med",deadline:"—",applyDate:"04-08",tags:["运营","互联网"],location:"上海",salary:"250/天",source:"小红书 APP",officialUrl:"https://hr.xiaohongshu.com",notes:"待通知笔试。",nextAction:"等待",timeline:[{date:"04-08",text:"提交简历",done:true}],review:null},
  {id:6,company:"拼多多",logo:"拼",color:"#f23030",role:"数据分析实习",stage:"applied",priority:"low",deadline:"—",applyDate:"04-05",tags:["数据","互联网"],location:"上海",salary:"350/天",source:"Boss",officialUrl:"https://careers.pinduoduo.com",notes:"海投",nextAction:"等待",timeline:[],review:null},
  {id:7,company:"阿里巴巴",logo:"阿",color:"#ff6a00",role:"产品运营-淘宝",stage:"written",priority:"high",deadline:"04-22",applyDate:"04-06",tags:["运营","互联网"],location:"杭州",salary:"面议",source:"官网",officialUrl:"https://talent.alibaba.com",notes:"笔试：4/22 19:00 · 2 小时",nextAction:"周二晚笔试",timeline:[{date:"04-06",text:"提交简历",done:true},{date:"04-14",text:"收到笔试邀请",done:true},{date:"04-22",text:"笔试 19:00",done:false}],review:null},
  {id:8,company:"中国银行",logo:"中",color:"#c1211b",role:"总行管培生",stage:"written",priority:"med",deadline:"04-26",applyDate:"04-02",tags:["金融","国企"],location:"北京",salary:"20w+",source:"校招官网",officialUrl:"https://career.bankofchina.com",notes:"EPI 测评 + 英语",nextAction:"周末复习",timeline:[],review:null},
  {id:9,company:"腾讯",logo:"腾",color:"#00a6e8",role:"产品经理-微信",stage:"interview",priority:"high",deadline:"04-21",applyDate:"03-28",tags:["产品","互联网"],location:"深圳",salary:"450/天",source:"内推",officialUrl:"https://join.qq.com",notes:"三面：产品总监",nextAction:"4/21 三面",timeline:[{date:"03-28",text:"提交简历",done:true},{date:"04-02",text:"一面 · 通过",done:true},{date:"04-10",text:"二面 · 通过",done:true},{date:"04-21",text:"三面",done:false}],review:null},
  {id:10,company:"京东",logo:"京",color:"#e1251b",role:"产品实习生",stage:"interview",priority:"med",deadline:"04-23",applyDate:"03-30",tags:["产品","电商"],location:"北京",salary:"250/天",source:"Boss",officialUrl:"https://campus.jd.com",notes:"二面：业务负责人",nextAction:"4/23 二面",timeline:[{date:"03-30",text:"提交简历",done:true},{date:"04-08",text:"一面通过",done:true},{date:"04-23",text:"二面",done:false}],review:null},
  {id:11,company:"百度",logo:"百",color:"#2932e1",role:"商业策略实习",stage:"interview",priority:"med",deadline:"—",applyDate:"03-25",tags:["策略","互联网"],location:"北京",salary:"300/天",source:"牛客",officialUrl:"https://talent.baidu.com",notes:"HR 面已完成，等待结果。",nextAction:"等待结果",timeline:[{date:"03-25",text:"提交简历",done:true},{date:"04-05",text:"一面通过",done:true},{date:"04-18",text:"HR 面已完成",done:true}],review:null},
  {id:12,company:"快手",logo:"快",color:"#ff4906",role:"用户研究实习",stage:"offer",priority:"high",deadline:"04-30",applyDate:"03-15",tags:["研究","互联网"],location:"北京",salary:"320/天",source:"官网",officialUrl:"https://campus.kuaishou.cn",notes:"✓ 口头 offer，4/30 前决定。",nextAction:"4/30 前答复",timeline:[{date:"03-15",text:"提交简历",done:true},{date:"03-22",text:"笔试通过",done:true},{date:"04-01",text:"一面通过",done:true},{date:"04-08",text:"二面通过",done:true},{date:"04-15",text:"收到 offer",done:true}],review:{mood:"good",went_well:"用研方法论储备充足。",need_improve:"薪资谈判太被动。",key_questions:"如何用定量验证定性洞察?",next_time:"准备期望薪资区间。"}},
  {id:13,company:"B 站",logo:"B",color:"#fb7299",role:"内容运营实习",stage:"offer",priority:"low",deadline:"—",applyDate:"03-10",tags:["运营","互联网"],location:"上海",salary:"200/天",source:"官网",officialUrl:"https://jobs.bilibili.com",notes:"保底已确认。",nextAction:"已确认",timeline:[],review:null},
  {id:14,company:"华为",logo:"华",color:"#cc0000",role:"云产品经理",stage:"closed",priority:"low",deadline:"—",applyDate:"03-20",tags:["产品","科技"],location:"深圳",salary:"—",source:"官网",officialUrl:"https://career.huawei.com",notes:"简历未通过。",nextAction:"-",timeline:[],review:null},
  {id:15,company:"滴滴",logo:"滴",color:"#f67524",role:"产品实习",stage:"closed",priority:"low",deadline:"—",applyDate:"03-18",tags:["产品","出行"],location:"北京",salary:"—",source:"Boss",officialUrl:"https://talent.didiglobal.com",notes:"二面被刷。",nextAction:"-",timeline:[{date:"03-18",text:"投递",done:true},{date:"04-01",text:"一面通过",done:true},{date:"04-12",text:"二面 · 被刷",done:true}],review:{mood:"bad",went_well:"自我介绍清晰。",need_improve:"行为题回答太平。",key_questions:"一次冲突经历。",next_time:"准备 5 个 STAR 故事。"}},
];

const STAGES = [{k:"want",t:"想申请"},{k:"applied",t:"已投递"},{k:"written",t:"笔试"},{k:"interview",t:"面试"},{k:"offer",t:"Offer"},{k:"closed",t:"已关闭"}];
const SC = {want:"s-want",applied:"s-applied",written:"s-written",interview:"s-interview",offer:"s-offer",closed:"s-closed"};
const STORAGE_KEY = 'offer-trail-data-v1';
const TODAY = new Date('2026-04-19');

const OfferTrail = () => {
  const [apps, setApps] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [calView, setCalView] = useState(new Date(TODAY));
  const [kbFilter, setKbFilter] = useState('all');
  const [tblFilter, setTblFilter] = useState('all');
  const [searchKw, setSearchKw] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAppId, setCurrentAppId] = useState(null);
  const [qaOpen, setQaOpen] = useState(false);
  const [mobileKanbanStage, setMobileKanbanStage] = useState('want');
  const [toastMsg, setToastMsg] = useState({text:'', type:'ok', show:false});
  const [saveInd, setSaveInd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [curMood, setCurMood] = useState(null);
  
  // 快速添加表单
  const [qaLink, setQaLink] = useState('');
  const [qaComp, setQaComp] = useState('');
  const [qaRole, setQaRole] = useState('');
  const [qaDdl, setQaDdl] = useState('');
  
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  // 初始化数据
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (Array.isArray(p)) {
          setApps(p);
          return;
        }
      }
    } catch (e) {}
    setApps(JSON.parse(JSON.stringify(DEFAULT_DATA)));
  }, []);

  // 持久化
  useEffect(() => {
    if (apps.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
      setSaveInd(true);
      const t = setTimeout(() => setSaveInd(false), 1500);
      return () => clearTimeout(t);
    }
  }, [apps]);

  const showToast = useCallback((text, type='ok') => {
    setToastMsg({text, type, show:true});
    setTimeout(() => setToastMsg(prev => ({...prev, show:false})), 2500);
  }, []);

  const formatMD = (d) => `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const formatDateLong = (d) => {
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return `${d.getFullYear()} · ${months[d.getMonth()]} ${d.getDate()}`;
  };
  const daysTo = (ddl) => {
    if (!ddl || ddl === '—') return null;
    const [m,d] = ddl.split('-').map(Number);
    const target = new Date(TODAY.getFullYear(), m-1, d);
    return Math.round((target - TODAY) / 86400000);
  };
  const isUrgent = (ddl) => { const d = daysTo(ddl); return d !== null && d >= 0 && d <= 3; };
  const isSoon = (ddl) => { const d = daysTo(ddl); return d !== null && d > 3 && d <= 7; };
  const domain = (url) => { try { return new URL(url).hostname.replace('www.',''); } catch(e) { return null; } };
  const isMobile = () => window.innerWidth <= 640;

  // 总览计算
  const appliedCnt = apps.filter(a => a.applyDate).length;
  const passedCnt = apps.filter(a => ['written','interview','offer'].includes(a.stage) || (a.stage === 'closed' && a.timeline.length > 1)).length;
  const interviewCnt = apps.filter(a => a.stage === 'interview' || (a.stage === 'offer' && a.timeline.some(t => t.text.includes('面')))).length;
  const offerCnt = apps.filter(a => a.stage === 'offer').length;
  const rate = appliedCnt ? Math.round(passedCnt / appliedCnt * 100) : 0;
  
  const todayDdl = apps.filter(a => a.deadline === formatMD(TODAY));
  const todayInterviews = apps.filter(a => a.timeline?.some(t => !t.done && (t.text.includes('面') || t.text.includes('试')) && t.date === formatMD(TODAY))).length;

  // 漏斗数据
  const totalApplied = apps.filter(a => a.applyDate || a.stage !== 'want').length;
  const resumePass = apps.filter(a => ['written','interview','offer'].includes(a.stage) || (a.stage === 'closed' && a.timeline.length > 1)).length;
  const writtenPass = apps.filter(a => ['interview','offer'].includes(a.stage)).length;
  const intPass = apps.filter(a => a.stage === 'interview' || a.stage === 'offer').length;
  const total = Math.max(totalApplied, 1);
  
  const funnelData = [
    {label:'已投递', n:totalApplied, pct:100},
    {label:'简历通过', n:resumePass, pct:Math.round(resumePass/total*100)},
    {label:'笔试通过', n:writtenPass, pct:Math.round(writtenPass/total*100)},
    {label:'进入面试', n:intPass, pct:Math.round(intPass/total*100)},
    {label:'收到 offer', n:offerCnt, pct:Math.round(offerCnt/total*100)}
  ];

  // 复盘提示
  const pendingReviews = apps.filter(a => (a.stage === 'interview' || a.stage === 'closed') && !a.review && a.timeline?.some(t => t.done && (t.text.includes('面') || t.text.includes('被刷'))));

  // 看板数据
  const getKanbanCards = (stageK) => {
    let list = apps.filter(a => a.stage === stageK);
    if (kbFilter === 'urgent') list = list.filter(a => isUrgent(a.deadline));
    else if (kbFilter === 'high') list = list.filter(a => a.priority === 'high');
    return list;
  };

  // 表格数据
  const getTableRows = () => {
    let list = [...apps];
    if (tblFilter === 'progress') list = list.filter(a => !['offer','closed'].includes(a.stage));
    else if (tblFilter === 'offer') list = list.filter(a => a.stage === 'offer');
    else if (tblFilter === 'closed') list = list.filter(a => a.stage === 'closed');
    if (searchKw) {
      const kw = searchKw.toLowerCase();
      list = list.filter(a => (a.company + a.role).toLowerCase().includes(kw));
    }
    return list;
  };

  // 日历事件
  const getCalEvents = () => {
    const events = {};
    const addEv = (dateStr, type, text, id) => {
      if (!dateStr || dateStr === '—') return;
      let mm, dd;
      if (dateStr.includes('-') && dateStr.split('-').length === 2) {
        [mm,dd] = dateStr.split('-');
      } else return;
      const key = `${parseInt(mm)}-${parseInt(dd)}`;
      if (!events[key]) events[key] = [];
      events[key].push({type,text,id});
    };
    apps.forEach(a => {
      if (a.deadline && a.deadline !== '—' && a.stage === 'want') {
        addEv(a.deadline, 'ddl', `${a.company} DDL`, a.id);
      }
      (a.timeline || []).forEach(t => {
        if (!t.date || t.date === '—') return;
        let type = 'exam';
        if (t.text.includes('面') || t.text.includes('HR')) type = 'interview';
        else if (t.text.includes('笔试') || t.text.includes('测评')) type = 'exam';
        else if (t.text.includes('offer')) type = 'offer';
        else return;
        addEv(t.date, type, `${a.company} ${t.text}`, a.id);
      });
    });
    return events;
  };

  // 操作函数
  const updateField = (id, field, value) => {
    setApps(prev => prev.map(a => a.id === id ? {...a, [field]: value} : a));
    showToast('已保存');
  };

  const updatePriority = (id, txt) => {
    const map = {'高':'high','中':'med','低':'low'};
    const p = map[txt] || 'med';
    setApps(prev => prev.map(a => a.id === id ? {...a, priority: p} : a));
  };

  const saveReview = (id) => {
    const rfWent = document.getElementById('rfWent')?.value || '';
    const rfImp = document.getElementById('rfImp')?.value || '';
    const rfQ = document.getElementById('rfQ')?.value || '';
    const rfNext = document.getElementById('rfNext')?.value || '';
    
    setApps(prev => prev.map(a => a.id === id ? {
      ...a, 
      review: {
        mood: curMood || 'ok',
        went_well: rfWent,
        need_improve: rfImp,
        key_questions: rfQ,
        next_time: rfNext,
      }
    } : a));
    setCurMood(null);
    setModalOpen(false);
    showToast('✓ 复盘已保存，下次投同类岗位可参考');
  };

  const editReview = (id) => {
    setApps(prev => prev.map(a => a.id === id ? {...a, review: null} : a));
  };

  const addApp = () => {
    if (!qaComp || !qaRole) {
      showToast('公司和岗位不能为空', 'err');
      return;
    }
    const colors = ['#c8442a','#b8894a','#3d6e4a','#4a6b8a','#000','#ff2442','#ff6a00'];
    let source = '手动';
    let notes = '刚添加，待完善';
    let officialUrl = qaLink || '#';
    
    if (qaLink) {
      const d = domain(qaLink);
      if (d) {
        source = d.replace('.com','').replace('.cn','').replace('.net','');
        source = source.charAt(0).toUpperCase() + source.slice(1);
        notes = `JD 快照：${qaLink}\n\n(添加时间：${formatMD(TODAY)})`;
      }
    }
    
    const newApp = {
      id: Date.now(),
      company: qaComp, logo: qaComp[0], color: colors[apps.length % colors.length],
      role: qaRole, stage: 'want', priority: 'med', deadline: qaDdl || '—', applyDate: '',
      tags: ['新增'], location: '—', salary: '—', source,
      officialUrl: officialUrl,
      notes, nextAction: '完善信息',
      timeline: [], review: null
    };
    
    setApps([...apps, newApp]);
    setQaLink(''); setQaComp(''); setQaRole(''); setQaDdl('');
    setQaOpen(false);
    setCurrentView('kanban');
    showToast(`✓ 已添加 ${qaComp} · ${qaRole}`);
  };

  const handleCardClick = (id, focusReview=false) => {
    setCurrentAppId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurMood(null);
    setCurrentAppId(null);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(apps, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dt = new Date().toISOString().slice(0,10);
    a.href = url; a.download = `offer-trail-${dt}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ 已导出 JSON');
    setMenuOpen(false);
  };

  const exportCsv = () => {
    const headers = ['公司','岗位','阶段','优先级','投递日期','DDL','渠道','地点','薪资','标签','下一步','备注'];
    const rows = apps.map(a => [
      a.company, a.role, STAGES.find(s => s.k === a.stage).t,
      a.priority === 'high' ? '高' : a.priority === 'med' ? '中' : '低',
      a.applyDate || '', a.deadline, a.source, a.location, a.salary,
      a.tags.join('/'), a.nextAction, (a.notes || '').replace(/\n/g,' ')
    ]);
    const csv = '\uFEFF' + [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dt = new Date().toISOString().slice(0,10);
    a.href = url; a.download = `offer-trail-${dt}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ 已导出 CSV');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        if (!Array.isArray(data)) throw new Error('格式不对');
        setApps(data);
        showToast(`✓ 已导入 ${data.length} 条申请`);
      } catch(err) {
        showToast('导入失败: ' + err.message, 'err');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setMenuOpen(false);
  };

  const loadDemo = () => {
    if (apps.length && !confirm('当前已有数据，加载示例会覆盖，继续?')) return;
    setApps(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    showToast('✓ 已加载示例数据');
    setMenuOpen(false);
  };

  const resetAll = () => {
    if (!confirm('这将清空所有申请数据且无法恢复，确定?')) return;
    setApps([]);
    showToast('已清空所有数据', 'warn');
    setMenuOpen(false);
  };

  // 日历导航
  const calPrev = () => { const d = new Date(calView); d.setMonth(d.getMonth()-1); setCalView(d); };
  const calNext = () => { const d = new Date(calView); d.setMonth(d.getMonth()+1); setCalView(d); };
  const calToday = () => setCalView(new Date(TODAY));

  // 渲染当前申请详情
  const currentApp = apps.find(a => a.id === currentAppId);
  const stageText = currentApp ? STAGES.find(s => s.k === currentApp.stage).t : '';

  // 日历网格计算
  const renderCalGrid = () => {
    const year = calView.getFullYear();
    const month = calView.getMonth();
    const firstDay = new Date(year, month, 1);
    let startOffset = firstDay.getDay() - 1; 
    if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const events = getCalEvents();
    const days = [];
    
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push({d: prevDays - i, other: true, isToday: false, evs: []});
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = year === TODAY.getFullYear() && month === TODAY.getMonth() && d === TODAY.getDate();
      const key = `${month+1}-${d}`;
      days.push({d, other: false, isToday, evs: events[key] || []});
    }
    const total = startOffset + daysInMonth;
    const trailing = (7 - total % 7) % 7;
    for (let d = 1; d <= trailing; d++) {
      days.push({d, other: true, isToday: false, evs: []});
    }
    return days;
  };

  const calGrid = renderCalGrid();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const zhM = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];

  // 拖拽处理（简化版，仅桌面端）
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('appId', id);
    e.target.classList.add('drag');
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove('drag');
  };
  const handleDrop = (e, stageK) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('appId'));
    const app = apps.find(a => a.id === id);
    if (app && app.stage !== stageK) {
      const oldS = app.stage;
      const updates = { stage: stageK };
      if (oldS === 'want' && stageK !== 'want' && !app.applyDate) {
        updates.applyDate = formatMD(TODAY);
      }
      setApps(prev => prev.map(a => a.id === id ? {...a, ...updates} : a));
      showToast(`${app.company} → ${STAGES.find(s => s.k === stageK).t}`);
      if (oldS === 'interview' && (stageK === 'closed' || stageK === 'offer') && !app.review) {
        setTimeout(() => {
          if (confirm(`${app.company} 的面试结束了。要不要顺手记一下体验?(不写也可以)`)) {
            setCurrentAppId(id);
            setModalOpen(true);
          }
        }, 300);
      }
    }
  };

  // 判断瓶颈
  let bottleneckText = '';
  if (totalApplied < 3) {
    bottleneckText = '<strong>提示：</strong> 数据量较少，多投几家才能看清瓶颈。';
  } else {
    const conversions = [
      {name:'简历→笔试', from:resumePass, to:writtenPass, advice:'笔试通过率低，建议熟悉常见笔试题型(行测、业务开放题)。'},
      {name:'笔试→面试', from:writtenPass, to:intPass, advice:'从笔试到面试卡顿，建议专项练习相关笔试题库。'},
      {name:'面试→offer', from:intPass, to:offerCnt, advice:'面试通过率低，建议准备 STAR 故事库，打磨高频面试问题。'}
    ].filter(c => c.from > 0);
    const worst = conversions.reduce((a,b) => (a.to/a.from < b.to/b.from ? a : b), conversions[0]);
    const rate = worst ? Math.round(worst.to/worst.from*100) : 0;
    bottleneckText = worst ? `<strong>瓶颈定位：</strong> ${worst.name}转化率 <span style="color:var(--accent);font-weight:600">${rate}%</span>。${worst.advice}` : '<strong>数据良好：</strong> 目前没有明显瓶颈，继续保持。';
  }

  // Tips 生成
  const tips = [];
  const urg = apps.filter(a => isUrgent(a.deadline) && a.stage === 'want');
  if (urg.length) {
    const a = urg[0];
    tips.push({type:'urgent', text:`⏰ 今天必做：${a.company} · ${a.role} · ${a.deadline} 截止。`, meta:'DEADLINE'});
  }
  if (pendingReviews.length) {
    tips.push({type:'warn', text:`📝 复盘提醒：有 ${pendingReviews.length} 场面试还没写复盘，趁记忆新鲜补一下会对下次很有帮助。`, meta:'NOT URGENT · YOUR CHOICE'});
  }
  const waiting = apps.filter(a => a.stage === 'applied' && a.applyDate && daysTo(a.applyDate) !== null && daysTo(a.applyDate) < -7);
  if (waiting.length) {
    tips.push({type:'info', text:`💡 状态提醒：${waiting[0].company}已投递超过 7 天仍无进展，点开详情可跳转官网查看最新状态。`, meta:'CHECK STATUS'});
  }
  if (rate >= 50) {
    tips.push({type:'ok', text:`✓ 做得好：通过初筛率 ${rate}%，简历本身没问题，继续保持。`, meta:'KEEP GOING'});
  }
  if (!tips.length) {
    tips.push({type:'ok', text:`✓ 一切就绪：暂无紧急事项，可以趁此时间完善资料或刷面经。`, meta:'ALL CLEAR'});
  }

  return (
    <div className="offer-trail">
      <style>{`
        :root{--ink:#1a1a1a;--ink-s:#3a3a3a;--paper:#f4efe6;--paper-d:#ebe4d5;--cream:#faf6ee;--line:#d4ccb8;--line-s:#e3dcc9;--accent:#c8442a;--accent-d:#9e2f1b;--gold:#b8894a;--ok:#3d6e4a;--warn:#d68a1a;--muted:#8a8374;--shadow:0 1px 0 rgba(0,0,0,.04),0 4px 20px rgba(60,40,10,.06)}
        .offer-trail *{box-sizing:border-box;margin:0;padding:0}
        .offer-trail{background:var(--paper);color:var(--ink);font-family:"Noto Serif SC",Georgia,serif;line-height:1.6;min-height:100vh}
        .offer-trail::before{content:"";position:fixed;inset:0;background-image:radial-gradient(circle at 20% 30%,rgba(200,68,42,.04) 0,transparent 40%),radial-gradient(circle at 80% 70%,rgba(184,137,74,.05) 0,transparent 40%);pointer-events:none;z-index:0}
        
        .topbar{position:sticky;top:0;z-index:100;background:rgba(244,239,230,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);padding:14px 32px;display:flex;align-items:center;justify-content:space-between}
        .logo{display:flex;align-items:baseline;gap:10px}
        .logo-stamp{width:34px;height:34px;background:var(--accent);color:var(--cream);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;transform:rotate(-4deg);box-shadow:1px 2px 0 rgba(0,0,0,.1)}
        .logo-title{font-family:"Instrument Serif",serif;font-size:24px;font-style:italic}
        .logo-sub{font-size:11px;color:var(--muted)}
        .nav{display:flex;gap:4px;font-size:14px}
        .nav-item{padding:8px 16px;cursor:pointer;color:var(--ink-s);position:relative;transition:all .2s}
        .nav-item:hover{color:var(--ink)}
        .nav-item.active{color:var(--ink);font-weight:500}
        .nav-item.active::after{content:"";position:absolute;bottom:0;left:16px;right:16px;height:2px;background:var(--accent)}
        .user{position:relative;display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--muted)}
        .avatar{width:32px;height:32px;border-radius:50%;background:var(--paper-d);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--ink);cursor:pointer}
        .umenu{display:none;position:absolute;top:100%;right:0;margin-top:8px;background:var(--cream);border:1px solid var(--line);padding:6px;min-width:180px;box-shadow:0 8px 24px rgba(0,0,0,.1);z-index:200}
        .umenu.show{display:block}
        .umenu-item{padding:8px 12px;font-size:13px;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
        .umenu-item:hover{background:var(--paper)}
        .umenu-item.danger{color:var(--accent)}
        .umenu-item em{font-family:"JetBrains Mono",monospace;font-style:normal;font-size:10px;color:var(--muted)}
        .umenu-div{height:1px;background:var(--line-s);margin:4px 0}
        
        .main{max-width:1400px;margin:0 auto;padding:32px;position:relative;z-index:1}
        .section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:20px}
        .ch-label{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:3px;color:var(--accent);margin-bottom:6px;text-transform:uppercase}
        .section-title{font-family:"Instrument Serif",serif;font-size:36px;font-style:italic}
        .section-meta{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);letter-spacing:2px}
        
        .view{display:none}
        .view.active{display:block;animation:fadeIn .3s}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        
        .greeting{background:var(--ink);color:var(--cream);padding:24px 28px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center;position:relative;overflow:hidden}
        .greeting::after{content:"";position:absolute;right:-40px;top:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(200,68,42,.3),transparent 70%)}
        .greeting-text{font-family:"Instrument Serif",serif;font-size:24px;font-style:italic;line-height:1.3}
        .greeting-text strong{font-style:normal;color:var(--accent);font-family:"Noto Serif SC",serif;font-weight:500}
        .greeting-sub{font-size:13px;color:#999;margin-top:6px}
        .greeting-btn{background:var(--accent);color:var(--cream);padding:10px 18px;font-size:13px;cursor:pointer;border:none;z-index:2;position:relative;transition:all .2s;font-family:inherit}
        .greeting-btn:hover{background:var(--accent-d)}
        
        .dash-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
        .stat{background:var(--cream);border:1px solid var(--line);padding:18px;position:relative}
        .stat-label{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:2px;color:var(--muted)}
        .stat-num{font-family:"Instrument Serif",serif;font-size:42px;line-height:1;margin:6px 0 4px}
        .stat-num em{font-style:italic;color:var(--accent)}
        .stat-sub{font-size:12px;color:var(--muted)}
        
        .insight-row{display:grid;grid-template-columns:1.2fr 1fr;gap:14px;margin-bottom:18px}
        .icard{background:var(--cream);border:1px solid var(--line);padding:20px}
        .icard-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--line-s)}
        .icard-title{font-weight:500;font-size:15px}
        .icard-hint{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);letter-spacing:1.5px}
        
        .funnel{display:flex;flex-direction:column;gap:7px}
        .fn-row{display:flex;align-items:center;gap:10px}
        .fn-label{flex:0 0 78px;font-size:13px;color:var(--ink-s)}
        .fn-bar{flex:1;height:26px;background:var(--paper-d);position:relative;overflow:hidden}
        .fn-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent-d));display:flex;align-items:center;padding:0 10px;color:var(--cream);font-family:"JetBrains Mono",monospace;font-size:11px;transition:width 1s}
        .fn-rate{flex:0 0 48px;font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);text-align:right}
        .fn-note{margin-top:12px;padding:10px 12px;background:var(--paper);font-size:12.5px;color:var(--ink-s);border-left:2px solid var(--gold)}
        
        .tips{display:flex;flex-direction:column;gap:10px}
        .tip{padding:11px 13px;background:var(--paper);border-left:3px solid var(--accent);font-size:13px;line-height:1.55}
        .tip strong{font-weight:500;color:var(--accent)}
        .tip.warn{border-left-color:var(--gold)}.tip.warn strong{color:var(--gold)}
        .tip.ok{border-left-color:var(--ok)}.tip.ok strong{color:var(--ok)}
        .tip.info{border-left-color:#4a6b8a}.tip.info strong{color:#4a6b8a}
        .tip-meta{font-family:"JetBrains Mono",monospace;font-size:9px;color:var(--muted);margin-top:4px;letter-spacing:1px}
        
        .tools{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px}
        .pills{display:flex;gap:6px;flex-wrap:wrap}
        .pill{padding:5px 11px;font-family:"JetBrains Mono",monospace;font-size:11px;background:var(--cream);border:1px solid var(--line);cursor:pointer;color:var(--muted);transition:all .15s}
        .pill.active,.pill:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}
        .btn{padding:7px 14px;background:var(--cream);border:1px solid var(--line);font-family:inherit;font-size:13px;cursor:pointer;color:var(--ink);transition:all .15s}
        .btn:hover{background:var(--paper-d)}
        .btn.primary{background:var(--ink);color:var(--cream);border-color:var(--ink)}
        .btn.primary:hover{background:var(--accent);border-color:var(--accent)}
        .btn.accent{background:var(--accent);color:var(--cream);border-color:var(--accent)}
        .btn.accent:hover{background:var(--accent-d)}
        
        .search{display:none;margin-bottom:12px}
        .search.show{display:block;animation:fadeIn .2s}
        .search input{width:100%;padding:10px 14px;border:1px solid var(--line);background:var(--cream);font-family:inherit;font-size:13px;outline:none}
        .search input:focus{border-color:var(--accent)}
        
        .kanban{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;min-height:500px}
        .col{background:var(--paper-d);border:1px solid var(--line);padding:12px 8px;min-height:400px;transition:background .2s}
        .col.over{background:#e5dcc4}
        .col-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;margin-bottom:10px;border-bottom:1px solid var(--line)}
        .col-title{font-weight:500;font-size:13px;display:flex;align-items:center;gap:6px}
        .col-dot{width:8px;height:8px;border-radius:50%}
        .col[data-s="want"] .col-dot{background:#8a8374}
        .col[data-s="applied"] .col-dot{background:#4a6b8a}
        .col[data-s="written"] .col-dot{background:#b8894a}
        .col[data-s="interview"] .col-dot{background:#c8442a}
        .col[data-s="offer"] .col-dot{background:#3d6e4a}
        .col[data-s="closed"] .col-dot{background:#999}
        .col-cnt{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);background:var(--cream);padding:2px 7px;border:1px solid var(--line)}
        
        .kb-mobile-tabs{display:none;gap:6px;margin-bottom:14px;flex-wrap:wrap}
        .kb-mobile-tab{padding:6px 10px;font-family:"JetBrains Mono",monospace;font-size:11px;background:var(--cream);border:1px solid var(--line);cursor:pointer;color:var(--muted);transition:all .15s}
        .kb-mobile-tab.active{background:var(--accent);color:var(--cream);border-color:var(--accent)}
        
        .card{background:var(--cream);border:1px solid var(--line);padding:11px;margin-bottom:8px;cursor:grab;position:relative;box-shadow:var(--shadow);transition:all .15s}
        .card:hover{transform:translateY(-2px);box-shadow:2px 4px 0 rgba(0,0,0,.06),0 10px 20px rgba(60,40,10,.08)}
        .card.drag{opacity:.3;transform:rotate(2deg)}
        .card-c{font-weight:500;font-size:14px;margin-bottom:2px;display:flex;justify-content:space-between;align-items:center}
        .card-logo{width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--cream)}
        .card-r{font-size:12px;color:var(--ink-s);margin-bottom:7px}
        .card-tags{display:flex;gap:4px;margin-bottom:7px;flex-wrap:wrap}
        .tag{font-family:"JetBrains Mono",monospace;font-size:9px;padding:1px 5px;background:var(--paper);border:1px solid var(--line-s);color:var(--muted)}
        .card-m{display:flex;justify-content:space-between;align-items:center;font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted)}
        .ddl{padding:2px 6px;background:var(--paper);border:1px solid var(--line)}
        .ddl.urgent{background:var(--accent);color:var(--cream);border-color:var(--accent);animation:pulse 2s infinite}
        .ddl.warn{background:#fef5e0;color:var(--warn);border-color:var(--warn)}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.75}}
        .card-p{position:absolute;top:0;right:11px;width:3px;height:20px;background:var(--gold)}
        .card-p.high{background:var(--accent)}.card-p.low{opacity:0}
        .rhint{margin-top:7px;padding:6px 9px;background:linear-gradient(90deg,#fdf4e4,#faf6ee);border:1px dashed var(--gold);font-size:11px;color:var(--ink-s);cursor:pointer;display:flex;justify-content:space-between}
        .rhint em{font-family:"JetBrains Mono",monospace;font-style:normal;font-size:10px;color:var(--muted)}
        .rhint.done{background:#e8f0ea;border-color:var(--ok);color:var(--ok);border-style:solid}
        
        .banner{background:linear-gradient(90deg,#fdf4e4,#faf6ee);border:1px solid var(--gold);border-left:3px solid var(--gold);padding:11px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
        .banner-txt strong{color:var(--gold);font-weight:500}
        .banner-act{display:flex;gap:8px}
        .banner-act button{padding:4px 12px;font-size:12px;border:1px solid var(--line);background:var(--cream);cursor:pointer;font-family:inherit}
        .banner-act button.primary{background:var(--gold);color:var(--cream);border-color:var(--gold)}
        
        .tbl-wrap{background:var(--cream);border:1px solid var(--line);overflow-x:auto}
        .tbl{width:100%;border-collapse:collapse;font-size:13px;table-layout:fixed}
        .tbl thead{position:sticky;top:0;z-index:10}
        .tbl th{background:var(--paper-d);text-align:left;padding:11px 13px;font-weight:500;font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:1.5px;color:var(--muted);text-transform:uppercase;border-bottom:1px solid var(--line);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .tbl td{padding:10px 13px;border-bottom:1px solid var(--line-s);vertical-align:middle;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .tbl tbody tr{cursor:pointer;transition:background .15s}
        .tbl tbody tr:hover{background:var(--paper)}
        .tstage{display:inline-block;padding:2px 8px;font-size:11px;font-weight:500;border:1px solid;white-space:nowrap}
        .s-want{color:#8a8374;border-color:#8a8374;background:#f3efe4}
        .s-applied{color:#4a6b8a;border-color:#4a6b8a;background:#e8eef3}
        .s-written{color:#b8894a;border-color:#b8894a;background:#f8efd9}
        .s-interview{color:#c8442a;border-color:#c8442a;background:#fbe8e4}
        .s-offer{color:#3d6e4a;border-color:#3d6e4a;background:#e8f0ea}
        .s-closed{color:#999;border-color:#ccc;background:#f0ede6}
        .tprio{font-family:"JetBrains Mono",monospace;font-size:12px;white-space:nowrap}
        .tprio.high{color:var(--accent);font-weight:600}
        .tprio.med{color:var(--gold)}.tprio.low{color:var(--muted)}
        .tddl.urgent{color:var(--accent);font-weight:600}.tddl.warn{color:var(--warn)}
        .tcomp{display:flex;align-items:center;gap:10px;overflow:hidden}
        .tcomp .card-logo{flex-shrink:0}
        .tcomp>div{min-width:0}
        .tcomp>div>div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .tbl-empty{text-align:center;padding:40px;color:var(--muted);font-style:italic}
        
        .tbl th:nth-child(1),.tbl td:nth-child(1){width:18%}
        .tbl th:nth-child(2),.tbl td:nth-child(2){width:8%}
        .tbl th:nth-child(3),.tbl td:nth-child(3){width:8%}
        .tbl th:nth-child(4),.tbl td:nth-child(4){width:10%}
        .tbl th:nth-child(5),.tbl td:nth-child(5){width:10%}
        .tbl th:nth-child(6),.tbl td:nth-child(6){width:9%}
        .tbl th:nth-child(7),.tbl td:nth-child(7){width:8%}
        .tbl th:nth-child(8),.tbl td:nth-child(8){width:8%}
        .tbl th:nth-child(9),.tbl td:nth-child(9){width:auto;min-width:120px}
        
        .cal{background:var(--cream);border:1px solid var(--line);padding:22px}
        .cal-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--line)}
        .cal-month{font-family:"Instrument Serif",serif;font-size:30px;font-style:italic}
        .cal-month em{font-style:normal;color:var(--accent);font-family:"JetBrains Mono",monospace;font-size:13px;letter-spacing:2px;margin-left:8px}
        .cal-lgd{display:flex;gap:14px;font-size:12px;color:var(--muted);align-items:center}
        .cal-lgd span{display:flex;align-items:center;gap:5px}
        .cal-lgd i{width:10px;height:10px;display:inline-block}
        .cal-nav{display:flex;gap:6px;align-items:center;margin-right:12px}
        .cal-nav button{padding:4px 10px;border:1px solid var(--line);background:var(--cream);cursor:pointer;font-family:inherit;font-size:12px}
        .cal-nav button:hover{background:var(--paper-d)}
        .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
        .cal-dow,.cal-day{background:var(--cream);padding:8px;min-height:88px;position:relative}
        .cal-dow{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);letter-spacing:2px;min-height:auto;text-align:center;padding:9px;background:var(--paper-d)}
        .cal-dnum{font-family:"Instrument Serif",serif;font-size:15px;color:var(--ink-s)}
        .cal-day.other .cal-dnum{opacity:.25}
        .cal-day.today{background:var(--paper-d)}
        .cal-day.today .cal-dnum{color:var(--accent);font-weight:600}
        .cal-ev{font-size:10.5px;padding:2px 4px;margin-top:3px;background:var(--paper);border-left:2px solid var(--gold);line-height:1.3;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:filter .15s}
        .cal-ev:hover{filter:brightness(.95)}
        .cal-ev.interview{border-left-color:var(--accent);background:#fdecec}
        .cal-ev.exam{border-left-color:var(--gold);background:#fdf4e4}
        .cal-ev.ddl{border-left-color:var(--accent);background:#fbe8e4;font-weight:500}
        .cal-ev.offer{border-left-color:var(--ok);background:#e8f0ea}
        
        .backdrop{display:none;position:fixed;inset:0;background:rgba(26,26,26,.5);backdrop-filter:blur(3px);z-index:1000;align-items:center;justify-content:center}
        .backdrop.show{display:flex}
        .modal{background:var(--cream);width:640px;max-width:92vw;max-height:88vh;overflow-y:auto;padding:28px;border:1px solid var(--line);position:relative;box-shadow:0 30px 80px rgba(0,0,0,.3)}
        .mclose{position:absolute;top:14px;right:14px;width:28px;height:28px;border:1px solid var(--line);background:var(--paper);cursor:pointer;font-size:16px;font-family:inherit}
        .mhead{padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:16px;display:flex;align-items:center;gap:12px}
        .mlogo{width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;font-weight:600;font-size:16px;color:var(--cream)}
        .mcomp{font-family:"Instrument Serif",serif;font-size:26px;margin-bottom:2px}
        .mrole{font-size:13px;color:var(--ink-s)}
        .mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 20px;margin-bottom:16px}
        .mf-label{font-family:"JetBrains Mono",monospace;font-size:9.5px;letter-spacing:1.5px;color:var(--muted);margin-bottom:3px;text-transform:uppercase}
        .mf-val{font-size:13px}
        .mf-val.edit{cursor:text;padding:2px 4px;margin:-2px -4px;border-radius:2px;transition:background .15s;border:1px solid transparent}
        .mf-val.edit:hover{background:var(--paper)}
        .mf-val.edit:focus{outline:none;background:var(--cream);border-color:var(--accent)}
        .mf-input{width:100%;padding:4px 6px;border:1px solid var(--accent);background:var(--cream);font-family:inherit;font-size:13px;outline:none}
        .mblock-lbl{font-family:"JetBrains Mono",monospace;font-size:9.5px;letter-spacing:1.5px;color:var(--muted);margin-bottom:8px;text-transform:uppercase}
        
        .tline{border-left:2px solid var(--line);padding-left:18px;margin:8px 0 16px}
        .titem{position:relative;padding-bottom:11px}
        .titem::before{content:"";position:absolute;left:-25px;top:4px;width:12px;height:12px;background:var(--cream);border:2px solid var(--accent);border-radius:50%}
        .titem.done::before{background:var(--accent)}
        .titem.pending::before{border-color:var(--line)}
        .tdate{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted)}
        .ttext{font-size:13px;margin-top:2px}
        
        .notes{background:var(--paper);border:1px solid var(--line-s);padding:11px 13px;font-size:12.5px;line-height:1.6;color:var(--ink-s);margin-bottom:16px;white-space:pre-wrap;min-height:30px;cursor:text}
        .notes:hover{background:#f6f0e3}
        .notes:focus{outline:none;box-shadow:0 0 0 1px var(--accent)}
        .jd-link{display:inline-block;padding:6px 12px;background:var(--paper);border:1px solid var(--line);font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--ink-s);margin-right:8px;margin-bottom:8px;cursor:pointer;transition:all .15s;text-decoration:none}
        .jd-link:hover{background:var(--paper-d);border-color:var(--accent);color:var(--accent)}
        
        .rv{margin-top:16px;padding:14px;background:linear-gradient(135deg,#fdf4e4 0%,#faf6ee 100%);border:1px solid var(--gold)}
        .rv.done{background:#f0f5f1;border-color:var(--ok)}
        .rv-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
        .rv-title{font-weight:500;font-size:14px;color:var(--gold)}
        .rv.done .rv-title{color:var(--ok)}
        .rv-skip{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);cursor:pointer;text-decoration:underline}
        .rv-form{display:flex;flex-direction:column;gap:9px}
        .rv-f{display:flex;flex-direction:column}
        .rv-f-lbl{font-size:12px;color:var(--ink-s);margin-bottom:4px}
        .rv-f-lbl span{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);margin-left:6px}
        .rv-f textarea,.rv-f input{padding:7px 9px;border:1px solid var(--line);background:var(--cream);font-family:inherit;font-size:13px;outline:none;resize:vertical}
        .rv-f textarea{min-height:46px}
        .rv-f textarea:focus,.rv-f input:focus{border-color:var(--gold)}
        .mood{display:flex;gap:6px}
        .mood-op{flex:1;padding:7px;border:1px solid var(--line);background:var(--cream);cursor:pointer;font-size:13px;text-align:center;transition:all .15s;font-family:inherit}
        .mood-op:hover{background:var(--paper)}
        .mood-op.active{background:var(--gold);color:var(--cream);border-color:var(--gold)}
        .rv-disp{font-size:13px;line-height:1.65}
        .rv-disp .rd{margin-bottom:7px}
        .rv-disp .rd-l{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);letter-spacing:1px;display:block;margin-bottom:2px}
        
        .fab{position:fixed;bottom:26px;right:26px;width:54px;height:54px;border-radius:50%;background:var(--accent);color:var(--cream);border:none;font-size:24px;cursor:pointer;box-shadow:0 8px 24px rgba(200,68,42,.4);z-index:400;transition:all .2s;font-family:inherit}
        .fab:hover{transform:scale(1.08) rotate(90deg)}
        .qa{display:none;position:fixed;bottom:26px;right:26px;background:var(--cream);border:1px solid var(--line);padding:18px;width:320px;box-shadow:0 20px 60px rgba(0,0,0,.15);z-index:500}
        .qa.show{display:block}
        .qa-title{font-weight:500;font-size:15px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
        .qa-hint{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);margin-bottom:10px;padding:7px;background:var(--paper);border-left:2px solid var(--accent);line-height:1.5}
        .qa-in{width:100%;padding:8px 10px;border:1px solid var(--line);background:var(--paper);font-family:inherit;font-size:13px;margin-bottom:7px;outline:none}
        .qa-in:focus{border-color:var(--accent)}
        
        .toast{position:fixed;bottom:95px;right:26px;background:var(--ink);color:var(--cream);padding:11px 18px;border-left:3px solid var(--ok);font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:2000;opacity:0;transform:translateY(20px);transition:all .3s;pointer-events:none;max-width:320px}
        .toast.show{opacity:1;transform:translateY(0)}
        .toast.err{border-left-color:var(--accent)}
        .toast.warn{border-left-color:var(--gold)}
        .save-ind{position:fixed;top:70px;right:14px;font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);padding:3px 8px;background:var(--cream);border:1px solid var(--line-s);opacity:0;transition:opacity .3s;z-index:99;pointer-events:none}
        .save-ind.show{opacity:.8}
        
        .footer{margin-top:50px;padding:20px;border-top:1px solid var(--line);text-align:center;font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--muted);letter-spacing:1.5px}
        .footer span{color:var(--accent)}
        
        @media (max-width:640px){
          .backdrop{align-items:flex-end;padding:0}
          .modal{width:100%;max-width:100%;border-radius:16px 16px 0 0;border-left:none;border-right:none;border-bottom:none;max-height:85vh;animation:fadeIn .3s}
          .mclose{top:10px;right:10px}
          .fab{bottom:80px;right:16px;width:48px;height:48px;font-size:20px}
          .toast{bottom:140px;right:16px}
          .qa{bottom:80px;right:16px;left:16px;width:auto}
          .kb-mobile-tabs{display:flex}
          .kanban{grid-template-columns:1fr}
          .col{display:none}
          .col.active{display:block}
          .main{padding:18px}
          .topbar{padding:12px 16px;flex-wrap:wrap}
          .nav{order:3;width:100%;overflow-x:auto}
          .dash-grid{grid-template-columns:1fr}
          .insight-row{grid-template-columns:1fr}
          .kanban{grid-template-columns:1fr}
          .tbl th:nth-child(4),.tbl td:nth-child(4),.tbl th:nth-child(5),.tbl td:nth-child(5),.tbl th:nth-child(6),.tbl td:nth-child(6),.tbl th:nth-child(8),.tbl td:nth-child(8),.tbl th:nth-child(9),.tbl td:nth-child(9){display:none}
          .tbl th:nth-child(1),.tbl td:nth-child(1){width:40%}
          .tbl th:nth-child(2),.tbl td:nth-child(2){width:12%}
          .tbl th:nth-child(3),.tbl td:nth-child(3){width:12%}
          .tbl th:nth-child(7),.tbl td:nth-child(7){width:18%}
        }
        @media (max-width:1100px){
          .kanban{grid-template-columns:repeat(3,1fr)}
          .dash-grid{grid-template-columns:repeat(2,1fr)}
          .insight-row{grid-template-columns:1fr}
          .mgrid{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>

      {/* Toast */}
      <div className={`toast ${toastMsg.show ? 'show' : ''} ${toastMsg.type}`}>{toastMsg.text}</div>
      <div className={`save-ind ${saveInd ? 'show' : ''}`}>✓ 已保存</div>

      {/* Topbar */}
      <div className="topbar">
        <div className="logo">
          <div className="logo-stamp">轨</div>
          <div>
            <div className="logo-title">Offer 轨迹</div>
            <div className="logo-sub">看得清的求职过程</div>
          </div>
        </div>
        <div className="nav">
          <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>总览</div>
          <div className={`nav-item ${currentView === 'kanban' ? 'active' : ''}`} onClick={() => setCurrentView('kanban')}>看板</div>
          <div className={`nav-item ${currentView === 'table' ? 'active' : ''}`} onClick={() => setCurrentView('table')}>表格</div>
          <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => setCurrentView('calendar')}>日历</div>
        </div>
        <div className="user">
          <span>林同学</span>
          <div className="avatar" onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>林</div>
          <div className={`umenu ${menuOpen ? 'show' : ''}`}>
            <div className="umenu-item" onClick={exportJson}>导出数据 <em>JSON</em></div>
            <div className="umenu-item" onClick={() => fileInputRef.current?.click()}>导入数据 <em>JSON</em></div>
            <div className="umenu-div"></div>
            <div className="umenu-item" onClick={loadDemo}>加载示例数据 <em>DEMO</em></div>
            <div className="umenu-item danger" onClick={resetAll}>重置数据 <em>RESET</em></div>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="application/json" style={{display:'none'}} onChange={handleImport} />
      </div>

      <div className="main">
        {/* Dashboard */}
        <div className={`view ${currentView === 'dashboard' ? 'active' : ''}`}>
          <div className="section-head">
            <div>
              <div className="ch-label">OVERVIEW</div>
              <h2 className="section-title">你的求职战况</h2>
            </div>
            <div className="section-meta">{formatDateLong(TODAY)}</div>
          </div>
          <div className="greeting">
            <div>
              <div className="greeting-text">今天有 <strong>{todayDdl.length}</strong> 个 DDL，<strong>{todayInterviews}</strong> 场面试。<br/>你已投递 {appliedCnt} 次。</div>
              <div className="greeting-sub">持续加油，每一次尝试都算数。</div>
            </div>
            <button className="greeting-btn" onClick={() => setCurrentView('kanban')}>去看板 →</button>
          </div>
          <div className="dash-grid">
            <div className="stat">
              <div className="stat-label">TOTAL</div>
              <div className="stat-num">{appliedCnt}</div>
              <div className="stat-sub">已投递</div>
            </div>
            <div className="stat">
              <div className="stat-label">RESPONSE</div>
              <div className="stat-num"><em>{rate}<span style={{fontSize:22}}>%</span></em></div>
              <div className="stat-sub">通过初筛比例</div>
            </div>
            <div className="stat">
              <div className="stat-label">INTERVIEWS</div>
              <div className="stat-num">{interviewCnt}</div>
              <div className="stat-sub">进入面试</div>
            </div>
            <div className="stat">
              <div className="stat-label">OFFERS</div>
              <div className="stat-num"><em>{offerCnt}</em></div>
              <div className="stat-sub">已拿 offer</div>
            </div>
          </div>
          <div className="insight-row">
            <div className="icard">
              <div className="icard-head">
                <div className="icard-title">申请漏斗</div>
                <div className="icard-hint">FUNNEL</div>
              </div>
              <div className="funnel">
                {funnelData.map((f, i) => (
                  <div key={i} className="fn-row">
                    <div className="fn-label">{f.label}</div>
                    <div className="fn-bar"><div className="fn-fill" style={{width:`${Math.max(f.pct,4)}%`}}>{f.n}</div></div>
                    <div className="fn-rate">{f.pct}%</div>
                  </div>
                ))}
              </div>
              <div className="fn-note" dangerouslySetInnerHTML={{__html: bottleneckText}}></div>
            </div>
            <div className="icard">
              <div className="icard-head">
                <div className="icard-title">下一步做什么</div>
                <div className="icard-hint">ACTIONS</div>
              </div>
              <div className="tips">
                {tips.map((t, i) => (
                  <div key={i} className={`tip ${t.type}`}>
                    <strong>{t.text.split('：')[0]}：</strong>{t.text.split('：')[1] || t.text}
                    <div className="tip-meta">{t.meta}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kanban */}
        <div className={`view ${currentView === 'kanban' ? 'active' : ''}`}>
          <div className="section-head">
            <div>
              <div className="ch-label">KANBAN</div>
              <h2 className="section-title">申请看板</h2>
            </div>
            <div className="section-meta">拖拽卡片 · 变更阶段</div>
          </div>
          {pendingReviews.length > 0 && (
            <div className="banner">
              <div className="banner-txt"><strong>📝 有 {pendingReviews.length} 场面试还没写复盘</strong> — 复盘是个好习惯，但今天不写也没关系。</div>
              <div className="banner-act">
                <button onClick={() => {}}>先不写</button>
                <button className="primary" onClick={() => handleCardClick(pendingReviews[0].id, true)}>现在写</button>
              </div>
            </div>
          )}
          <div className="kb-mobile-tabs">
            {STAGES.map(s => (
              <div key={s.k} className={`kb-mobile-tab ${mobileKanbanStage === s.k ? 'active' : ''}`} onClick={() => setMobileKanbanStage(s.k)}>
                {s.t} ({getKanbanCards(s.k).length})
              </div>
            ))}
          </div>
          <div className="tools">
            <div className="pills">
              <div className={`pill ${kbFilter === 'all' ? 'active' : ''}`} onClick={() => setKbFilter('all')}>全部</div>
              <div className={`pill ${kbFilter === 'urgent' ? 'active' : ''}`} onClick={() => setKbFilter('urgent')}>⚡ 紧急</div>
              <div className={`pill ${kbFilter === 'high' ? 'active' : ''}`} onClick={() => setKbFilter('high')}>★ 高优</div>
            </div>
            <div>
              <button className="btn primary" onClick={() => setQaOpen(true)}>+ 快速添加</button>
            </div>
          </div>
          <div className="kanban">
            {STAGES.map(s => {
              const cards = getKanbanCards(s.k);
              const isMobileView = isMobile();
              const showCol = !isMobileView || mobileKanbanStage === s.k;
              if (isMobileView && !showCol) return null;
              return (
                <div key={s.k} className={`col ${showCol && isMobileView ? 'active' : ''}`} 
                     data-s={s.k}
                     onDragOver={(e) => e.preventDefault()}
                     onDrop={(e) => handleDrop(e, s.k)}>
                  <div className="col-head">
                    <div className="col-title"><span className="col-dot"></span>{s.t}</div>
                    <div className="col-cnt">{cards.length}</div>
                  </div>
                  {cards.map(a => {
                    let dc = ''; if (isUrgent(a.deadline)) dc='urgent'; else if (isSoon(a.deadline)) dc='warn';
                    const needReview = (a.stage === 'interview' || a.stage === 'closed') && !a.review && a.timeline?.some(t => t.done && (t.text.includes('面') || t.text.includes('被刷')));
                    return (
                      <div key={a.id} className="card" draggable onDragStart={(e) => handleDragStart(e, a.id)} onDragEnd={handleDragEnd} onClick={() => handleCardClick(a.id)}>
                        <div className={`card-p ${a.priority}`}></div>
                        <div className="card-c">
                          <span>{a.company}</span>
                          <span className="card-logo" style={{background:a.color}}>{a.logo}</span>
                        </div>
                        <div className="card-r">{a.role}</div>
                        <div className="card-tags">
                          {a.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
                          <span className="tag">{a.location}</span>
                        </div>
                        <div className="card-m">
                          <span>{a.source}</span>
                          {a.deadline !== '—' ? <span className={`ddl ${dc}`}>DDL {a.deadline}</span> : <span className="ddl">已投</span>}
                        </div>
                        {needReview ? (
                          <div className="rhint">📝 面试过了，记一笔? <em>可跳过</em></div>
                        ) : a.review ? (
                          <div className="rhint done">✓ 已复盘 <em>点开查看</em></div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className={`view ${currentView === 'table' ? 'active' : ''}`}>
          <div className="section-head">
            <div>
              <div className="ch-label">TABLE</div>
              <h2 className="section-title">所有申请</h2>
            </div>
            <div className="section-meta">点击行 · 查看详情</div>
          </div>
          <div className="tools">
            <div className="pills">
              <div className={`pill ${tblFilter === 'all' ? 'active' : ''}`} onClick={() => setTblFilter('all')}>全部</div>
              <div className={`pill ${tblFilter === 'progress' ? 'active' : ''}`} onClick={() => setTblFilter('progress')}>进行中</div>
              <div className={`pill ${tblFilter === 'offer' ? 'active' : ''}`} onClick={() => setTblFilter('offer')}>Offer</div>
              <div className={`pill ${tblFilter === 'closed' ? 'active' : ''}`} onClick={() => setTblFilter('closed')}>已关闭</div>
            </div>
            <div>
              <button className="btn" onClick={() => setShowSearch(!showSearch)}>🔍 搜索</button>
              <button className="btn" onClick={exportCsv}>📤 导出 CSV</button>
            </div>
          </div>
          <div className={`search ${showSearch ? 'show' : ''}`}>
            <input ref={searchInputRef} placeholder="搜索公司 / 岗位..." value={searchKw} onChange={(e) => setSearchKw(e.target.value)} />
          </div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>公司 / 岗位</th>
                  <th>阶段</th>
                  <th>优先级</th>
                  <th>投递日期</th>
                  <th>下一步 DDL</th>
                  <th>渠道</th>
                  <th>地点</th>
                  <th>薪资</th>
                  <th>标签</th>
                </tr>
              </thead>
              <tbody>
                {getTableRows().length === 0 ? (
                  <tr><td colSpan="9" className="tbl-empty">没有匹配的申请</td></tr>
                ) : (
                  getTableRows().map(a => {
                    let dc = ''; if (isUrgent(a.deadline)) dc='urgent'; else if (isSoon(a.deadline)) dc='warn';
                    return (
                      <tr key={a.id} onClick={() => handleCardClick(a.id)}>
                        <td>
                          <div className="tcomp">
                            <span className="card-logo" style={{background:a.color}}>{a.logo}</span>
                            <div>
                              <div style={{fontWeight:500}}>{a.company}</div>
                              <div style={{fontSize:11.5,color:'var(--muted)'}}>{a.role}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className={`tstage ${SC[a.stage]}`}>{STAGES.find(s=>s.k===a.stage).t}</span></td>
                        <td><span className={`tprio ${a.priority}`}>{a.priority==='high'?'★★★':a.priority==='med'?'★★':'★'}</span></td>
                        <td style={{fontFamily:'"JetBrains Mono",monospace',fontSize:12}}>{a.applyDate||'—'}</td>
                        <td style={{fontFamily:'"JetBrains Mono",monospace',fontSize:12}} className={`tddl ${dc}`}>{a.deadline}</td>
                        <td style={{fontSize:12}}>{a.source}</td>
                        <td style={{fontSize:12}}>{a.location}</td>
                        <td style={{fontSize:12}}>{a.salary}</td>
                        <td>{a.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar */}
        <div className={`view ${currentView === 'calendar' ? 'active' : ''}`}>
          <div className="section-head">
            <div>
              <div className="ch-label">CALENDAR</div>
              <h2 className="section-title">申请日历</h2>
            </div>
            <div className="section-meta">点击事件 · 查看详情</div>
          </div>
          <div className="cal">
            <div className="cal-head">
              <div className="cal-month">{months[calView.getMonth()]} {calView.getFullYear()} <em>{zhM[calView.getMonth()]}</em></div>
              <div style={{display:'flex',alignItems:'center'}}>
                <div className="cal-nav">
                  <button onClick={calPrev}>‹</button>
                  <button onClick={calToday}>今</button>
                  <button onClick={calNext}>›</button>
                </div>
                <div className="cal-lgd">
                  <span><i style={{background:'var(--accent)'}}></i>面试</span>
                  <span><i style={{background:'var(--gold)'}}></i>笔试</span>
                  <span><i style={{background:'var(--accent)',opacity:.7}}></i>DDL</span>
                  <span><i style={{background:'var(--ok)'}}></i>Offer</span>
                </div>
              </div>
            </div>
            <div className="cal-grid">
              {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => <div key={d} className="cal-dow">{d}</div>)}
              {calGrid.map((day, i) => (
                <div key={i} className={`cal-day ${day.other ? 'other' : ''} ${day.isToday ? 'today' : ''}`}>
                  <div className="cal-dnum">{day.d}{day.isToday ? ' · TODAY' : ''}</div>
                  {day.evs.map((e, j) => (
                    <div key={j} className={`cal-ev ${e.type}`} onClick={() => handleCardClick(e.id)}>{e.text}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`backdrop ${modalOpen ? 'show' : ''}`} onClick={(e) => { if(e.target.classList.contains('backdrop')) closeModal(); }}>
        <div className="modal">
          {currentApp && (
            <>
              <button className="mclose" onClick={closeModal}>×</button>
              <div className="mhead">
                <span className="mlogo" style={{background:currentApp.color}}>{currentApp.logo}</span>
                <div>
                  <div className="mcomp" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'company', e.target.textContent.trim())}>{currentApp.company}</div>
                  <div className="mrole" contentEditable suppressContentEditableWarning onBlur={(e) => {
                    const parts = e.target.textContent.trim().split('·').map(s => s.trim());
                    if (parts.length >= 3) {
                      updateField(currentApp.id, 'role', parts[0]);
                      updateField(currentApp.id, 'location', parts[1]);
                      updateField(currentApp.id, 'salary', parts[2]);
                    }
                  }}>{currentApp.role} · {currentApp.location} · {currentApp.salary}</div>
                </div>
              </div>
              <div className="mgrid">
                <div>
                  <div className="mf-label">当前阶段</div>
                  <div className="mf-val">{stageText}</div>
                </div>
                <div>
                  <div className="mf-label">投递日期</div>
                  <div className="mf-val edit" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'applyDate', e.target.textContent.trim())}>{currentApp.applyDate || '—'}</div>
                </div>
                <div>
                  <div className="mf-label">DDL</div>
                  <div className="mf-val edit" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'deadline', e.target.textContent.trim())}>{currentApp.deadline}</div>
                </div>
                <div>
                  <div className="mf-label">渠道</div>
                  <div className="mf-val edit" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'source', e.target.textContent.trim())}>{currentApp.source}</div>
                </div>
                <div>
                  <div className="mf-label">优先级</div>
                  <div className="mf-val edit" contentEditable suppressContentEditableWarning onBlur={(e) => updatePriority(currentApp.id, e.target.textContent.trim())}>{currentApp.priority === 'high' ? '高' : currentApp.priority === 'med' ? '中' : '低'}</div>
                </div>
                <div>
                  <div className="mf-label">下一步</div>
                  <div className="mf-val edit" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'nextAction', e.target.textContent.trim())}>{currentApp.nextAction}</div>
                </div>
              </div>
              <div className="mblock-lbl">官方链接 · 可查看最新流程状态</div>
              <div className="mf-val edit" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'officialUrl', e.target.textContent.trim())} style={{marginBottom:12,fontFamily:'"JetBrains Mono",monospace',fontSize:11}}>{currentApp.officialUrl || 'https://'}</div>
              
              {currentApp.timeline?.length > 0 && (
                <>
                  <div className="mblock-lbl" style={{marginTop:16}}>进度时间线</div>
                  <div className="tline">
                    {currentApp.timeline.map((t, i) => (
                      <div key={i} className={`titem ${t.done ? 'done' : 'pending'}`}>
                        <div className="tdate">{t.date}</div>
                        <div className="ttext">{t.text}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="mblock-lbl">备注 <span style={{textTransform:'none',fontFamily:'"Noto Serif SC"',letterSpacing:0,fontSize:11,color:'var(--muted)'}}>(点击编辑，失焦自动保存)</span></div>
              <div className="notes" contentEditable suppressContentEditableWarning onBlur={(e) => updateField(currentApp.id, 'notes', e.target.textContent)}>{currentApp.notes || '点击添加备注...'}</div>
              
              {(['interview','closed','offer'].includes(currentApp.stage) && currentApp.timeline?.some(t => t.done && (t.text.includes('面') || t.text.includes('被刷') || t.text.includes('offer')))) && (
                currentApp.review ? (
                  <div className="rv done">
                    <div className="rv-head">
                      <div className="rv-title">✓ 面试复盘</div>
                      <span className="rv-skip" onClick={() => editReview(currentApp.id)}>编辑</span>
                    </div>
                    <div className="rv-disp">
                      <div className="rd"><span className="rd-l">当时的感受</span>{currentApp.review.mood === 'good' ? '😊 感觉不错' : currentApp.review.mood === 'bad' ? '😓 不太好' : '😐 一般般'}</div>
                      <div className="rd"><span className="rd-l">做得好的地方</span>{currentApp.review.went_well || '—'}</div>
                      <div className="rd"><span className="rd-l">需要改进</span>{currentApp.review.need_improve || '—'}</div>
                      <div className="rd"><span className="rd-l">被问到的关键问题</span>{currentApp.review.key_questions || '—'}</div>
                      <div className="rd"><span className="rd-l">下次要做的事</span>{currentApp.review.next_time || '—'}</div>
                    </div>
                  </div>
                ) : (
                  <div className="rv">
                    <div className="rv-head">
                      <div className="rv-title">📝 面试复盘 <span style={{fontWeight:400,color:'var(--muted)',fontSize:12}}>· 可选</span></div>
                      <span className="rv-skip" onClick={closeModal}>今天先不写</span>
                    </div>
                    <div style={{fontSize:12.5,color:'var(--ink-s)',marginBottom:10}}>趁记忆新鲜记几笔。不想写也没关系，随时可以回来。</div>
                    <div className="rv-form">
                      <div className="rv-f">
                        <div className="rv-f-lbl">当时的感受</div>
                        <div className="mood">
                          <div className={`mood-op ${curMood === 'good' ? 'active' : ''}`} onClick={() => setCurMood('good')}>😊 感觉不错</div>
                          <div className={`mood-op ${curMood === 'ok' ? 'active' : ''}`} onClick={() => setCurMood('ok')}>😐 一般般</div>
                          <div className={`mood-op ${curMood === 'bad' ? 'active' : ''}`} onClick={() => setCurMood('bad')}>😓 不太好</div>
                        </div>
                      </div>
                      <div className="rv-f">
                        <div className="rv-f-lbl">做得好的地方 <span>(可留空)</span></div>
                        <textarea id="rfWent" placeholder="比如：自我介绍讲清楚了..."></textarea>
                      </div>
                      <div className="rv-f">
                        <div className="rv-f-lbl">想改进的地方 <span>(可留空)</span></div>
                        <textarea id="rfImp" placeholder="比如：算法题卡了 10 分钟..."></textarea>
                      </div>
                      <div className="rv-f">
                        <div className="rv-f-lbl">被问到的关键问题 <span>(可留空)</span></div>
                        <textarea id="rfQ" placeholder="比如：讲一次冲突经历..."></textarea>
                      </div>
                      <div className="rv-f">
                        <div className="rv-f-lbl">下次要做什么 <span>(可留空)</span></div>
                        <input type="text" id="rfNext" placeholder="比如：准备 5 个 STAR 故事" />
                      </div>
                      <div style={{display:'flex',gap:8,marginTop:4}}>
                        <button className="btn" style={{flex:1}} onClick={closeModal}>下次再说</button>
                        <button className="btn accent" style={{flex:2}} onClick={() => saveReview(currentApp.id)}>✓ 保存复盘</button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>

      {/* Quick Add */}
      <div className={`qa ${qaOpen ? 'show' : ''}`}>
        <div className="qa-title">快速添加 <span style={{cursor:'pointer',color:'var(--muted)'}} onClick={() => setQaOpen(false)}>×</span></div>
        <div className="qa-hint">💡 粘贴 JD 链接，系统会抓取域名作为渠道，并在备注里保留链接防止岗位下架丢失。</div>
        <input className="qa-in" placeholder="粘贴 JD 链接(可选)" value={qaLink} onChange={(e) => setQaLink(e.target.value)} />
        <input className="qa-in" placeholder="公司名称 *" value={qaComp} onChange={(e) => setQaComp(e.target.value)} />
        <input className="qa-in" placeholder="岗位名称 *" value={qaRole} onChange={(e) => setQaRole(e.target.value)} />
        <input className="qa-in" placeholder="DDL (MM-DD,可选)" value={qaDdl} onChange={(e) => setQaDdl(e.target.value)} />
        <div style={{display:'flex',gap:8,marginTop:6}}>
          <button className="btn" style={{flex:1}} onClick={() => setQaOpen(false)}>取消</button>
          <button className="btn accent" style={{flex:2}} onClick={addApp}>✓ 添加到看板</button>
        </div>
      </div>

      <button className="fab" onClick={() => setQaOpen(true)}>+</button>
      
      <div className="footer">OFFER 轨迹 · 解决的不是"记录"，而是<span>"你知不知道自己在哪"</span></div>
    </div>
  );
};

export default OfferTrail;
