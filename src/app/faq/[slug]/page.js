import Image from 'next/image';
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

function toAbsoluteUrl(value) {
  if (!value) return null;
  return new URL(value, SITE_URL).toString();
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({
    slug: s.params.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const pagePath = `/faq/${slug}`;
  const posterUrl = toAbsoluteUrl(postData.poster);
  const videoUrl = toAbsoluteUrl(postData.video?.src);

  return {
    title: `${postData.title} - 枣强卷帘门维修`,
    description: postData.excerpt,
    // 每篇 FAQ 的规范链接指向自身，便于 Google 独立收录
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      type: 'article',
      url: pagePath,
      title: postData.title,
      description: postData.excerpt,
      publishedTime: postData.date,
      modifiedTime: postData.updated,
      images: posterUrl
        ? [{
            url: posterUrl,
            width: postData.video?.width || 720,
            height: postData.video?.height || 1280,
            alt: postData.video?.title || postData.title,
          }]
        : undefined,
      videos: videoUrl
        ? [{
            url: videoUrl,
            type: postData.video?.mimeType || 'video/mp4',
            width: postData.video?.width,
            height: postData.video?.height,
          }]
        : undefined,
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
  const updatedDate = postData.updated || postData.date;
  const video = postData.video;
  const videoUrl = toAbsoluteUrl(video?.src);
  const posterUrl = toAbsoluteUrl(postData.poster);
  const sourceUrl = postData.sourceUrl || null;
  const faqEntries = [
    { question: postData.title, answer: directAnswer },
    ...postData.faqs,
  ];
  const articleImages = [postData.poster, ...postData.images.map((image) => image.src)]
    .filter(Boolean)
    .map(toAbsoluteUrl);
  const author = {
    '@type': 'Person',
    name: '刘金灿',
    jobTitle: '门类安装维修技师',
  };
  const publisher = {
    '@type': 'Organization',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.jpg`,
    },
  };
  const videoId = `${pageUrl}#video`;

  // 面包屑 + Article + 可见问答；视频 FAQ 额外输出 VideoObject。
  const faqArticleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
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
            name: '故障知识库',
            item: `${SITE_URL}/faq`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: postData.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: postData.title,
        description: directAnswer,
        datePublished: postData.date,
        dateModified: updatedDate,
        inLanguage: 'zh-CN',
        mainEntityOfPage: pageUrl,
        image: articleImages.length > 0 ? articleImages : undefined,
        author,
        publisher,
        citation: sourceUrl || undefined,
        video: videoUrl && posterUrl ? { '@id': videoId } : undefined,
        about: {
          '@id': `${SITE_URL}/#business`,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        dateModified: updatedDate,
        lastReviewed: updatedDate,
        reviewedBy: postData.reviewer
          ? { '@type': 'Person', name: postData.reviewer }
          : undefined,
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: faqEntries.map((faq, index) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: index === 0
              ? `${faq.answer} 如需枣强本地上门维修，可联系${BRAND_NAME}刘金灿师傅，电话 ${PHONE_DISPLAY}。`
              : faq.answer,
          },
        })),
      },
      ...(videoUrl && posterUrl
        ? [{
            '@type': 'VideoObject',
            '@id': videoId,
            name: video.title || `${postData.title}视频讲解`,
            description: video.description || directAnswer,
            thumbnailUrl: posterUrl,
            uploadDate: video.uploadDate || postData.date,
            duration: video.duration || undefined,
            contentUrl: videoUrl,
            embedUrl: `${pageUrl}#faq-video`,
            inLanguage: 'zh-CN',
            isAccessibleForFree: true,
            author,
            publisher,
            isPartOf: { '@id': `${pageUrl}#article` },
            sameAs: sourceUrl || undefined,
          }]
        : []),
    ],
  };

  return (
    <article className="section" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqArticleJsonLd) }}
        />
        <nav className="faq-breadcrumb" aria-label="面包屑">
          <Link href="/" style={{ color: 'var(--color-primary)' }}>首页</Link> /
          <Link href="/faq" style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>故障知识库</Link> /
          <span>{postData.title}</span>
        </nav>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '28px' }}>
            <span className="article-tag">🔖 {postData.tag}</span>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '800', margin: '16px 0', lineHeight: '1.3' }}>
              {postData.title}
            </h1>
            <div className="article-meta faq-article-meta" style={{ fontSize: '14px' }}>
              <span>📅 发布于 {postData.date}</span>
              {updatedDate !== postData.date && <span>更新于 {updatedDate}</span>}
              <span>⏱ 阅读 {postData.readTime}</span>
              <span>✍️ 刘金灿 · {BRAND_NAME}</span>
              {postData.reviewer && <span>审核：{postData.reviewer}</span>}
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

          {video?.src && (
            <section className="faq-video-card" aria-labelledby="faq-video-title">
              <div className="faq-video-frame">
                <video
                  id="faq-video"
                  controls
                  playsInline
                  preload="metadata"
                  poster={postData.poster || undefined}
                  aria-label={video.title || `${postData.title}视频讲解`}
                >
                  <source src={video.src} type={video.mimeType || 'video/mp4'} />
                  您的浏览器暂不支持视频播放，可通过下方来源链接观看原视频。
                </video>
              </div>
              <div className="faq-video-info">
                <p className="section-kicker">实拍视频 · {video.durationLabel || '现场讲解'}</p>
                <h2 id="faq-video-title">{video.title || postData.title}</h2>
                <p>{video.description || '先看完整演示，再结合下方文字步骤确认故障现象和处理边界。'}</p>
                {postData.performance && (
                  <div className="faq-video-performance" aria-label="原视频公开表现">
                    <p>公开表现 · 截至 <time dateTime={postData.performance.asOf}>{postData.performance.asOf}</time></p>
                    <dl>
                      <div>
                        <dt>播放</dt>
                        <dd>{postData.performance.playsLabel}</dd>
                      </div>
                      <div>
                        <dt>点赞</dt>
                        <dd>{postData.performance.likes}</dd>
                      </div>
                      <div>
                        <dt>收藏</dt>
                        <dd>{postData.performance.favorites}</dd>
                      </div>
                    </dl>
                  </div>
                )}
                {sourceUrl && (
                  <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    查看抖音原视频 <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </section>
          )}

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          {postData.faqs.length > 0 && (
            <section className="faq-subquestions" aria-labelledby="faq-subquestions-title">
              <div className="faq-gallery-heading">
                <p className="section-kicker">继续排查</p>
                <h2 id="faq-subquestions-title">限位调节常见问题</h2>
              </div>
              <div className="faq-subquestions-list">
                {postData.faqs.map((faq, index) => (
                  <article key={faq.question}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {postData.images.length > 0 && (
            <section className="faq-gallery" aria-labelledby="faq-gallery-title">
              <div className="faq-gallery-heading">
                <p className="section-kicker">视频关键画面</p>
                <h2 id="faq-gallery-title">{postData.galleryTitle || '从关键画面看清操作步骤'}</h2>
              </div>
              <div className="faq-gallery-grid">
                {postData.images.map((image) => (
                  <figure key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width || 720}
                      height={image.height || 1280}
                      sizes="(min-width: 768px) 360px, 100vw"
                    />
                    {image.caption && <figcaption>{image.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {postData.relatedService && (
            <aside className="faq-related-service" aria-label="相关维修服务">
              <div>
                <p className="section-kicker">仍未解决</p>
                <h2>{postData.relatedService.label}</h2>
                {postData.relatedService.description && <p>{postData.relatedService.description}</p>}
              </div>
              <Link href={postData.relatedService.href}>
                查看服务范围 <span aria-hidden="true">→</span>
              </Link>
            </aside>
          )}

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
