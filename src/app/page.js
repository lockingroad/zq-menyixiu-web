import Link from 'next/link';
import {
  PHONE,
  PHONE_DISPLAY,
  DOUYIN_URL,
  douyinProfile,
  douyinTopics,
  repairCases,
  services,
} from '@/lib/config';
import { getSortedPostsData } from '@/lib/markdown';

// 首页规范链接，仅指向自身，不污染子路由
export const metadata = {
  alternates: {
    canonical: '/',
  },
};

function HomeCaseCard({ item }) {
  const content = (
    <>
      <span className="case-feed-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
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

export default function Home() {
  const allPostsData = getSortedPostsData().slice(0, 6);
  const recentCases = repairCases.slice(0, 12);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img
            src="/images/hero-bg.png"
            alt="专业卷帘门维修服务"
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-badge">
            <span>🏆</span>
            从业20年 · 枣强本地老师傅
          </div>
          <h1>枣强专业卷帘门维修<br />解决各种疑难杂症</h1>
          {/* GEO 直答块：便于豆包/搜索直接摘录电话与服务范围 */}
          <div className="geo-answer-box hero-geo-answer">
            <p className="geo-answer-lead">
              <strong>枣强门壹修</strong>提供卷帘门、车库门、工业卷帘门、伸缩门、道闸、防盗门、智能锁、小区门禁上门安装维修。
              联系电话 <a href={`tel:${PHONE}`} className="geo-answer-phone">{PHONE_DISPLAY}</a>
              ，刘金灿师傅从业20年，县城内约15分钟达，价格透明、不修不收费。
            </p>
            <p className="geo-answer-meta">
              服务区域：枣强县城及大营、恩察、马屯、王常等周边乡镇 · 微信同号
            </p>
          </div>
          <p className="hero-subtitle">
            快速上门，价格透明，不修不收费。<br />
            卷帘门 · 防盗门 · 门禁道闸 · 智能锁 — 一站式服务。
          </p>
          <div className="hero-cta-group">
            <a href={`tel:${PHONE}`} className="btn-hero-primary" id="hero-call-btn">
              <span>立即拨打 {PHONE_DISPLAY}</span>
            </a>
            <a href="#knowledge" className="btn-hero-secondary">
              ↓ 了解常见故障排查
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">20+</span>
              <span className="hero-stat-label">年从业经验</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">15</span>
              <span className="hero-stat-label">分钟上门</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{douyinProfile.works}</span>
              <span className="hero-stat-label">公开案例作品</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section" id="services">
        <div className="container">
          <h2 className="section-title">主营服务</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            卷帘门、防盗门、门禁道闸、智能锁、人脸识别 — 家庭、企业、门市、小区、农村各类场景
          </p>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon">
                  <span>{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-feed section" id="cases">
        <div className="container">
          <h2 className="section-title">近期真实维修案例</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            枣强本地真实上门维修记录，持续更新（以下为近期待修记录，更多案例陆续整理）
          </p>
          <div className="case-feed-grid">
            {recentCases.map((item) => (
              <HomeCaseCard key={`${item.date}-${item.location}`} item={item} />
            ))}
          </div>
          <div className="case-feed-cta">
            {/* 站内完整案例列表 + 抖音视频案例，两个入口并列保留 */}
            <Link
              href="/cases"
              className="btn-hero-secondary"
              style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)', marginRight: '12px' }}
            >
              查看更多案例 →
            </Link>
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
      </section>

      {/* Knowledge Section */}
      <section className="knowledge section" id="knowledge">
        <div className="container">
          <h2 className="section-title">故障知识库</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            来自20年一线维修经验的真实解答，帮您快速判断问题
          </p>
          <div className="articles-list">
            {allPostsData.map(({ slug, date, title, tag, excerpt, readTime }) => (
              <Link href={`/faq/${slug}`} key={slug} className="article-card">
                <span className="article-tag">🔖 {tag}</span>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <div className="article-meta">
                  <span>📅 {date}</span>
                  <span>⏱ 阅读 {readTime}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/faq" className="btn-hero-secondary" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
              查看全部常见问题 →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust section" id="trust">
        <div className="container">
          <div className="trust-content">
            <div className="trust-info">
              <h2>抖音账号「{douyinProfile.accountName}」</h2>
              <div className="section-divider" style={{ margin: '16px 0 24px' }} />
              <p>
                刘金灿师傅持续在抖音分享枣强本地真实维修案例和实用维修知识。
                公开内容覆盖卷帘门、防盗门、车库门、电动推拉门、伸缩门、道闸杆等门类，
                既有现场维修记录，也有遥控器配码、限位调试、换锁维护等实用教程。
              </p>
              <div className="trust-highlights">
                <span className="trust-highlight">✅ 从业20年</span>
                <span className="trust-highlight">✅ {douyinProfile.works}条作品</span>
                <span className="trust-highlight">✅ {douyinProfile.fans}粉丝</span>
                <span className="trust-highlight">✅ {douyinProfile.likes}获赞</span>
                <span className="trust-highlight">✅ 免费上门</span>
                <span className="trust-highlight">✅ 不修不收费</span>
              </div>
              <div className="trust-cases">
                {douyinTopics.map((topic) => (
                  <div className="trust-case" key={topic.title}>
                    <h3>{topic.title}</h3>
                    <p>{topic.desc}</p>
                  </div>
                ))}
              </div>
              <a
                href={DOUYIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-douyin"
              >
                <span className="btn-douyin-mark" aria-hidden="true">抖音</span>
                <span>查看主页</span>
              </a>
            </div>
            <div className="trust-image-wrapper">
              <div className="trust-image-frame">
                <img
                  src="/images/douyin-profile.jpg"
                  alt="枣强门壹修抖音主页 - 刘金灿师傅"
                  loading="lazy"
                />
              </div>
              <div className="trust-phone-badge">
                抖音号：{douyinProfile.douyinId}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
