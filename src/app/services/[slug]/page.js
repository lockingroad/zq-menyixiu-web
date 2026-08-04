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
  serviceAreas,
} from '@/lib/config';
import { SERVICE_PAGES, getServicePageBySlug } from '@/lib/service-pages';

const SITE_URL = 'https://menyixiu.cn';

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServicePageBySlug(slug);

  if (!service) return {};

  const pagePath = `/services/${service.slug}`;

  return {
    title: `${service.title}｜${BRAND_NAME}`,
    description: service.description,
    alternates: { canonical: pagePath },
    openGraph: {
      type: 'website',
      url: pagePath,
      title: service.title,
      description: service.description,
      images: [{
        url: service.heroImage.src,
        alt: service.heroImage.alt,
      }],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServicePageBySlug(slug);

  if (!service) notFound();

  const pageUrl = `${SITE_URL}/services/${service.slug}`;
  const serviceId = `${pageUrl}#service`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const relatedServices = SERVICE_PAGES.filter((item) => item.slug !== service.slug);
  const promiseText = [SERVICE_RESPONSE_TEXT, ...SERVICE_PROMISES].join(' · ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '主营服务', item: `${SITE_URL}/#services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: service.title,
        serviceType: service.name,
        description: service.description,
        url: pageUrl,
        image: `${SITE_URL}${service.heroImage.src}`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: serviceAreas.map((area) => ({
          '@type': 'AdministrativeArea',
          name: `河北省衡水市枣强县${area}`,
        })),
        availableChannel: {
          '@type': 'ServiceChannel',
          servicePhone: {
            '@type': 'ContactPoint',
            telephone: PHONE,
            contactType: 'customer service',
          },
        },
        subjectOf: [
          {
            '@type': 'CreativeWork',
            name: service.evidence.title,
            url: `${SITE_URL}${service.evidence.href}`,
          },
          ...(service.videoGuide
            ? [{
                '@type': 'CreativeWork',
                name: service.videoGuide.title,
                url: `${SITE_URL}${service.videoGuide.href}`,
              }]
            : []),
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        datePublished: service.published,
        dateModified: service.updated,
        lastReviewed: service.updated,
        reviewedBy: { '@type': 'Person', name: '刘金灿' },
        breadcrumb: { '@id': breadcrumbId },
        about: { '@id': serviceId },
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <article className="service-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="service-hero"
        id="hero"
        style={{ '--service-hero-position': service.heroImage.position }}
      >
        <Image
          className="service-hero-image"
          src={service.heroImage.src}
          alt={service.heroImage.alt}
          fill
          priority
          sizes="100vw"
        />
        <div className="service-hero-overlay" />
        <div className="container service-hero-inner">
          <nav className="service-breadcrumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#services">主营服务</Link>
            <span aria-hidden="true">/</span>
            <span>{service.name}</span>
          </nav>
          <p className="service-hero-brand">{BRAND_NAME}</p>
          <p className="service-hero-kicker">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="service-hero-summary">{service.description}</p>
          <p className="service-hero-promise">{promiseText}</p>
          <p className="service-hero-note">{SERVICE_RESPONSE_NOTE}。</p>
          <div className="service-hero-actions">
            <a href={`tel:${PHONE}`} className="btn-hero-primary">
              拨打 {PHONE_DISPLAY}
            </a>
            <a href="#service-answer" className="btn-hero-secondary">
              先看故障判断 <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section service-answer" id="service-answer">
        <div className="container service-section-layout">
          <header className="service-section-heading">
            <p className="section-kicker">直接回答</p>
            <h2>先判断问题在哪一段</h2>
          </header>
          <div className="service-answer-content">
            <p className="service-answer-lead">{service.directAnswer}</p>
            <div className="service-scope-list" aria-label={`${service.name}服务范围`}>
              {service.scope.map((item, index) => (
                <p key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {service.videoGuide && (
        <section className="service-video-guide-section" aria-label="限位调节视频指南">
          <Link href={service.videoGuide.href} className="container service-video-guide">
            <div className="service-video-guide-image">
              <Image
                src={service.videoGuide.image.src}
                alt={service.videoGuide.image.alt}
                fill
                sizes="(min-width: 768px) 360px, 100vw"
              />
              <span>播放实拍讲解</span>
            </div>
            <div className="service-video-guide-content">
              <p className="section-kicker">{service.videoGuide.eyebrow}</p>
              <h2>{service.videoGuide.title}</h2>
              <p>{service.videoGuide.description}</p>
              <strong>{service.videoGuide.linkText} <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        </section>
      )}

      <section className="section service-symptoms">
        <div className="container">
          <div className="service-wide-heading">
            <p className="section-kicker">常见现象</p>
            <h2>电话里可以先这样描述</h2>
            <p>现象越具体，越容易判断应携带的工具和适配部件。</p>
          </div>
          <div className="service-symptom-list">
            {service.symptoms.map((symptom, index) => (
              <article key={symptom.question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{symptom.question}</h3>
                <p>{symptom.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-process-section">
        <div className="container service-section-layout">
          <header className="service-section-heading">
            <p className="section-kicker">处理流程</p>
            <h2>从现象到复测</h2>
            <p>先定位，再处理，避免只换配件却没有解决真正故障。</p>
          </header>
          <ol className="service-process-list">
            {service.process.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section service-evidence-section">
        <div className="container service-evidence">
          <div className="service-evidence-image">
            <Image
              src={service.evidence.image.src}
              alt={service.evidence.image.alt}
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
            />
          </div>
          <div className="service-evidence-content">
            <p className="section-kicker">{service.evidence.label}</p>
            <h2>{service.evidence.title}</h2>
            <p>{service.evidence.description}</p>
            <Link href={service.evidence.href}>
              {service.evidence.linkText} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section service-faq-section" id="service-faq">
        <div className="container service-section-layout">
          <header className="service-section-heading">
            <p className="section-kicker">常见问题</p>
            <h2>{service.name} FAQ</h2>
            <p>以下回答用于初步判断，现场结果以实际检测为准。</p>
          </header>
          <div className="service-faq-list">
            {service.faqs.map((faq, index) => (
              <article key={faq.question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-related">
        <div className="container service-related-inner">
          <p>继续查看</p>
          <nav aria-label="其他主营服务">
            {relatedServices.map((item) => (
              <Link href={`/services/${item.slug}`} key={item.slug}>
                {item.navLabel} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="service-final-cta">
        <div className="container service-final-cta-inner">
          <div>
            <p className="section-kicker">枣强本地师傅</p>
            <h2>先说明门体和故障现象，再安排处理</h2>
            <p>{SERVICE_RESPONSE_TEXT}，{SERVICE_RESPONSE_NOTE}。</p>
          </div>
          <a href={`tel:${PHONE}`} className="btn-hero-primary">
            拨打 {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </article>
  );
}
