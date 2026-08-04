import {
  BRAND_NAME,
  PHONE,
  PHONE_DISPLAY,
  SERVICE_PROMISES,
  SERVICE_RESPONSE_NOTE,
  SERVICE_RESPONSE_TEXT,
  serviceAreas,
} from '@/lib/config';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>{BRAND_NAME}</h3>
            <p>
              衡水枣强本地卷帘门维修服务。从业20年，专注各类门的安装、维修与保养。
              家庭、企业、学校各类门一站式服务。{SERVICE_RESPONSE_TEXT}，{SERVICE_RESPONSE_NOTE}；
              {SERVICE_PROMISES.join('、')}。
            </p>
          </div>
          <div className="footer-section">
            <h4>联系方式</h4>
            <div className="footer-contact-item">
              <div>
                <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
                <br />
                <span style={{ fontSize: '12px', opacity: 0.6 }}>
                  刘金灿师傅
                </span>
              </div>
            </div>
            <div className="footer-contact-item">
              <div>微信同号：{PHONE}</div>
            </div>
            <div className="footer-contact-item">
              <div>抖音：{BRAND_NAME}</div>
            </div>
          </div>
          <div className="footer-section">
            <h4>服务覆盖</h4>
            <div className="footer-area-tags">
              {serviceAreas.map((area, i) => (
                <span className="footer-area-tag" key={i}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {BRAND_NAME} | 枣强本地上门维修服务</p>
          <p>河北省衡水市枣强县 | 卷帘门 · 伸缩门 · 道闸杆 · 安装维修</p>
        </div>
      </div>
    </footer>
  );
}
