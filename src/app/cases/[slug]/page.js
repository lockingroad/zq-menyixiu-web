import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PHONE,
  PHONE_DISPLAY,
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
    title: `${repairCase.title}维修案例 | 枣强门壹修`,
    description: repairCase.desc,
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      title: `${repairCase.title}维修案例 | 枣强门壹修`,
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
          name: '枣强门壹修',
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
        name: '枣强工业卷帘门上门维修',
        serviceType: '工业卷帘门维修',
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
          <span className="case-feed-tag">{repairCase.tag}</span>
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
              <h2>点击后只有空转声，门体没有反应</h2>
              <p>{repairCase.customerReport}</p>
            </section>

            <section className="case-detail-section">
              <p className="case-detail-kicker">02 · 现场检查</p>
              <h2>从控制、电机到传动机构逐项排查</h2>
              <p>{repairCase.inspection}</p>
            </section>

            <section className="case-detail-section">
              <p className="case-detail-kicker">03 · 维修处理</p>
              <h2>更换传动链条并重新调试</h2>
              <p>{repairCase.repairProcess}</p>
            </section>

            <section className="case-detail-section case-detail-result">
              <p className="case-detail-kicker">04 · 处理结果</p>
              <h2>卷帘门恢复正常升降</h2>
              <p>{repairCase.result}</p>
            </section>

            <section className="case-detail-section">
              <p className="case-detail-kicker">现场照片</p>
              <h2>设备检查与维修过程</h2>
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
              <h2>出现“电机响、门不动”时怎么处理？</h2>
              <p>
                先停止反复操作，避免电机持续空转或传动部件进一步受损。工业卷帘门门体较重，
                不建议自行拆卸电机、链条或门轴；可记录故障现象，并联系专业人员现场检查。
              </p>
            </section>

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
          </div>

          <aside className="case-detail-contact" aria-label="联系门壹修">
            <p className="case-detail-kicker">枣强本地上门</p>
            <h2>门壹修</h2>
            <p>
              卷帘门、车库门、工业卷帘门等安装维修。电话与微信同号，沟通时可说明门体类型和故障现象。
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
