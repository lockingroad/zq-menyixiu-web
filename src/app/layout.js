import '@/index.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';
import BackToTop from '@/components/BackToTop';
import { PHONE, DOUYIN_URL, serviceAreas, services } from '@/lib/config';

const SITE_URL = 'https://menyixiu.cn';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: '枣强卷帘门维修 - 专业上门维修卷帘门、伸缩门、道闸杆',
  description: '枣强门壹修，刘金灿师傅从业20年，专业维修安装卷帘门、工业卷帘门、肯德基门、防盗门、智能锁、小区门禁、磁吸锁、人脸识别、自抬杆、车牌识别、农村大门。快速上门，价格透明，县城内15分钟达。',
  keywords: '枣强卷帘门维修, 枣强工业卷帘门, 枣强肯德基门, 枣强防盗门, 枣强智能锁安装, 枣强门禁维修, 枣强磁吸锁, 枣强人脸识别, 枣强道闸杆, 枣强车牌识别, 枣强农村大门维修, 门壹修',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '枣强卷帘门维修 - 专业上门维修卷帘门、伸缩门、道闸杆',
    description: '枣强门壹修，刘金灿师傅从业20年，快速上门，价格透明，县城内15分钟达。',
    url: SITE_URL,
    siteName: '枣强门壹修',
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
  name: '枣强门壹修',
  alternateName: '枣强卷帘门维修',
  description: '枣强本地卷帘门、工业卷帘门、肯德基门、防盗门、智能锁、小区门禁、磁吸锁、人脸识别、自抬杆、车牌识别、农村自建房大门等安装维修上门服务，从业20年，县城内15分钟快速达。',
  telephone: PHONE,
  url: SITE_URL,
  image: `${SITE_URL}/images/logo.jpg`,
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    addressRegion: '河北省衡水市',
    addressLocality: '枣强县',
  },
  areaServed: serviceAreas.map((area) => ({ '@type': 'City', name: area })),
  knowsAbout: services.map((s) => s.title),
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
