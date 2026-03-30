import '@/index.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';
import BackToTop from '@/components/BackToTop';

export const metadata = {
  title: '枣强卷帘门维修 - 专业上门维修卷帘门、伸缩门、道闸杆',
  description: '枣强门壹修，刘金灿师傅从业20年，专业维修卷帘门、电机维修、遥控器匹配、门体修复。快速上门，价格透明，县城内15分钟达。',
  keywords: '枣强卷帘门维修, 枣强电机维修, 枣强遥控器匹配, 枣强门窗维修, 门壹修',
  other: {
    'baidu-site-verification': 'codeva-g95099ULw3',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <BackToTop />
      </body>
    </html>
  );
}
