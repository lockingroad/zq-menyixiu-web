import Link from 'next/link';
import { repairCases, DOUYIN_URL } from '@/lib/config';

export const metadata = {
  title: '全部维修案例 - 枣强门壹修上门维修记录',
  description: '枣强本地真实上门维修案例汇总，覆盖卷帘门、车库门、伸缩门、道闸杆、防盗门等门类，按时间倒序持续更新。',
  alternates: {
    canonical: '/cases',
  },
};

export default function CasesPage() {
  // 案例按日期倒序排列（config 中已是新→旧），这里直接用全部数据。
  const cases = repairCases;

  return (
    <section className="section" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        <nav style={{ marginBottom: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--color-primary)' }}>首页</Link> / 全部维修案例
        </nav>
        <h1 className="section-title" style={{ textAlign: 'left' }}>全部真实维修案例</h1>
        <div className="section-divider" style={{ margin: '16px 0 32px' }} />
        <p style={{ marginBottom: '40px', color: 'var(--color-text-secondary)' }}>
          枣强本地真实上门维修记录，按时间倒序整理，持续更新。
        </p>

        <div className="case-feed-grid">
          {cases.map((item) => (
            <article className="case-feed-card" key={`${item.date}-${item.location}-${item.title}`}>
              <span className="case-feed-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                📍 {item.location} · 📅 {item.date}
              </div>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        {/* 抖音入口保留：本站案例为文字记录，抖音主页另有视频版本 */}
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
    </section>
  );
}
