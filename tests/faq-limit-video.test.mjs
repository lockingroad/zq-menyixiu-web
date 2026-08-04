import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getPostData, getSortedPostsData } from '../src/lib/markdown.js';
import { SERVICE_PAGES } from '../src/lib/service-pages.js';
import { getSiteRoutes } from '../src/lib/site-routes.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function fromPublic(urlPath) {
  return `${projectRoot}/public/${urlPath.replace(/^\//, '')}`;
}

function readProjectFile(relativePath) {
  return readFileSync(`${projectRoot}/${relativePath}`, 'utf8');
}

test('限位器视频 FAQ 提供准确的内容、来源和公开数据快照', async () => {
  const post = await getPostData('roller-door-limit-adjustment');

  assert.equal(post.date, '2026-08-04');
  assert.equal(post.updated, '2026-08-04');
  assert.equal(post.featured, true);
  assert.equal(post.sourceUrl, 'https://v.douyin.com/pQu5oOQaNd0/');
  assert.equal(post.video.uploadDate, '2026-08-04T00:00:00+08:00');
  assert.equal(post.video.duration, 'PT1M3S');
  assert.equal(post.video.width, 720);
  assert.equal(post.video.height, 1280);
  assert.equal(post.performance.asOf, '2026-08-04');
  assert.equal(post.performance.plays, 163000);
  assert.equal(post.performance.likes, 1221);
  assert.equal(post.performance.favorites, 1820);
  assert.equal(post.faqs.length, 5);
  assert.equal(post.relatedService.href, '/services/motor-limit-repair');
});

test('限位器网站版视频、海报和步骤图均为可发布资源', async () => {
  const post = await getPostData('roller-door-limit-adjustment');
  const mediaPaths = [post.video.src, post.poster, ...post.images.map((image) => image.src)];

  for (const mediaPath of mediaPaths) {
    assert.ok(existsSync(fromPublic(mediaPath)), `缺少媒体资源：${mediaPath}`);
  }

  assert.ok(statSync(fromPublic(post.video.src)).size > 5_000_000);
  assert.ok(statSync(fromPublic(post.video.src)).size < 15_000_000);
  assert.ok(post.images.every((image) => image.alt && image.caption));
});

test('精选限位视频 FAQ 置顶，且 sitemap 使用真实更新时间', () => {
  const posts = getSortedPostsData();
  const route = getSiteRoutes().find((item) => item.path === '/faq/roller-door-limit-adjustment');

  assert.equal(posts[0].slug, 'roller-door-limit-adjustment');
  assert.equal(posts[1].slug, 'roller-door-limit-adjustment-not-working');
  assert.equal(route.lastModified, '2026-08-04');
});

test('详情页呈现子 FAQ、数据快照和独立视频上传日期', () => {
  const pageSource = readProjectFile('src/app/faq/[slug]/page.js');

  assert.match(pageSource, /faqEntries\.map/);
  assert.match(pageSource, /postData\.faqs\.map/);
  assert.match(pageSource, /video\.uploadDate \|\| postData\.date/);
  assert.match(pageSource, /faq-video-performance/);
  assert.match(pageSource, /postData\.relatedService\.href/);
});

test('电机限位服务页突出诊断视频，相关 FAQ 回链限位系列', () => {
  const motorService = SERVICE_PAGES.find((service) => service.slug === 'motor-limit-repair');
  const pageSource = readProjectFile('src/app/services/[slug]/page.js');
  const adjustmentSource = readProjectFile('content/faq/roller-door-limit-adjustment.md');
  const reboundSource = readProjectFile('content/faq/auto-rebound.md');
  const hummingSource = readProjectFile('content/faq/motor-humming.md');

  assert.equal(motorService.videoGuide.href, '/faq/roller-door-limit-adjustment-not-working');
  assert.match(pageSource, /service\.videoGuide/);
  assert.match(adjustmentSource, /\/faq\/roller-door-limit-adjustment-not-working/);
  assert.match(reboundSource, /\/faq\/roller-door-limit-adjustment-not-working/);
  assert.match(reboundSource, /\/faq\/roller-door-limit-adjustment/);
  assert.match(hummingSource, /\/faq\/roller-door-limit-adjustment/);
});

test('限位调整无效视频 FAQ 提供四类诊断、安全边界和公开数据', async () => {
  const post = await getPostData('roller-door-limit-adjustment-not-working');

  assert.equal(post.date, '2026-08-04');
  assert.equal(post.updated, '2026-08-04');
  assert.equal(post.sourceUrl, 'https://v.douyin.com/2RjY6RITNes/');
  assert.equal(post.video.uploadDate, '2026-08-04T00:00:00+08:00');
  assert.equal(post.video.duration, 'PT1M11S');
  assert.equal(post.video.width, 720);
  assert.equal(post.video.height, 1280);
  assert.equal(post.performance.asOf, '2026-08-04');
  assert.equal(post.performance.plays, 77000);
  assert.equal(post.performance.likes, 566);
  assert.equal(post.performance.favorites, 680);
  assert.equal(post.faqs.length, 6);
  assert.equal(post.images.length, 4);
  assert.match(post.contentHtml, /立即断电/);
  assert.match(post.contentHtml, /不要把“调低灵敏度”当作通用解决办法/);
  assert.match(post.contentHtml, /\/faq\/roller-door-limit-adjustment/);
});

test('限位调整无效视频、海报和诊断画面均为网站发布资源', async () => {
  const post = await getPostData('roller-door-limit-adjustment-not-working');
  const mediaPaths = [post.video.src, post.poster, ...post.images.map((image) => image.src)];

  for (const mediaPath of mediaPaths) {
    assert.ok(existsSync(fromPublic(mediaPath)), `缺少媒体资源：${mediaPath}`);
  }

  const videoSize = statSync(fromPublic(post.video.src)).size;
  assert.ok(videoSize > 8_000_000);
  assert.ok(videoSize < 18_000_000);
  assert.ok(post.images.every((image) => image.alt && image.caption));

  const route = getSiteRoutes().find(
    (item) => item.path === '/faq/roller-door-limit-adjustment-not-working',
  );
  assert.equal(route.lastModified, '2026-08-04');
});
