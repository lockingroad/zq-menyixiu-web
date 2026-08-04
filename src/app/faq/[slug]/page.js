import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '@/lib/markdown';
import {
  BRAND_NAME,
  PHONE,
  PHONE_DISPLAY,
  SERVICE_PROMISES,
  SERVICE_RESPONSE_NOTE,
  SERVICE_RESPONSE_TEXT,
  serviceAreas,
} from '@/lib/config';

const SITE_URL = 'https://menyixiu.cn';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({
    slug: s.params.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} - 枣强卷帘门维修`,
    description: postData.excerpt,
    // 每篇 FAQ 的规范链接指向自身，便于 Google 独立收录
    alternates: {
      canonical: `/faq/${slug}`,
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const pageUrl = `${SITE_URL}/faq/${slug}`;
  // 去掉 excerpt 末尾省略号，作直答与 schema 文本
  const directAnswer = String(postData.excerpt || '').replace(/…+$/, '').trim();
  const areaText = serviceAreas.slice(0, 6).join('、');

  // Article + 单条 FAQPage，方便 AI 摘录问答与作者实体
  const faqArticleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: postData.title,
        description: directAnswer,
        datePublished: postData.date,
        dateModified: postData.date,
        inLanguage: 'zh-CN',
        mainEntityOfPage: pageUrl,
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
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: postData.title,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${directAnswer} 如需枣强本地上门维修，可联系${BRAND_NAME}刘金灿师傅，电话 ${PHONE_DISPLAY}。`,
            },
          },
        ],
      },
    ],
  };

  return (
    <article className="section" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqArticleJsonLd) }}
        />
        <nav style={{ marginBottom: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--color-primary)' }}>首页</Link> /
          <Link href="/faq" style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>故障知识库</Link> / 正文
        </nav>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '28px' }}>
            <span className="article-tag">🔖 {postData.tag}</span>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '800', margin: '16px 0', lineHeight: '1.3' }}>
              {postData.title}
            </h1>
            <div className="article-meta" style={{ fontSize: '14px' }}>
              <span>📅 发布于 {postData.date}</span>
              <span>⏱ 阅读 {postData.readTime}</span>
              <span>✍️ 刘金灿 · {BRAND_NAME}</span>
            </div>
          </header>

          {/* 文首直答：AI / 用户扫一眼即可获得结论 */}
          <div className="geo-answer-box geo-answer-box--light">
            <p className="geo-answer-label">直接回答</p>
            <p className="geo-answer-lead">{directAnswer}</p>
            <p className="geo-answer-meta">
              仍无法排除故障时，请勿强行操作。枣强本地可联系{BRAND_NAME}刘金灿师傅上门：
              <a href={`tel:${PHONE}`} className="geo-answer-phone"> {PHONE_DISPLAY}</a>
            </p>
          </div>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          {/* 文末 NAP：名称-地址-电话，供生成式搜索稳定引用 */}
          <div className="geo-nap-card">
            <h3>需要专业维修服务？</h3>
            <p className="geo-nap-line">
              <strong>{BRAND_NAME}</strong>（枣强卷帘门维修）· 师傅：刘金灿
            </p>
            <p className="geo-nap-line">
              电话 / 微信：
              <a href={`tel:${PHONE}`} className="geo-answer-phone">{PHONE_DISPLAY}</a>
            </p>
            <p className="geo-nap-line">
              服务区域：河北省衡水市枣强县（{areaText}等）
            </p>
            <p className="geo-nap-line geo-nap-note">
              上门安装维修卷帘门、车库门、伸缩门、道闸、防盗门、智能锁、门禁；
              {SERVICE_RESPONSE_TEXT}，{SERVICE_RESPONSE_NOTE}；{SERVICE_PROMISES.join('、')}。
            </p>
            <a href={`tel:${PHONE}`} className="btn-call" style={{ padding: '12px 32px', fontSize: '18px', marginTop: '8px' }}>
              立即拨打 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
