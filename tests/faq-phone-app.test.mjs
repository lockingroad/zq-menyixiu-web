import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { getPostData, getSortedPostsData } from '../src/lib/markdown.js';
import { HOME_FAQ_SLUGS } from '../src/lib/config.js';
import { getServicePageBySlug } from '../src/lib/service-pages.js';
import { getSiteRoutes } from '../src/lib/site-routes.js';

const slug = 'phone-app-433mhz-roller-door';
const publicFile = url => new URL(`../public${url}`, import.meta.url);

test('手机APP视频提供可播放资源，不虚构平台来源与表现数据', async () => {
  const post = await getPostData(slug);
  assert.equal(post.date, '2026-11-13');
  assert.equal(post.video.uploadDate, '2026-11-13T00:00:00+08:00');
  assert.equal(post.sourceUrl, null);
  assert.equal(post.performance, null);
  assert.equal(post.video.label, '原理讲解');
  assert.equal(getSortedPostsData().find(post => post.slug === slug).video.label, '原理讲解');
  for (const url of [post.video.src, post.poster, ...post.images.map(image => image.src)]) {
    assert.ok(existsSync(publicFile(url)), `缺少媒体：${url}`);
  }
  const video = readFileSync(publicFile(post.video.src));
  assert.ok(video.includes(Buffer.from('avc1')), '应发布H.264而非HEVC原片');
  assert.ok(video.indexOf(Buffer.from('moov')) < video.indexOf(Buffer.from('mdat')), '应支持快速加载');
});

test('手机遥控说明区分软件、硬件与兼容性，不把预告当报价', async () => {
  const post = await getPostData(slug);
  assert.match(post.directAnswer, /没有匹配的发射硬件或外接配件/);
  assert.match(post.directAnswer, /加装兼容的网关、控制器/);
  assert.match(post.contentHtml, /不等于所有门都能用/);
  assert.match(post.contentHtml, /developer\.android\.com/);
  assert.match(post.contentHtml, /developer\.apple\.com/);
  assert.match(post.contentHtml, /ibroadlink\.com/);
  const answers = post.faqs.map(faq => faq.answer).join(' ');
  assert.match(answers, /不是通用报价/);
  assert.doesNotMatch(`${post.directAnswer} ${post.contentHtml} ${answers}`, /随叫随到|绝对发不出|所有手机都没有/);
});

test('首页、服务页和旧FAQ提供入口，站点地图反映本次发布时间', async () => {
  assert.equal(HOME_FAQ_SLUGS[0], slug);
  const service = getServicePageBySlug('remote-control-repair');
  assert.ok(service.relatedFaqs.some(faq => faq.href === `/faq/${slug}`));
  assert.ok((await getPostData('remote-failure')).contentHtml.includes(`/faq/${slug}`));
  const post = await getPostData(slug);
  assert.equal(post.relatedService.href, '/services/remote-control-repair');
  assert.match(post.contentHtml, /\/faq\/remote-failure/);
  const routes = getSiteRoutes();
  for (const path of [`/faq/${slug}`, '/faq/remote-failure', '/services/remote-control-repair', '/', '/faq']) {
    assert.equal(routes.find(route => route.path === path).lastModified, '2026-11-13');
  }
});
