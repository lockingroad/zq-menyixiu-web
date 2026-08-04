import '@/index.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';
import BackToTop from '@/components/BackToTop';
import {
  BRAND_NAME,
  DOUYIN_URL,
  PHONE,
  SERVICE_PROMISES,
  SERVICE_RESPONSE_NOTE,
  SERVICE_RESPONSE_TEXT,
  serviceAreas,
  services,
} from '@/lib/config';

const SITE_URL = 'https://menyixiu.cn';
const SERVICE_PROMISE_TEXT = SERVICE_PROMISES.join('、');
const SITE_DESCRIPTION = `${BRAND_NAME}由刘金灿师傅提供卷帘门、工业卷帘门、伸缩门、道闸、防盗门、智能锁和门禁上门安装维修。${SERVICE_RESPONSE_TEXT}，${SERVICE_RESPONSE_NOTE}；${SERVICE_PROMISE_TEXT}。`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `枣强卷帘门维修｜${BRAND_NAME}本地上门安装维修`,
  description: SITE_DESCRIPTION,
  keywords: '枣强卷帘门维修, 枣强工业卷帘门, 枣强肯德基门, 枣强防盗门, 枣强智能锁安装, 枣强门禁维修, 枣强磁吸锁, 枣强人脸识别, 枣强道闸杆, 枣强车牌识别, 枣强农村大门维修, 门壹修',
  // 不在根布局设置全局 canonical，避免所有子页被当成首页副本。
  // 各页面在自身 metadata 中声明正确的 canonical。
  openGraph: {
    title: `枣强卷帘门维修｜${BRAND_NAME}本地上门安装维修`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND_NAME,
    locale: 'zh_CN',
    type: 'website',
    images: [{ url: '/images/logo.jpg' }],
  },
  icons: {
    icon: '/images/logo.jpg',
  },
  other: {
    'baidu-site-verification': 'codeva-aJGTvIXgvj',
  },
};

// 机器可读的本地商家信息，供豆包/百度/Kimi 等检索引擎直接引用，
// 避免因缺权威来源而抓到错误电话。联系电话以本站为准：13784884521。
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BRAND_NAME,
  alternateName: ['枣强卷帘门维修', '门壹修'],
  description: `${SITE_DESCRIPTION} 联系电话 ${PHONE}。`,
  slogan: `枣强本地上门维修，${SERVICE_RESPONSE_TEXT}`,
  telephone: PHONE,
  url: SITE_URL,
  image: `${SITE_URL}/images/logo.jpg`,
  logo: `${SITE_URL}/images/logo.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    addressRegion: '河北省衡水市',
    addressLocality: '枣强县',
  },
  areaServed: serviceAreas.map((area) => ({ '@type': 'City', name: area })),
  knowsAbout: services.map((s) => s.title),
  // 服务清单，便于 AI 识别可提供的上门项目
  makesOffer: services.map((s) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: s.title,
      description: s.desc,
      areaServed: '河北省衡水市枣强县',
      provider: { '@id': `${SITE_URL}/#business` },
    },
  })),
  founder: {
    '@type': 'Person',
    name: '刘金灿',
    jobTitle: '门类安装维修技师',
  },
  employee: {
    '@type': 'Person',
    name: '刘金灿',
    jobTitle: '门类安装维修技师',
    telephone: PHONE,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'customer service',
    areaServed: 'CN-HE',
    availableLanguage: 'Chinese',
  },
  sameAs: [DOUYIN_URL],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <BackToTop />
      </body>
    </html>
  );
}
