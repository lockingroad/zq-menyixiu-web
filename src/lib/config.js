export const PHONE = '13784884521';
export const PHONE_DISPLAY = '137-8488-4521';
export const BRAND_NAME = '枣强门壹修';
export const SERVICE_RESPONSE_TEXT = '通常约30分钟响应';
export const SERVICE_RESPONSE_NOTE = '实际响应及到达时间以距离和当时工单为准';
export const SERVICE_PROMISES = ['价格透明', '不修不收费'];
export const HOME_FAQ_SLUGS = [
  'remote-failure',
  'door-stuck',
  'motor-humming',
  'auto-rebound',
  'spring-broken',
  'rail-rust',
];
export const DOUYIN_URL = 'https://www.douyin.com/user/MS4wLjABAAAAvm4675WrByGA48-Jjs0IMBvTvcE6clOozEzRYH8ENsE?from_tab_name=main';

export const douyinProfile = {
  accountName: BRAND_NAME,
  douyinId: '78035798381',
  works: '90+',
  fans: '1400+',
  likes: '3300+',
};

export const douyinTopics = [
  {
    title: '真实维修现场',
    desc: '持续更新枣强本地卷帘门、防盗门、电动推拉门、伸缩门、道闸杆等真实上门维修记录。',
  },
  {
    title: '常见故障排查',
    desc: '覆盖卷帘门上升不到位、下降留缝、门体卡住、电机异响、车库门误开等高频问题。',
  },
  {
    title: '实用操作技巧',
    desc: '包括学习码和对拷遥控配对、旧码清除、换锁维修、门体日常保养等家用场景内容。',
  },
];

// 真实上门维修记录（按日期倒序，最新在前）。
// 已剔除金额与客户来源，仅保留门类、地点、故障与处理。
// 文案按“故障现象 → 判断 → 处理”改写，方便客户阅读。
// 地点命名规范与添加流程见：docs/添加维修案例说明.md（添加前须检索已有小区名，避免拆成多个导航项）
export const repairCases = [
  // —— 2026-07-20 ~ 07-26 ——
  {
    slug: 'xintiandi-underground-garage-tubular-motor',
    featured: true,
    badges: ['新案例', '图文实拍'],
    date: '2026-07-26',
    tag: '管状电机',
    location: '新天地',
    title: '地下车库卷帘门无反应，更换管状电机',
    desc: '新天地地下车库用户反映卷帘门操作后没有反应。上门检查确认原管状电机损坏，拆换适配电机并重新接线、调整上下行程，多次测试后卷帘门恢复正常启停。',
    customerReportTitle: '操作后卷帘门没有反应',
    customerReport:
      '用户反馈地下车库卷帘门突然没反应，按下控制后门体没有升降动作，影响车辆正常进出，希望尽快上门排查处理。',
    inspectionTitle: '确认原管状电机已经损坏',
    inspection:
      '现场检查卷帘门的供电、控制与驱动状态后，确认原管状电机损坏，无法继续带动卷轴和门体运行，需要更换适配的新电机。',
    repairTitle: '更换管状电机并重新设定行程',
    repairProcess:
      '拆开卷帘门传动部位并取出旧管状电机，更换并固定适配的新电机，完成线路连接；随后重新调整上、下行程位置，并反复进行升降与停止测试。',
    resultTitle: '地下车库卷帘门恢复正常启停',
    result:
      '更换和调试完成后，卷帘门可以正常响应控制，上升、下降和停止位置准确，现场交付用户使用。',
    galleryTitle: '管状电机与现场更换过程',
    safetyTitle: '卷帘门完全没反应时怎么处理？',
    safetyText:
      '可先确认车库是否正常供电、遥控器或墙壁开关是否有明显异常。若门体仍无动作，不要反复通电或自行拆卸卷轴；管状电机安装在门轴内部，应由专业人员现场检测后再维修或更换。',
    serviceName: '枣强地下车库卷帘门管状电机更换',
    serviceType: '车库卷帘门管状电机维修',
    douyinUrl: 'https://v.douyin.com/zyMRwnGMVN0/',
    images: [
      {
        src: '/images/cases/xintiandi-underground-garage-tubular-motor/xintiandi-entrance.webp',
        alt: '枣强新天地地下车库卷帘门上门维修地点',
      },
      {
        src: '/images/cases/xintiandi-underground-garage-tubular-motor/tubular-motor.webp',
        alt: '地下车库卷帘门待更换的管状电机',
      },
      {
        src: '/images/cases/xintiandi-underground-garage-tubular-motor/motor-installation.webp',
        alt: `${BRAND_NAME}师傅现场安装卷帘门管状电机`,
      },
      {
        src: '/images/cases/xintiandi-underground-garage-tubular-motor/repaired-door.webp',
        alt: '新天地地下车库卷帘门维修完成效果',
      },
    ],
  },
  // —— 2026-07-13 ~ 07-19 ——
  {
    date: '2026-07-17',
    tag: '车库门',
    location: '福瑞祥',
    title: '车库门轴承异响除锈保养',
    desc: '业主反映车库门运行异响、卡顿。上门检查为轴承磨损并有锈蚀，更换轴承并除锈润滑后，门体升降平稳无异响。',
  },
  {
    date: '2026-07-16',
    tag: '电机更换',
    location: '福瑞祥',
    title: '车库门电机突然不转更换',
    desc: '业主反映车库门电机突然损坏、无法运行。现场确认电机已失效，更换电机并调试到位后，车库门升降恢复正常。',
  },
  {
    date: '2026-07-15',
    tag: '换锁',
    location: '新广小区',
    title: '手动车库门锁无钥匙更换',
    desc: '业主反映手动车库门锁原钥匙丢失、无法正常开锁。上门更换适配锁具并调试，门锁开合恢复正常。',
  },
  {
    date: '2026-07-14',
    tag: '控制器',
    location: '帝景城',
    title: '车库门控制器烧毁更换',
    desc: '业主反映车库门按了没反应。检查为控制器烧毁，更换控制器并接线调试后，遥控与启停恢复正常。',
  },
  {
    date: '2026-07-14',
    tag: '门市门',
    location: '材料街',
    title: '门市卷帘门弹簧折断更换',
    desc: '店主反映门市卷帘门拉不动、弹力失效。现场判断为弹簧折断，更换新簧并调平衡后，门体收放轻便顺畅。',
  },
  {
    date: '2026-07-13',
    tag: '车库门',
    location: '东瑞小区',
    title: '车库门被卡住调整限位',
    desc: '业主反映车库门升降异常、运行受阻。现场查为门体被卡住导致行程不准，清理障碍并重新调整限位后，启停归位正常。',
  },
  // —— 2026-07-06 ~ 07-12 ——
  {
    date: '2026-07-10',
    tag: '肯德基门',
    location: '恒大小区',
    title: '肯德基门轴承脱落重装',
    desc: '业主反映肯德基门开关异常、门体不稳。检查为底部轴承脱落，卸门重新安装轴承并校准后，门体开合顺畅。',
  },
  {
    date: '2026-07-10',
    tag: '控制器',
    location: '佳润花园小区',
    title: '车库门遥控没反应修控制器',
    desc: '业主反映按遥控车库门完全没反应。检查为控制器保险烧断，更换保险并检测线路后，遥控响应与门体运行恢复正常。',
  },
  {
    date: '2026-07-06',
    tag: '车间大门',
    location: '佳润花园小区',
    title: '小区库房门卡住上下不动复位',
    desc: '佳润花园小区库房反映卷帘门卡住、上不来下不去。现场查为门体脱出导槽，重新顺槽复位入槽后，开关恢复正常。',
  },
  {
    date: '2026-06-26',
    tag: '电机更换',
    location: '福星家园',
    title: '车库门电机损坏更换',
    desc: '业主反映车库门按了不动、电机不转。现场判断为原电机正常使用老化损坏，更换新电机后车库门升降恢复正常。',
  },
  {
    date: '2026-06-25',
    tag: '别墅大门',
    location: '烟草局小区',
    title: '别墅大门下沉开关费力',
    desc: '业主反映别墅大门下沉、开关费力。检查为地轴长期使用磨损致门体下沉，更换新地轴后门体恢复水平、开合顺畅。',
  },
  {
    date: '2026-06-24',
    tag: '车间大门',
    location: '东外环广汇水箱厂',
    title: '车间大门通电后异常反转',
    desc: '厂区反映车间大门通电后异常反转、停不下来。检查为外部变压器送错相序致三相电机反转，且该大门未装限位保护，纠正相序后大门恢复正常启停。',
  },
  {
    date: '2026-06-23',
    tag: '车库门',
    location: '东瑞小区',
    title: '车库门轴承磨损门轴脱落',
    desc: '业主反映车库门运行异响、门轴脱落。检查为轴承自然老化磨损致门轴单边脱落，更换两个新轴承后转动平稳、运行正常。',
  },
  {
    date: '2026-06-23',
    tag: '门市门',
    location: '新天地',
    title: '门市卷帘门被顶出槽',
    desc: '店主反映门市卷帘门卡住、跑偏出槽。上门查看发现门体下方被物品顶住致其脱出导槽，清理障碍后重新顺槽复位，开关恢复正常。',
  },
  {
    date: '2026-06-23',
    tag: '新装',
    location: '王常小区',
    title: '新装手动车库门',
    desc: '业主车库需新装一扇手动卷帘门。现场测量安装并调试到位，手动启停顺畅、限位准确。',
  },
  {
    date: '2026-06-20',
    tag: '车间大门',
    location: '胡仁屯村',
    title: '车间大门卡住推不动',
    desc: '业主反映车间大门突然卡死推不动。上门查看发现地面堆放的料桶顶住门体致其出槽，清理障碍后将门体重新归位入槽，开关恢复正常。',
  },
  {
    date: '2026-06-19',
    tag: '车库门',
    location: '福瑞小区',
    title: '卷帘门下落时顶出槽',
    desc: '业主反映卷帘门下落时卡顿、跑偏。现场查为门体下落过程中顶出导槽，重新顺槽复位并调整运行轨迹，下落顺畅无异响。',
  },
  {
    date: '2026-06-19',
    tag: '车库门',
    location: '裕华新区',
    title: '车库门升到一半突然失灵',
    desc: '业主反映车库门升到一半突然不动了。检查发现门体上升时线缆被缠折断电，重新接好线缆并固定走线，门体恢复升降。',
  },
  {
    date: '2026-06-18',
    tag: '电机更换',
    location: '东瑞小区',
    title: '车库门能升不能降',
    desc: '业主反映车库门能上去却下不来。现场判断为电机内部损坏（正常使用老化），更换中档电机后，上升下降均恢复正常。',
  },
  {
    date: '2026-06-18',
    tag: '车库门',
    location: '丽景澜湾',
    title: '车库门转动异响、抖动',
    desc: '业主反映车库门运行时异响明显、抖动。拆检发现三个轴承磨损老化，逐个更换新轴承后转动平稳无异响。',
  },
  {
    date: '2026-06-17',
    tag: '车库门',
    location: '丽景澜湾',
    title: '卷帘门下落顶出槽关不严',
    desc: '业主反映卷帘门关不严、底部跑偏。现场查为下落时顶出槽，调整限位后门体归位，关闭严丝合缝。',
  },
  {
    date: '2026-06-16',
    tag: '车库门',
    location: '康欣国际',
    title: '铺砖后车库门关不到位',
    desc: '业主刚铺完地板砖，地面抬高了一截，车库门按原限位关不到位。上门重新标定上下限位，门体启停归位正常。',
  },
  {
    date: '2026-06-16',
    tag: '车库门',
    location: '福祥小区',
    title: '车库门运行卡顿费力',
    desc: '业主反映车库门升降卡顿、发沉。拆检为轴承正常使用磨损，更换轴承后运行轻便顺畅。',
  },
  {
    date: '2026-06-14',
    tag: '门市门',
    location: '城市花园商业街',
    title: '门市卷帘门卡住收不进去',
    desc: '业主反映门市门卡住不动、行程跑偏收到了门体里面。现场重新调整行程限位，门体收放顺畅归位。',
  },
  {
    date: '2026-06-13',
    tag: '门市门',
    location: '马屯门市',
    title: '门市门一边高一边低',
    desc: '业主反映门市门歪斜、一边高一边低。检查为门轴水平失衡，拆下门轴重新调平安装，门体恢复水平、开合正常。',
  },
  {
    slug: 'hualian-south-industrial-roller-door',
    featured: true,
    badges: ['新案例', '图文实拍'],
    date: '2026-06-07',
    tag: '工业卷帘门',
    location: '枣强门市',
    title: '工业卷帘门点击空转、门体无反应',
    desc: '门市客户反映工业卷帘门点击后只听到设备空转，门体没有反应。上门检查确认传动链条折断，更换链条并调整松紧、反复调试后，卷帘门恢复正常升降。',
    customerReport:
      '客户反馈工业卷帘门突然没反应，点击控制后设备有空转声，但门体不上升也不下降，需要尽快恢复门市正常使用。',
    inspection:
      '现场检查电机与传动系统：控制信号和电机运转存在，但动力没有传递到门轴。继续检查后确认传动链条已经折断，这是电机空转、门体不动作的直接原因。',
    repairProcess:
      '拆检传动部位，更换适配的传动链条，重新调整链条松紧和运行状态；随后多次测试卷帘门上升、下降及停止位置，确认传动恢复稳定。',
    result:
      '维修调试完成后，工业卷帘门可以正常响应控制，升降顺畅，现场交付客户使用。',
    customerReportTitle: '点击后只有空转声，门体没有反应',
    inspectionTitle: '从控制、电机到传动机构逐项排查',
    repairTitle: '更换传动链条并重新调试',
    resultTitle: '卷帘门恢复正常升降',
    galleryTitle: '设备检查与维修过程',
    safetyTitle: '出现“电机响、门不动”时怎么处理？',
    safetyText:
      '先停止反复操作，避免电机持续空转或传动部件进一步受损。工业卷帘门门体较重，不建议自行拆卸电机、链条或门轴；可记录故障现象，并联系专业人员现场检查。',
    serviceName: '枣强工业卷帘门上门维修',
    serviceType: '工业卷帘门维修',
    images: [
      {
        src: '/images/cases/hualian-south-industrial-roller-door/door-overview.webp',
        alt: '枣强门市工业卷帘门现场检修全景',
      },
      {
        src: '/images/cases/hualian-south-industrial-roller-door/onsite-repair.webp',
        alt: `${BRAND_NAME}师傅在门市现场检修工业卷帘门`,
      },
      {
        src: '/images/cases/hualian-south-industrial-roller-door/motor-and-drive.webp',
        alt: '工业卷帘门电机与传动机构检查现场',
      },
      {
        src: '/images/cases/hualian-south-industrial-roller-door/chain-repair.webp',
        alt: '工业卷帘门传动链条维修过程',
      },
    ],
    douyinUrl: 'https://v.douyin.com/p4_xke7yvjM/',
  },
  {
    date: '2026-06-06',
    tag: '车库门',
    location: '林业局小区',
    title: '卷帘门下落太快、关不严',
    desc: '业主反映卷帘门下落过快、关不严实。检查为上方弹簧松弛失去平衡力，重新紧簧调整后，门体下落平稳、关闭到位。',
  },
  {
    date: '2026-06-04',
    tag: '车库门',
    location: '建牧佳苑',
    title: '车库门开过头跑出槽',
    desc: '业主反映车库门一开就跑偏。现场查为开过头冲出导槽，重新顺槽复位并提示注意行程，开关恢复正常。',
  },
  {
    date: '2026-06-03',
    tag: '车间大门',
    location: '富瑞玻璃钢厂',
    title: '车间大门被三轮撞出槽',
    desc: '厂区反映车间大门被三轮车撞后推不动。现场查为撞击致门体出槽，重新复位入槽并检查导轨，开关恢复顺畅。',
  },
  {
    date: '2026-06-02',
    tag: '车间大门',
    location: '恒润东厂',
    title: '车间大门突然停转',
    desc: '厂区反映车间大门通电后不动作。检查为 380V 通电致控制器烧毁，更换新控制器后大门恢复运行。',
  },
  {
    date: '2026-06-01',
    tag: '车库门',
    location: '多福公馆',
    title: '车库门被车撞后变形',
    desc: '业主倒车撞到车库门致合页损坏、门体变形。现场焊接修复合页并校正门体，开关恢复正常。',
  },
  {
    date: '2026-06-01',
    tag: '控制器',
    location: '花园新区',
    title: '车库门按了没反应',
    desc: '业主反映车库门遥控按了不动。检查为控制器连点烧毁、保险熔断，修复保险后控制器恢复正常响应。',
  },
  {
    date: '2026-06-01',
    tag: '伸缩门',
    location: '火车站货场',
    title: '电动伸缩门雨天突然停转',
    desc: '暴雨天货场电动伸缩门突然停转。现场检查为电机控制线路板进水烧毁，更换线路板后伸缩门恢复正常伸缩运行。',
  },
  {
    date: '2026-05-30',
    tag: '新装',
    location: '枣强三街',
    title: '原有车库无门、新装车库门',
    desc: '业主原车库没有门，需新装一扇。现场测量安装新车库门并调试到位，启停顺畅、限位准确。',
  },
  {
    date: '2026-05-29',
    tag: '卷帘门',
    location: '天天宾馆旁快餐店',
    title: '窗户卷帘门拉不动',
    desc: '店主反映窗户上的手动卷帘门拉不动。检查为门轴使用年限过长磨损卡滞，更换新门轴后卷帘收放顺畅。',
  },
  {
    date: '2026-05-29',
    tag: '电机更换',
    location: '东城雅郡',
    title: '卷帘门电机不转了',
    desc: '业主反映卷帘门按了不动、电机不转。现场判断为电机正常使用老化损坏，更换新电机后卷帘门升降恢复正常。',
  },
  {
    date: '2026-05-28',
    tag: '卷帘门',
    location: '杜烟村',
    title: '手动卷帘门拉不动、簧失效',
    desc: '业主反映手动卷帘门拉不动。检查为旧门拆下的弹簧自然老化失效、上门费力，更换新簧后卷帘升降轻便。',
  },
  {
    date: '2026-05-27',
    tag: '车库门',
    location: '住建局家属院',
    title: '车库门转动不平衡、发晃',
    desc: '业主反映车库门运行时发晃、不平衡。拆检为轴承自然老化磨损，更换轴承后转动平稳、运行安静。',
  },
  {
    date: '2026-05-27',
    tag: '车库门',
    location: '幸福里小区',
    title: '车库门歪斜、开关费力',
    desc: '业主反映车库门歪斜、开关很费劲。现场查为连接销子断裂致门轴单边脱落，更换销子并重新校准门轴，开关恢复正常。',
  },
  {
    date: '2026-05-25',
    tag: '门市门',
    location: '新天地',
    title: '门市门关不严、自动回弹',
    desc: '新天地店主反映门市门关不严、松手就回弹。检查为地簧使用寿命到期、零件老化，更换地簧零件后门体开合到位、定位正常。',
  },
];

export const detailedRepairCases = repairCases.filter((item) => item.slug);

export function getRepairCaseBySlug(slug) {
  return detailedRepairCases.find((item) => item.slug === slug);
}

export function groupRepairCasesByLocation(cases) {
  const groups = new Map();

  for (const item of cases) {
    const location = item.location || '其他';
    if (!groups.has(location)) groups.set(location, []);
    groups.get(location).push(item);
  }

  return [...groups.entries()]
    .map(([location, items]) => {
      const sortedItems = [...items].sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          String(b.date).localeCompare(String(a.date)),
      );

      return {
        location,
        id: `loc-${String(location).replace(/\s+/g, '')}`,
        items: sortedItems,
        count: sortedItems.length,
        featured: sortedItems.some((item) => item.featured),
      };
    })
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.count - a.count ||
        a.location.localeCompare(b.location, 'zh-CN'),
    );
}

export const serviceAreas = [
  '枣强县城',
  '大营镇',
  '恩察镇',
  '加会镇',
  '马屯镇',
  '肖张镇',
  '张秀屯镇',
  '新屯镇',
  '王均乡',
  '唐林镇',
  '王常乡',
];

export const services = [
  {
    icon: '🚪',
    title: '卷帘门维修安装',
    desc: '卷帘门电机异响、不转、限位失灵、帘片脱槽、导轨变形等故障现场维修，及新门安装调试。',
  },
  {
    icon: '🏭',
    title: '工业卷帘门维修安装',
    desc: '厂区、车间大型工业卷帘门安装与维修，处理门体卡住、下降留缝、电机无力等高频问题。',
  },
  {
    icon: '🍔',
    title: '门市肯德基门维修安装',
    desc: '门市、商铺肯德基门（铝合金平开门）安装维修，解决合页松动、闭门器失灵、门体下垂等问题。',
  },
  {
    icon: '🛡️',
    title: '防盗门安装维修',
    desc: '防盗门安装调试、锁具更换、门体变形修复，兼顾家庭与门市场景，兼顾安全与密封。',
  },
  {
    icon: '🔐',
    title: '智能锁安装',
    desc: '各类智能锁（指纹、密码、刷卡）安装与调试，含旧锁拆除、新锁开孔、联动设置。',
  },
  {
    icon: '🏘️',
    title: '小区门禁维修安装',
    desc: '小区单元门、闸机门禁系统安装维修，处理刷卡无反应、门常开、落锁异常等故障。',
  },
  {
    icon: '🧲',
    title: '磁吸锁维修',
    desc: '电磁锁（磁吸锁）吸力不足、常开不落锁、控制器失灵等故障排查与维修更换。',
  },
  {
    icon: '😊',
    title: '人脸识别维修安装',
    desc: '门禁、闸机人脸识别设备安装与维修，处理识别失败、设备离线、数据同步异常等问题。',
  },
  {
    icon: '🚧',
    title: '小区自抬杆维修安装',
    desc: '小区、停车场道闸自抬杆安装维修，处理杆体卡顿、起落不到位、限位失灵等故障。',
  },
  {
    icon: '🚗',
    title: '车牌识别维修安装',
    desc: '停车场车牌识别系统安装与维修，含相机调试、道闸联动、识别率优化及异常排查。',
  },
  {
    icon: '🏡',
    title: '农村自建房大门维修安装',
    desc: '农村自建房、庭院大门维修安装，处理门体变形、合页损坏、开关不畅等问题，上门服务。',
  },
];

// 首页只展示四组清晰的业务方向；完整服务清单仍由 services 提供给结构化数据。
export const HOME_SERVICE_GROUPS = [
  {
    title: '卷帘门与门体',
    items: ['卷帘门', '工业卷帘门', '车库门', '肯德基门', '防盗门', '农村大门'],
  },
  {
    title: '电机、遥控与控制',
    items: ['电机异响或不转', '遥控器与控制器', '限位与行程', '门体卡住或脱槽'],
  },
  {
    title: '门禁与锁具',
    items: ['智能锁', '磁吸锁', '人脸识别', '小区门禁'],
  },
  {
    title: '道闸与车辆出入',
    items: ['道闸自抬杆', '车牌识别', '电动伸缩门', '出入口联动设备'],
  },
];
