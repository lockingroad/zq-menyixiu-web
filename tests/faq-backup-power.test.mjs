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

test('储备电源 FAQ 提供可验证的视频、来源和公开数据快照', async () => {
  const post = await getPostData('roller-door-backup-power');

  assert.equal(post.date, '2026-08-20');
  assert.equal(post.updated, '2026-08-20');
  assert.equal(post.featured, true);
  assert.equal(post.featuredOrder, 1);
  assert.equal(post.sourceUrl, 'https://v.douyin.com/G-z7M2rZWEU/');
  assert.equal(post.video.src, '/videos/faq/roller-door-backup-power.mp4');
  assert.equal(post.video.uploadDate, '2026-08-20T00:00:00+08:00');
  assert.equal(post.video.duration, 'PT36S');
  assert.equal(post.video.width, 720);
  assert.equal(post.video.height, 1280);
  assert.equal(post.performance.asOf, '2026-08-20');
  assert.equal(post.performance.plays, 1260);
  assert.equal(post.performance.likes, 6);
  assert.equal(post.performance.favorites, 4);
  assert.equal(post.images.length, 5);
  assert.equal(post.faqs.length, 5);
  assert.equal(post.reviewer, '刘金灿');
});

test('储备电源视频、海报和五张证据图均为可发布资源', async () => {
  const post = await getPostData('roller-door-backup-power');
  const mediaPaths = [post.video.src, post.poster, ...post.images.map((image) => image.src)];

  for (const mediaPath of mediaPaths) {
    assert.ok(existsSync(fromPublic(mediaPath)), `缺少媒体资源：${mediaPath}`);
  }

  const videoSize = statSync(fromPublic(post.video.src)).size;
  assert.ok(videoSize > 4_000_000);
  assert.ok(videoSize < 8_000_000);
  assert.ok(statSync(fromPublic(post.poster)).size > 50_000);
  assert.ok(post.images.every((image) => image.alt && image.caption));
});

test('停电应急文章明确兼容性与断电安全边界', async () => {
  const post = await getPostData('roller-door-backup-power');

  assert.match(post.directAnswer, /接口、电压和控制方式均匹配/);
  assert.match(post.contentHtml, /不是所有卷帘门都能通用/);
  assert.match(post.contentHtml, /不要试插、改线/);
  assert.match(post.contentHtml, /不应继续自行操作/);
  assert.match(post.contentHtml, /立即停止并断开储备电源/);
  assert.match(post.contentHtml, /\/services\/remote-control-repair/);
});

test('首页、控制器服务页和相关旧 FAQ 形成可抓取的双向入口', () => {
  const posts = getSortedPostsData();
  const service = SERVICE_PAGES.find((item) => item.slug === 'remote-control-repair');
  const route = getSiteRoutes().find((item) => item.path === '/faq/roller-door-backup-power');
  const remoteFailureSource = readProjectFile('content/faq/remote-failure.md');

  assert.equal(posts[0].slug, 'roller-door-backup-power');
  assert.equal(service.videoGuide.href, '/faq/roller-door-backup-power');
  assert.equal(service.updated, '2026-08-20');
  assert.equal(route.lastModified, '2026-08-20');
  assert.match(remoteFailureSource, /\/faq\/roller-door-backup-power/);
});
