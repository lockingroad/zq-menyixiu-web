import {
  INDEXNOW_ENDPOINT,
  createIndexNowPayload,
} from '../src/lib/indexnow.js';
import { getCanonicalUrls, SITE_URL } from '../src/lib/site-routes.js';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const requestedUrls = args.filter((arg) => !arg.startsWith('--'));

if (args.includes('--help')) {
  console.log(`用法：
  npm run indexnow:dry
  npm run indexnow -- /services/roller-door-repair /faq/remote-button-reversed
  npm run indexnow

不传路径时提交 sitemap 中的全部规范 URL；--dry-run 只打印请求，不访问 IndexNow。`);
  process.exit(0);
}

const urls = requestedUrls.length > 0
  ? requestedUrls.map((value) => new URL(value, SITE_URL).toString())
  : getCanonicalUrls();
const payload = createIndexNowPayload(urls);

if (dryRun) {
  console.log(JSON.stringify({ endpoint: INDEXNOW_ENDPOINT, payload }, null, 2));
  process.exit(0);
}

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const responseText = await response.text();
  throw new Error(`IndexNow 提交失败：HTTP ${response.status} ${responseText}`.trim());
}

console.log(`IndexNow 已接收 ${payload.urlList.length} 个 URL（HTTP ${response.status}）。`);
