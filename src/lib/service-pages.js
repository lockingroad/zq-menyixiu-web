export const SERVICE_PAGES = [
  {
    slug: 'remote-control-repair',
    name: '遥控器与控制器维修',
    navLabel: '遥控器 / 控制器',
    eyebrow: '遥控器与控制器',
    title: '枣强卷帘门遥控器、控制器维修与配码',
    description:
      '处理卷帘门遥控器失灵、按键反向、无法对码、接收器无响应和控制器故障。先核对频率、芯片与故障现象，再决定重新配码、维修或更换。',
    directAnswer:
      '遥控器按了没反应，不一定是电机坏了。应先检查电池、遥控器指示灯、接收器供电和控制器状态；新遥控器还要核对频率、芯片及编码方式。能修复或重新配码的，不会直接建议整套更换。',
    published: '2026-08-04',
    updated: '2026-08-11',
    heroImage: {
      src: '/images/faq/remote-copy-code-guide/poster.jpg',
      alt: '枣强门壹修演示卷帘门拷贝码遥控器按键对应关系',
      position: 'center 42%',
    },
    scope: [
      '遥控器换电池后仍无反应',
      '新遥控器清码、学习码与对拷',
      '上升、停止、下降按键对应错误',
      '接收器无响应或控制距离明显变短',
      '控制器保险、继电器和线路故障排查',
      '旧遥控器丢失后的型号与方案判断',
    ],
    symptoms: [
      {
        question: '遥控器指示灯亮，但门体完全不动',
        answer: '可能是对码丢失、接收器未供电、控制器保险或继电器故障，也可能是门体和电机侧问题，需要分段检查。',
      },
      {
        question: '新配遥控器能用，但上下按键反了',
        answer: '通常是学习时的按键通道对应反了，可在确认遥控器兼容后重新清码并交叉学习，不建议直接改电机线路。',
      },
      {
        question: '遥控距离越来越短、偶尔才有反应',
        answer: '先更换同规格电池并检查按键磨损；若仍不稳定，再检查遥控器晶振、接收天线和现场干扰。',
      },
    ],
    process: [
      { title: '说明现象', text: '提供遥控器正反面、控制器和门体照片，并说明哪些按键有效。' },
      { title: '核对类型', text: '确认频率、芯片、固定码或滚动码类型，避免购买后无法学习。' },
      { title: '分段检测', text: '依次判断遥控器、接收器、控制器供电以及电机是否正常。' },
      { title: '配码或维修', text: '根据检测结果重新学习按键、维修控制器或更换适配部件。' },
      { title: '逐键复测', text: '在安全位置测试上升、停止、下降及有效控制距离。' },
    ],
    evidence: {
      label: '视频实拍',
      title: '按键反向、拷贝码清码与一控两门的安全边界',
      description:
        '实拍演示拷贝码的清码和头对头学习；按键反向可交叉对拷，但一控两门必须先确认按键映射并防止误操作。',
      href: '/faq/remote-copy-code-guide',
      linkText: '查看视频 FAQ',
      image: {
        src: '/images/faq/remote-copy-code-guide/copy-signal.jpg',
        alt: '现场使用两个遥控器头对头学习拷贝码信号',
      },
    },
    faqs: [
      {
        question: '卷帘门遥控器可以直接照外形购买吗？',
        answer: '不建议只看外形。还要核对频率、芯片型号、编码方式以及控制器是否支持，外形相同也可能无法配对。',
      },
      {
        question: '遥控器换了电池仍然没反应怎么办？',
        answer: '先观察指示灯，再检查接收器和控制器是否通电。若墙壁开关也不能控制，问题更可能在控制器、电机或门体侧。',
      },
      {
        question: '控制器没反应就一定要更换吗？',
        answer: '不一定。保险、接线端子、供电和部分元件故障可能可以维修；确认线路板损坏或维修不稳定时再更换。',
      },
      {
        question: '旧遥控器丢了还能重新配吗？',
        answer: '通常需要查看接收器或控制器型号，确认频率和编码方式后再判断。部分系统可直接在接收器端重新学习。',
      },
    ],
  },
  {
    slug: 'motor-limit-repair',
    name: '电机与限位维修',
    navLabel: '电机 / 限位',
    eyebrow: '电机、限位与行程',
    title: '枣强卷帘门电机维修与限位调试',
    description:
      '排查卷帘门电机嗡响不转、完全无反应、只能上不能下、行程不到位和自动回弹。根据供电、控制、负载和限位状态判断维修、调试或更换。',
    directAnswer:
      '电机嗡响、无反应或行程不准，需要把供电、控制器、电容、刹车、门体负载和上下限位分开检查。限位跑偏可以调试；电容、线路或刹车故障可按实际情况维修；确认电机本体损坏后再更换。',
    published: '2026-08-04',
    updated: '2026-08-04',
    videoGuide: {
      eyebrow: '故障诊断实拍',
      title: '限位调了没反应、位置乱跑或自动溜车怎么办？',
      description:
        '用71秒实拍区分轨道阻力、限位滑扣、皇冠轮打滑和门体自动下滑，先判断是否必须立即停用。',
      href: '/faq/roller-door-limit-adjustment-not-working',
      linkText: '查看限位故障视频 FAQ',
      image: {
        src: '/images/faq/roller-door-limit-adjustment-not-working/poster.jpg',
        alt: '卷帘门无人操作却自行下滑的限位故障实拍画面',
      },
    },
    heroImage: {
      src: '/images/cases/xintiandi-underground-garage-tubular-motor/motor-installation.webp',
      alt: '枣强新天地地下车库卷帘门管状电机安装调试现场',
      position: 'center 45%',
    },
    scope: [
      '电机通电嗡响但门体不动',
      '遥控和墙壁开关操作后均无反应',
      '只能上升不能下降或方向异常',
      '上升不到顶、下降不到底或留缝',
      '限位跑偏、自动回弹和停止位置变化',
      '管状电机、外挂电机检测与更换',
    ],
    symptoms: [
      {
        question: '电机嗡嗡响，但卷帘门不动',
        answer: '常见原因包括启动电容失效、刹车未释放、门体卡住或负载过重。继续反复通电可能让电机过热。',
      },
      {
        question: '门能上升，但不能下降',
        answer: '需要检查下降控制信号、继电器、线路、下限位以及电机内部方向回路，不能仅凭现象直接判定电机损坏。',
      },
      {
        question: '门每次停止的位置都不一样',
        answer: '可能是限位机构松动、门体打滑、传动部件磨损或遇阻保护触发，需要同时检查行程和机械负载。',
      },
    ],
    process: [
      { title: '确认门体安全', text: '观察是否脱槽、变形或被异物顶住，避免带故障反复运行。' },
      { title: '检查供电控制', text: '确认电源、遥控器、墙壁开关、接收器和控制器输出。' },
      { title: '检测电机负载', text: '检查电容、刹车、传动机构以及门体是否过重或卡滞。' },
      { title: '调试上下限位', text: '在门体运行正常的前提下，重新设定开启和关闭停止位置。' },
      { title: '连续运行复测', text: '多次测试上升、停止、下降，确认无异响、过冲和回弹。' },
    ],
    evidence: {
      label: '图文实拍',
      title: '新天地地下车库卷帘门无反应，更换管状电机',
      description:
        '现场先检查供电、控制和驱动状态，确认原管状电机损坏后拆换适配电机，并重新设定上下行程。',
      href: '/cases/xintiandi-underground-garage-tubular-motor',
      linkText: '查看完整维修过程',
      image: {
        src: '/images/cases/xintiandi-underground-garage-tubular-motor/tubular-motor.webp',
        alt: '地下车库卷帘门待更换的管状电机实拍',
      },
    },
    faqs: [
      {
        question: '电机嗡响不转还能继续按吗？',
        answer: '不建议。持续通电可能造成电机过热，门体卡住时还会加重传动部件损坏，应先停用并检查。',
      },
      {
        question: '卷帘门限位可以自己调吗？',
        answer: '外露且说明清晰的限位机构可以在断电和确保门体安全的前提下小幅调整；管状电机或门轴内部限位建议由师傅处理。',
      },
      {
        question: '行程不准一定是限位器坏了吗？',
        answer: '不一定。门体打滑、链条松动、帘片卡滞和遇阻保护也会改变停止位置，需要先排除机械问题。',
      },
      {
        question: '什么情况下需要更换电机？',
        answer: '确认绕组、电机内部传动或不可修复部件损坏，且供电、控制、门体负载均正常时，再选择适配电机更换。',
      },
    ],
  },
  {
    slug: 'roller-door-repair',
    name: '卷帘门维修',
    navLabel: '卷帘门维修',
    eyebrow: '卷帘门与门体',
    title: '枣强卷帘门维修｜卡住、脱槽、弹簧与门体故障',
    description:
      '枣强县城及周边乡镇卷帘门上门维修，处理门体卡住、帘片脱槽、导轨变形、弹簧断裂、门轴和传动部件故障，并提供安装与保养建议。',
    directAnswer:
      '卷帘门卡住、歪斜或脱槽时不要强拉、强按。先停止运行并清理可见异物，再观察帘片、导轨、门轴和弹簧状态。门体较重，涉及弹簧、门轴、电机或高位拆装时应由专业人员处理。',
    published: '2026-08-04',
    updated: '2026-08-04',
    heroImage: {
      src: '/images/cases/hualian-south-industrial-roller-door/door-overview.webp',
      alt: '枣强门市工业卷帘门现场维修全景',
      position: 'center 48%',
    },
    scope: [
      '卷帘门卡住、上不来或下不去',
      '帘片跑偏、脱槽和门体歪斜',
      '导轨变形、锈蚀或异物阻塞',
      '弹簧断裂、松弛或门体过重',
      '门轴、轴承、链条和传动故障',
      '手动、电动及工业卷帘门安装维修',
    ],
    symptoms: [
      {
        question: '门体卡住，上不来也下不去',
        answer: '先看导轨是否有异物、帘片是否脱槽以及门体是否被物品顶住。电机继续运行时应立即停止操作。',
      },
      {
        question: '卷帘门一边高、一边低',
        answer: '可能是门轴失衡、弹簧受力不一致、连接件断裂或单侧脱槽，需要先固定门体再检查。',
      },
      {
        question: '运行时有空转声，门体却不动',
        answer: '控制和电机可能仍在工作，但链条、齿轮或门轴传动中断，应停止空转并检查传动机构。',
      },
    ],
    process: [
      { title: '远程了解现象', text: '说明门体类型、尺寸、故障方向和现场是否影响车辆或营业。' },
      { title: '固定并检查门体', text: '先排除坠落、脱槽和弹簧张力风险，再检查导轨与门轴。' },
      { title: '定位故障部位', text: '区分门体、导轨、弹簧、门轴、传动、电机和控制问题。' },
      { title: '维修与校正', text: '复位门体、校正导轨或更换确认损坏的适配部件。' },
      { title: '升降与停止测试', text: '检查门体平衡、运行轨迹、异响和关闭位置后交付。' },
    ],
    evidence: {
      label: '门市实拍',
      title: '工业卷帘门电机空转，检查确认传动链条折断',
      description:
        '控制信号和电机运转正常，但动力没有传到门轴。更换链条、调整松紧并反复测试后，门体恢复正常升降。',
      href: '/cases/hualian-south-industrial-roller-door',
      linkText: '查看图文案例',
      image: {
        src: '/images/cases/hualian-south-industrial-roller-door/chain-repair.webp',
        alt: '工业卷帘门传动链条维修实拍',
      },
    },
    faqs: [
      {
        question: '卷帘门卡住后可以用力拉下来吗？',
        answer: '不建议。强拉可能让帘片进一步变形、脱槽或突然坠落，应先检查异物并停止电机操作。',
      },
      {
        question: '卷帘门弹簧断了可以自己换吗？',
        answer: '不建议。弹簧承受较大张力，拆装时存在回弹和门体坠落风险，需要专用工具并先固定门体。',
      },
      {
        question: '门体脱槽后还能继续开关吗？',
        answer: '不能继续运行。应先切断或停止控制，避免帘片卷入门轴、导轨撕裂或门体掉落。',
      },
      {
        question: '维修前能直接确定费用吗？',
        answer: '需要先确认门体类型、尺寸、故障部位和配件规格。检测后说明处理方案，价格透明；不修不收费。',
      },
    ],
  },
];

export const SERVICE_PAGE_LINKS = SERVICE_PAGES.map(({ slug, navLabel }) => ({
  href: `/services/${slug}`,
  label: navLabel,
}));

export function getServicePageBySlug(slug) {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
