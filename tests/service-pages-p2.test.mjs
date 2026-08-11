import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  createIndexNowPayload,
} from '../src/lib/indexnow.js';
import { SERVICE_PAGES } from '../src/lib/service-pages.js';
import { getSiteRoutes, SITE_URL } from '../src/lib/site-routes.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function readProjectFile(relativePath) {
  return readFileSync(`${projectRoot}/${relativePath}`, 'utf8');
}

test('P2 提供三个独立且内容完整的服务页', () => {
  assert.deepEqual(
    SERVICE_PAGES.map((service) => service.slug),
    ['remote-control-repair', 'motor-limit-repair', 'roller-door-repair'],
  );

  for (const service of SERVICE_PAGES) {
    assert.ok(service.title.startsWith('枣强'));
    assert.ok(service.description.length > 50);
    assert.ok(service.directAnswer.length > 60);
    assert.equal(
      service.updated,
      service.slug === 'remote-control-repair' ? '2026-08-11' : '2026-08-04',
    );
    assert.ok(service.scope.length >= 6);
    assert.ok(service.symptoms.length >= 3);
    assert.ok(service.process.length >= 5);
    assert.ok(service.faqs.length >= 4);
    assert.ok(existsSync(`${projectRoot}/public${service.heroImage.src}`));
    assert.ok(existsSync(`${projectRoot}/public${service.evidence.image.src}`));
  }
});

test('服务页模板输出清晰标题、真实证据和 FAQ 结构化数据', () => {
  const pageSource = readProjectFile('src/app/services/[slug]/page.js');

  assert.match(pageSource, /generateStaticParams/);
  assert.match(pageSource, /<h1>\{service\.title\}<\/h1>/);
  assert.match(pageSource, /'@type': 'BreadcrumbList'/);
  assert.match(pageSource, /'@type': 'Service'/);
  assert.match(pageSource, /'@type': 'FAQPage'/);
  assert.match(pageSource, /service\.evidence\.href/);
  assert.match(pageSource, /service\.faqs\.map/);
});

test('首页和 Footer 提供三个服务页的可抓取入口', () => {
  assert.match(readProjectFile('src/app/page.js'), /SERVICE_PAGE_LINKS/);
  assert.match(readProjectFile('src/components/Footer.js'), /SERVICE_PAGE_LINKS/);
});

test('sitemap 使用内容更新时间且不同构建结果稳定', () => {
  const first = getSiteRoutes();
  const second = getSiteRoutes();
  const sitemapSource = readProjectFile('src/app/sitemap.js');

  assert.deepEqual(first, second);
  assert.doesNotMatch(sitemapSource, /new Date\(\)/);

  const routeDates = Object.fromEntries(first.map((route) => [route.path, route.lastModified]));
  assert.equal(routeDates['/'], '2026-08-04');
  assert.equal(routeDates['/faq'], '2026-08-11');
  assert.equal(routeDates['/cases'], '2026-07-26');

  for (const service of SERVICE_PAGES) {
    assert.equal(routeDates[`/services/${service.slug}`], service.updated);
  }
});

test('IndexNow 密钥文件和批量请求符合站点范围', () => {
  const keyFile = `${projectRoot}/public/${INDEXNOW_KEY}.txt`;
  const payload = createIndexNowPayload([
    `${SITE_URL}/services/remote-control-repair`,
    `${SITE_URL}/services/remote-control-repair`,
    '/services/motor-limit-repair',
  ]);

  assert.equal(INDEXNOW_ENDPOINT, 'https://api.indexnow.org/indexnow');
  assert.equal(readFileSync(keyFile, 'utf8').trim(), INDEXNOW_KEY);
  assert.equal(payload.host, 'menyixiu.cn');
  assert.equal(payload.keyLocation, INDEXNOW_KEY_LOCATION);
  assert.equal(payload.urlList.length, 2);
  assert.throws(
    () => createIndexNowPayload(['https://example.com/not-allowed']),
    /只允许提交/,
  );
});
