import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BRAND_NAME,
  PHONE,
  PHONE_DISPLAY,
  SERVICE_PROMISES,
  SERVICE_RESPONSE_NOTE,
  SERVICE_RESPONSE_TEXT,
  detailedRepairCases,
  getRepairCaseBySlug,
} from '@/lib/config';

const SITE_URL = 'https://menyixiu.cn';

export function generateStaticParams() {
  return detailedRepairCases.map((repairCase) => ({
    slug: repairCase.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const repairCase = getRepairCaseBySlug(slug);

  if (!repairCase) {
    return {};
  }

  const pagePath = `/cases/${repairCase.slug}`;

  return {
    title: `${repairCase.title}维修案例 | ${BRAND_NAME}`,
    description: repairCase.desc,
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      title: `${repairCase.title}维修案例 | ${BRAND_NAME}`,
      description: repairCase.desc,
      url: pagePath,
      type: 'article',
      images: repairCase.images.map((image) => ({
        url: image.src,
        alt: image.alt,
      })),
    },
  };
}

export default async function CaseDetailPage({ params }) {
  const { slug } = await params;
  const repairCase = getRepairCaseBySlug(slug);

  if (!repairCase) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/cases/${repairCase.slug}`;
  const caseJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: repairCase.title,
        description: repairCase.desc,
        datePublished: repairCase.date,
        inLanguage: 'zh-CN',
        mainEntityOfPage: pageUrl,
        image: repairCase.images.map((image) => `${SITE_URL}${image.src}`),
        author: {
          '@type': 'Person',
          name: '刘金灿',
          jobTitle: '门类安装维修技师',
        },
        publisher: {
          '@type': 'Organization',
          name: BRAND_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logo.jpg`,
          },
        },
        about: {
          '@id': `${SITE_URL}/#business`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: repairCase.serviceName || `枣强${repairCase.tag}上门维修`,
        serviceType: repairCase.serviceType || `${repairCase.tag}维修`,
        description: repairCase.desc,
        areaServed: {
          '@type': 'City',
          name: '河北省衡水市枣强县',
        },
        provider: {
          '@id': `${SITE_URL}/#business`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '维修案例',
            item: `${SITE_URL}/cases`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: repairCase.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="section case-detail-page">
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }}
        />

        <nav className="cases-breadcrumb" aria-label="面包屑">
          <Link href="/">首页</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/cases">维修案例</Link>
          <span aria-hidden="true"> / </span>
          <span>案例详情</span>
        </nav>

        <header className="case-detail-header">
          <div className="case-feed-tags case-detail-tags">
            <span className="case-feed-tag">{repairCase.tag}</span>
            {repairCase.badges?.map((badge) => (
              <span
                className={`case-feed-status-tag${badge === '新案例' ? ' case-feed-status-tag--new' : ''}`}
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
          <h1>{repairCase.title}</h1>
          <p className="case-detail-lead">{repairCase.desc}</p>
          <div className="case-detail-meta" aria-label="案例基本信息">
            <span>📍 {repairCase.location}</span>
            <span>📅 {repairCase.date}</span>
            <span>🧰 上门维修</span>
          </div>
        </header>

        <figure className="case-detail-hero">
          <Image
            src={repairCase.images[0].src}
            alt={repairCase.images[0].alt}
            width={896}
            height={2000}
            sizes="(min-width: 900px) 760px, 100vw"
            priority
          />
          <figcaption>{repairCase.images[0].alt}</figcaption>
        </figure>

        <div className="case-detail-layout">
          <div className="case-detail-content">
            <section className="case-detail-section">
              <p className="case-detail-kicker">01 · 客户反馈</p>
              <h2>{repairCase.customerReportTitle || '客户反馈的故障现象'}</h2>
              <p>{repairCase.customerReport}</p>
            </section>

            <section className="case-detail-section">
              <p className="case-detail-kicker">02 · 现场检查</p>
              <h2>{repairCase.inspectionTitle || '现场检查与故障判断'}</h2>
              <p>{repairCase.inspection}</p>
            </section>

            <section className="case-detail-section">
              <p className="case-detail-kicker">03 · 维修处理</p>
              <h2>{repairCase.repairTitle || '现场维修与调试'}</h2>
              <p>{repairCase.repairProcess}</p>
            </section>

            <section className="case-detail-section case-detail-result">
              <p className="case-detail-kicker">04 · 处理结果</p>
              <h2>{repairCase.resultTitle || '维修完成并恢复使用'}</h2>
              <p>{repairCase.result}</p>
            </section>

            <section className="case-detail-section">
              <p className="case-detail-kicker">现场照片</p>
              <h2>{repairCase.galleryTitle || '设备检查与维修过程'}</h2>
              <div className="case-detail-gallery">
                {repairCase.images.slice(1).map((image) => (
                  <figure key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={896}
                      height={2000}
                      sizes="(min-width: 900px) 240px, (min-width: 600px) 33vw, 100vw"
                    />
                    <figcaption>{image.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="case-detail-section case-detail-note">
              <h2>{repairCase.safetyTitle || '卷帘门故障时怎么处理？'}</h2>
              <p>{repairCase.safetyText}</p>
            </section>

            {repairCase.douyinUrl && (
              <section className="case-detail-video">
                <div>
                  <p className="case-detail-kicker">原始案例视频</p>
                  <h2>查看本次维修的抖音记录</h2>
                  <p>视频展示以现场实际记录为准，可与本页图文相互核对。</p>
                </div>
                <a
                  href={repairCase.douyinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-secondary"
                >
                  打开抖音视频 →
                </a>
              </section>
            )}
          </div>

          <aside className="case-detail-contact" aria-label={`联系${BRAND_NAME}`}>
            <p className="case-detail-kicker">枣强本地上门</p>
            <h2>{BRAND_NAME}</h2>
            <p>
              卷帘门、车库门、工业卷帘门等安装维修。{SERVICE_RESPONSE_TEXT}，
              {SERVICE_RESPONSE_NOTE}；{SERVICE_PROMISES.join('、')}。电话与微信同号。
            </p>
            <a href={`tel:${PHONE}`} className="btn-call">
              拨打 {PHONE_DISPLAY}
            </a>
            <dl>
              <div>
                <dt>维修师傅</dt>
                <dd>刘金灿</dd>
              </div>
              <div>
                <dt>服务区域</dt>
                <dd>枣强县城及周边乡镇</dd>
              </div>
              <div>
                <dt>本次地点</dt>
                <dd>{repairCase.location}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </article>
  );
}
