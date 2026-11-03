import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { getPostData } from '../src/lib/markdown.js';
import { HOME_FAQ_SLUGS } from '../src/lib/config.js';
import { getServicePageBySlug } from '../src/lib/service-pages.js';
import { getSiteRoutes } from '../src/lib/site-routes.js';

const slug = 'roller-door-controller-plug-mistakes';
const publicFile = url => new URL(`../public${url}`, import.meta.url);

test('控制器插头视频保留来源，使用真实站内日期和浏览器兼容媒体', async () => {
  const post = await getPostData(slug);
  assert.equal(post.sourceUrl, 'https://v.douyin.com/PSl4LMKcYyA/');
  assert.equal(post.date, '2026-11-03');
  assert.equal(post.video.uploadDate, '2026-11-03T00:00:00+08:00');
  assert.equal(post.performance, null);
  assert.match(post.contentHtml, /本站整理日期/);
  for (const url of [post.video.src, post.poster, ...post.images.map(image => image.src)]) {
    assert.ok(existsSync(publicFile(url)), `缺少资源：${url}`);
  }
  // 检查真实编码，防止直接发布浏览器支持不一致的 HEVC 原片。
  const video = readFileSync(publicFile(post.video.src));
  assert.ok(video.includes(Buffer.from('avc1')), '网站版应为 H.264');
  assert.ok(video.indexOf(Buffer.from('moov')) < video.indexOf(Buffer.from('mdat')), '视频应支持快速加载');
  assert.equal(post.video.width, 720);
  assert.equal(post.video.height, 1280);
});

test('控制器误插说明包含断电、兼容性和停止试电的边界', async () => {
  const post = await getPostData(slug);
  const text = [post.directAnswer, post.contentHtml, ...post.faqs.map(faq => faq.answer)].join(' ');
  assert.match(post.directAnswer, /先断电/);
  assert.match(text, /电压.*针脚/);
  assert.match(text, /固定倒钩/);
  assert.match(text, /不要反复合闸/);
  assert.match(text, /插对方向不等于一定安全/);
  assert.doesNotMatch(text, /插反必烧|插对绝不会烧|内部早已短路烧熔/);
  assert.equal(post.faqs.length, 3);
});

test('首页、控制器服务页与相关旧FAQ提供入口，站点地图日期同步', async () => {
  assert.equal(HOME_FAQ_SLUGS[0], slug);
  const service = getServicePageBySlug('remote-control-repair');
  assert.ok(service.relatedFaqs.some(faq => faq.href === `/faq/${slug}`));
  const previous = await getPostData('remote-failure');
  assert.ok(previous.contentHtml.includes(`/faq/${slug}`));
  const post = await getPostData(slug);
  assert.equal(post.relatedService.href, '/services/remote-control-repair');
  assert.match(post.contentHtml, /\/faq\/remote-failure/);
  const routes = getSiteRoutes();
  for (const path of [`/faq/${slug}`, '/faq/remote-failure', '/services/remote-control-repair', '/', '/faq']) {
    assert.equal(routes.find(route => route.path === path).lastModified, '2026-11-03');
  }
});
