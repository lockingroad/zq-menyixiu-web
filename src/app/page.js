import Image from 'next/image';
import Link from 'next/link';
import {
  BRAND_NAME,
  DOUYIN_URL,
  HOME_FAQ_SLUGS,
  HOME_SERVICE_GROUPS,
  PHONE,
  PHONE_DISPLAY,
  SERVICE_PROMISES,
  SERVICE_RESPONSE_NOTE,
  SERVICE_RESPONSE_TEXT,
  douyinProfile,
  repairCases,
} from '@/lib/config';
import { getSortedPostsData } from '@/lib/markdown';
import { SERVICE_PAGE_LINKS } from '@/lib/service-pages';

// 首页规范链接，仅指向自身，不污染子路由
export const metadata = {
  alternates: {
    canonical: '/',
  },
};

function HomeCase({ item }) {
  const heroImage = item.images[0];

  return (
    <Link href={`/cases/${item.slug}`} className="home-case">
      <div className="home-case-image">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="home-case-content">
        <p className="home-case-meta">{item.location} · {item.date}</p>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <span>查看图文详情 <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

export default function Home() {
  const postsBySlug = new Map(
    getSortedPostsData().map((post) => [post.slug, post]),
  );
  const homePosts = HOME_FAQ_SLUGS
    .map((slug) => postsBySlug.get(slug))
    .filter(Boolean);
  const featuredCases = repairCases
    .filter((item) => item.featured && item.slug && item.images?.length > 0)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 2);
  const heroPromises = [SERVICE_RESPONSE_TEXT, ...SERVICE_PROMISES].join(' · ');

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img
            src="/images/hero-bg.png"
            alt="枣强卷帘门维修现场"
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-brand">{BRAND_NAME}</p>
          <h1>
            枣强卷帘门安装维修
            <span>本地师傅快速响应</span>
          </h1>
          <p className="hero-summary">
            刘金灿师傅从业20年，服务枣强县城及大营、恩察、马屯、王常等周边乡镇。
          </p>
          <p className="hero-promise">{heroPromises}</p>
          <p className="hero-note">{SERVICE_RESPONSE_NOTE}。</p>
          <div className="hero-cta-group">
            <a href={`tel:${PHONE}`} className="btn-hero-primary" id="hero-call-btn">
              拨打 {PHONE_DISPLAY}
            </a>
            <a href="#knowledge" className="btn-hero-secondary">
              先看常见故障 <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="knowledge section" id="knowledge">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">常见故障</p>
            <h2>卷帘门出了什么问题？</h2>
            <p>先根据现象做安全判断；涉及电机、弹簧或门轴时，请勿强行操作。</p>
          </div>
          <div className="home-faq-list">
            {homePosts.map(({ slug, title, excerpt }, index) => (
              <Link href={`/faq/${slug}`} key={slug} className="home-faq-item">
                <span className="home-faq-number">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{excerpt}</p>
                </div>
                <span className="home-faq-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <div className="section-action">
            <Link href="/faq" className="btn-outline">查看全部常见问题 →</Link>
          </div>
        </div>
      </section>

      <section className="case-feed section" id="cases">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">现场实拍</p>
            <h2>真实维修案例</h2>
            <p>地点仅展示到小区或区域，照片和处理过程均来自真实上门记录。</p>
          </div>
          <div className="home-cases-grid">
            {featuredCases.map((item) => (
              <HomeCase key={item.slug} item={item} />
            ))}
          </div>
          <div className="section-action">
            <Link href="/cases" className="btn-outline">查看全部维修案例 →</Link>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">主营服务</p>
            <h2>从门体到控制系统，一次说明白</h2>
            <p>家庭、门市、企业、小区和农村场景均可先电话说明门体类型与故障现象。</p>
          </div>
          <div className="service-groups">
            {HOME_SERVICE_GROUPS.map((group, index) => (
              <div className="service-group" key={group.title}>
                <span className="service-group-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
          <nav className="home-service-links" aria-label="服务详情页">
            {SERVICE_PAGE_LINKS.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="trust section" id="trust">
        <div className="container">
          <div className="trust-content">
            <div className="trust-info">
              <p className="section-kicker">服务由谁提供</p>
              <h2>刘金灿｜{BRAND_NAME}</h2>
              <p>
                从业20年，持续记录枣强本地卷帘门、车库门、伸缩门和门禁道闸维修过程。
                公开内容既有现场维修，也有遥控配码、限位调试和日常维护经验。
              </p>
              <ul className="trust-facts" aria-label="服务信息">
                <li><strong>20年</strong><span>维修经验</span></li>
                <li><strong>{douyinProfile.works}</strong><span>公开作品</span></li>
                <li><strong>同号</strong><span>电话与微信</span></li>
                {SERVICE_PROMISES.map((promise) => (
                  <li key={promise}><strong>承诺</strong><span>{promise}</span></li>
                ))}
              </ul>
              <div className="trust-actions">
                <a href={`tel:${PHONE}`} className="btn-hero-primary">
                  拨打 {PHONE_DISPLAY}
                </a>
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
            </div>
            <div className="trust-image-wrapper">
              <div className="trust-image-frame">
                <img
                  src="/images/douyin-profile.jpg"
                  alt={`${BRAND_NAME}抖音主页 - 刘金灿师傅`}
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
