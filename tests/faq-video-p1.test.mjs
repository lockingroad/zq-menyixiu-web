import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getPostData } from '../src/lib/markdown.js';
import { getSiteRoutes } from '../src/lib/site-routes.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function fromPublic(urlPath) {
  return `${projectRoot}/public/${urlPath.replace(/^\//, '')}`;
}

test('遥控器按键反向 FAQ 提供完整 P1 内容字段', async () => {
  const post = await getPostData('remote-button-reversed');

  assert.equal(post.date, '2026-05-23');
  assert.equal(post.updated, '2026-08-04');
  assert.equal(post.sourceUrl, 'https://v.douyin.com/fVRpYKxrJME/');
  assert.equal(post.reviewer, '刘金灿');
  assert.equal(post.video.src, '/videos/faq/remote-button-reversed.mp4');
  assert.equal(post.video.duration, 'PT32S');
  assert.equal(post.video.mimeType, 'video/mp4');
  assert.equal(post.poster, '/images/faq/remote-button-reversed/poster.jpg');
  assert.equal(post.images.length, 2);
  assert.ok(post.images.every((image) => image.src && image.alt && image.caption));
});

test('视频、海报和关键画面均为可发布的本地资源', async () => {
  const post = await getPostData('remote-button-reversed');
  const mediaPaths = [post.video.src, post.poster, ...post.images.map((image) => image.src)];

  for (const mediaPath of mediaPaths) {
    assert.ok(existsSync(fromPublic(mediaPath)), `缺少媒体资源：${mediaPath}`);
  }

  assert.ok(statSync(fromPublic(post.video.src)).size > 1_000_000);
  assert.ok(statSync(fromPublic(post.poster)).size > 50_000);
});

test('遥控 2.1 FAQ 提供可验证的视频证据、数据快照与安全边界', async () => {
  const post = await getPostData('remote-copy-code-guide');
  const mediaPaths = [post.video.src, post.poster, ...post.images.map((image) => image.src)];

  assert.equal(post.date, '2026-08-11');
  assert.equal(post.sourceUrl, 'https://v.douyin.com/cnXhSRFLEFM/');
  assert.equal(post.video.duration, 'PT51S');
  assert.equal(post.performance.asOf, '2026-08-11');
  assert.equal(post.performance.plays, 8233);
  assert.equal(post.faqs.length, 4);
  assert.equal(post.relatedService.href, '/services/remote-control-repair');
  assert.match(post.contentHtml, /不适合多人共用/);
  assert.equal(
    getSiteRoutes().find((route) => route.path === '/faq/remote-copy-code-guide').lastModified,
    '2026-08-11',
  );

  for (const mediaPath of mediaPaths) {
    assert.ok(existsSync(fromPublic(mediaPath)), `缺少媒体资源：${mediaPath}`);
  }

  assert.ok(statSync(fromPublic(post.video.src)).size > 5_000_000);
  assert.ok(post.images.every((image) => image.alt && image.caption));
});

test('旧 FAQ 在未声明 P1 字段时保持兼容默认值', async () => {
  const post = await getPostData('remote-failure');

  assert.equal(post.updated, post.date);
  assert.equal(post.sourceUrl, null);
  assert.equal(post.video, null);
  assert.equal(post.poster, null);
  assert.deepEqual(post.images, []);
  assert.equal(post.reviewer, null);
  assert.equal(post.directAnswer, post.excerpt);
});

test('FAQ 详情页输出面包屑、文章和可选视频结构化数据', () => {
  const pageSource = readFileSync(
    `${projectRoot}/src/app/faq/[slug]/page.js`,
    'utf8',
  );

  assert.match(pageSource, /'@type': 'BreadcrumbList'/);
  assert.match(pageSource, /'@type': 'Article'/);
  assert.match(pageSource, /'@type': 'FAQPage'/);
  assert.match(pageSource, /'@type': 'VideoObject'/);
  assert.match(pageSource, /dateModified: updatedDate/);
  assert.match(pageSource, /reviewedBy: postData\.reviewer/);
  assert.match(pageSource, /\.\.\.\(videoUrl && posterUrl/);
});

test('站点地图优先使用 FAQ 的 updated 字段', () => {
  const sitemapSource = readFileSync(`${projectRoot}/src/lib/site-routes.js`, 'utf8');

  assert.match(sitemapSource, /post\.updated \|\| post\.date/);
});
