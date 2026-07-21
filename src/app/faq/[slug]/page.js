import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '@/lib/markdown';
import { PHONE, PHONE_DISPLAY } from '@/lib/config';

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

  return (
    <article className="section" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        <nav style={{ marginBottom: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--color-primary)' }}>首页</Link> / 
          <Link href="/faq" style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>故障知识库</Link> / 正文
        </nav>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '40px' }}>
            <span className="article-tag">🔖 {postData.tag}</span>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '800', margin: '16px 0', lineHeight: '1.3' }}>
              {postData.title}
            </h1>
            <div className="article-meta" style={{ fontSize: '14px' }}>
              <span>📅 发布于 {postData.date}</span>
              <span>⏱ 阅读 {postData.readTime}</span>
            </div>
          </header>

          <div 
            className="prose"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />

          <div style={{ 
            marginTop: '60px', 
            padding: '32px', 
            backgroundColor: 'var(--color-primary-50)', 
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-primary-100)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>需要专业维修服务？</h3>
            <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
              刘金灿师傅在枣强本地提供20年专业维修服务，快速上门，价格透明。
            </p>
            <a href={`tel:${PHONE}`} className="btn-call" style={{ padding: '12px 32px', fontSize: '18px' }}>
              📞 立即拨打 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
