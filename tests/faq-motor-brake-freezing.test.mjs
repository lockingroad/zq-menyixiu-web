import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { getPostData } from '../src/lib/markdown.js';
import { getServicePageBySlug } from '../src/lib/service-pages.js';
import { getSiteRoutes } from '../src/lib/site-routes.js';

const slug = 'roller-door-motor-brake-freezing';

test('电机1保留历史来源，站内日期不冒充抖音发布日期', async () => {
  const post = await getPostData(slug);
  assert.equal(post.sourceUrl, 'https://v.douyin.com/DXMBU8TJd-4/');
  assert.equal(post.date, '2026-10-26');
  assert.equal(post.video.uploadDate, '2026-10-26T00:00:00+08:00');
  assert.equal(post.performance, null);
  assert.match(post.contentHtml, /不代表抖音原始发布日期/);
  for (const url of [post.video.src, post.poster, ...post.images.map(image => image.src)]) {
    assert.ok(existsSync(new URL(`../public${url}`, import.meta.url)), `缺少资源 ${url}`);
  }
});

test('闷响内容明确先停用断电，不将演示和电流倍数当作确诊', async () => {
  const post = await getPostData(slug);
  assert.match(post.directAnswer, /停止反复按遥控器/);
  assert.match(post.directAnswer, /断开卷帘门电源/);
  assert.match(post.directAnswer, /仅凭声音不能确认/);
  assert.match(post.contentHtml, /未提供可核验的电流测量记录/);
  assert.match(post.faqs.map(faq => faq.answer).join(' '), /不要自行拆刹车/);
  assert.match(post.contentHtml, /\/faq\/motor-humming/);
});

test('电机服务与旧FAQ链接到新视频，sitemap反映更新日期', () => {
  const service = getServicePageBySlug('motor-limit-repair');
  assert.ok(service.relatedFaqs.some(faq => faq.href === `/faq/${slug}`));
  const previous = readFileSync(new URL('../content/faq/motor-humming.md', import.meta.url), 'utf8');
  assert.ok(previous.includes(`/faq/${slug}`));
  const routes = getSiteRoutes();
  for (const path of [`/faq/${slug}`, '/faq/motor-humming', '/services/motor-limit-repair']) {
    assert.equal(routes.find(route => route.path === path).lastModified, '2026-10-26');
  }
});
