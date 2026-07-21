import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export const metadata = {
  title: '常见故障排查 - 枣强卷帘门维修知识库',
  description: '汇集枣强门壹修20年维修经验，为您解决卷帘门卡死、遥控器失灵、电机嗡嗡响等各类常见故障。',
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQList() {
  const allPostsData = getSortedPostsData();

  // 把 FAQ 列表以 FAQPage 结构化数据暴露给检索引擎，
  // 让 AI 能直接引用问答，而不是从正文猜测。
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allPostsData.map(({ title, excerpt }) => ({
      '@type': 'Question',
      name: title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: excerpt,
      },
    })),
  };

  return (
    <section className="section" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <nav style={{ marginBottom: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--color-primary)' }}>首页</Link> / 故障知识库
        </nav>
        <h1 className="section-title" style={{ textAlign: 'left' }}>常见故障排查与知识库</h1>
        <div className="section-divider" style={{ margin: '16px 0 32px' }} />
        <p style={{ marginBottom: '40px', color: 'var(--color-text-secondary)' }}>
          在这里，您可以找到刘金灿师傅整理的各种卷帘门维修技巧和保养建议。
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
      </div>
    </section>
  );
}
