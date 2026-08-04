import Link from 'next/link';
import {
  BRAND_NAME,
  repairCases,
  groupRepairCasesByLocation,
  DOUYIN_URL,
  PHONE,
  PHONE_DISPLAY,
} from '@/lib/config';

const SITE_URL = 'https://menyixiu.cn';

export const metadata = {
  title: `全部维修案例 - 按小区查看 | ${BRAND_NAME}`,
  description:
    '枣强本地真实上门维修案例，按小区/地点分类汇总，覆盖东瑞、福瑞祥、佳润花园、帝景城等，卷帘门、车库门、伸缩门、道闸等持续更新。',
  alternates: {
    canonical: '/cases',
  },
};

function CaseCard({ item }) {
  const content = (
    <>
      <div className="case-feed-tags">
        <span className="case-feed-tag">{item.tag}</span>
        {item.badges?.map((badge) => (
          <span
            className={`case-feed-status-tag${badge === '新案例' ? ' case-feed-status-tag--new' : ''}`}
            key={badge}
          >
            {badge}
          </span>
        ))}
      </div>
      <h3>{item.title}</h3>
      <div className="cases-card-meta">
        📍 {item.location} · 📅 {item.date}
      </div>
      <p>{item.desc}</p>
      {item.slug && <span className="case-feed-detail-link">查看图文详情 →</span>}
    </>
  );

  if (item.slug) {
    return (
      <Link href={`/cases/${item.slug}`} className="case-feed-card case-feed-card--linked">
        {content}
      </Link>
    );
  }

  return <article className="case-feed-card">{content}</article>;
}

export default function CasesPage() {
  const groups = groupRepairCasesByLocation(repairCases);
  const total = repairCases.length;

  // ItemList：按小区分块，便于检索「某小区维修」类意图
  const casesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${BRAND_NAME}全部真实维修案例`,
    description: '按小区/地点分类的枣强本地上门维修记录',
    url: `${SITE_URL}/cases`,
    about: {
      '@id': `${SITE_URL}/#business`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: groups.length,
      itemListElement: groups.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `枣强${g.location}维修案例`,
        url: `${SITE_URL}/cases#${g.id}`,
        description: `${g.location}上门维修记录共${g.count}条`,
      })),
    },
  };

  return (
    <section className="section cases-page" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(casesJsonLd) }}
        />

        <nav className="cases-breadcrumb" aria-label="面包屑">
          <Link href="/">首页</Link>
          <span aria-hidden="true"> / </span>
          <span>全部维修案例</span>
        </nav>

        <header className="cases-page-header">
          <h1 className="section-title" style={{ textAlign: 'left' }}>
            全部真实维修案例
          </h1>
          <div className="section-divider" style={{ margin: '16px 0 20px' }} />
          <p className="cases-page-intro">
            枣强本地真实上门记录，按<strong>小区 / 地点</strong>分类，共 {total} 条、覆盖 {groups.length} 个地点。
            点击左侧（手机端上方）地点可快速跳转；电话{' '}
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>。
          </p>
        </header>

        <div className="cases-layout">
          {/* 左侧 / 顶部：按小区导航 */}
          <aside className="cases-nav" aria-label="按小区筛选案例">
            <div className="cases-nav-inner">
              <p className="cases-nav-title">按小区 / 地点</p>
              <ul className="cases-nav-list">
                {groups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="cases-nav-link">
                      <span className="cases-nav-name">{g.location}</span>
                      <span className="cases-nav-count">{g.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 右侧：各小区案例区块 */}
          <div className="cases-main">
            {groups.map((g) => (
              <section
                key={g.id}
                id={g.id}
                className="cases-group"
                aria-labelledby={`${g.id}-title`}
              >
                <header className="cases-group-header">
                  <h2 id={`${g.id}-title`} className="cases-group-title">
                    📍 {g.location}
                    <span className="cases-group-sub">枣强 · 上门维修案例</span>
                  </h2>
                  <span className="cases-group-badge">{g.count} 条记录</span>
                </header>
                <div className="case-feed-grid cases-group-grid">
                  {g.items.map((item) => (
                    <CaseCard
                      key={`${item.date}-${item.location}-${item.title}`}
                      item={item}
                    />
                  ))}
                </div>
              </section>
            ))}

            <div className="case-feed-cta">
              <a
                href={DOUYIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
                style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
              >
                去抖音查看更多真实案例 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
