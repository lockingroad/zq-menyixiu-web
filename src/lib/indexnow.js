import { SITE_URL } from './site-routes.js';

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_KEY = '42737f1cb4260a8b64c1ea8aa5297cb3';
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

export function createIndexNowPayload(urls) {
  const siteHost = new URL(SITE_URL).host;
  const urlList = [...new Set(urls)].map((value) => {
    const url = new URL(value, SITE_URL);

    if (url.host !== siteHost || url.protocol !== 'https:') {
      throw new Error(`IndexNow 只允许提交 ${SITE_URL} 下的 HTTPS URL：${value}`);
    }

    return url.toString();
  });

  if (urlList.length === 0) {
    throw new Error('IndexNow URL 列表不能为空');
  }

  if (urlList.length > 10_000) {
    throw new Error('IndexNow 单次最多提交 10,000 个 URL');
  }

  return {
    host: siteHost,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };
}
