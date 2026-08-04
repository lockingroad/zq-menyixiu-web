import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  BRAND_NAME,
  HOME_FAQ_SLUGS,
  HOME_SERVICE_GROUPS,
  SERVICE_PROMISES,
  SERVICE_RESPONSE_NOTE,
  SERVICE_RESPONSE_TEXT,
  repairCases,
} from '../src/lib/config.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function readProjectFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('P0 品牌、响应口径与服务承诺由统一配置提供', () => {
  assert.equal(BRAND_NAME, '枣强门壹修');
  assert.equal(SERVICE_RESPONSE_TEXT, '通常约30分钟响应');
  assert.equal(SERVICE_RESPONSE_NOTE, '实际响应及到达时间以距离和当时工单为准');
  assert.deepEqual(SERVICE_PROMISES, ['价格透明', '不修不收费']);

  const homeSource = readProjectFile('src/app/page.js');
  const headerSource = readProjectFile('src/components/Header.js');
  const footerSource = readProjectFile('src/components/Footer.js');
  const layoutSource = readProjectFile('src/app/layout.js');

  for (const source of [homeSource, headerSource, footerSource, layoutSource]) {
    assert.match(source, /BRAND_NAME/);
  }
  for (const source of [homeSource, footerSource, layoutSource]) {
    assert.match(source, /SERVICE_RESPONSE_TEXT/);
    assert.match(source, /SERVICE_RESPONSE_NOTE/);
    assert.match(source, /SERVICE_PROMISES/);
  }
});

test('首页故障顺序固定，且对应的 Markdown 内容均存在', () => {
  assert.deepEqual(HOME_FAQ_SLUGS, [
    'remote-failure',
    'door-stuck',
    'motor-humming',
    'auto-rebound',
    'spring-broken',
    'rail-rust',
  ]);

  for (const slug of HOME_FAQ_SLUGS) {
    const faqPath = fileURLToPath(new URL(`../content/faq/${slug}.md`, import.meta.url));
    assert.ok(existsSync(faqPath), `FAQ 内容不存在：${slug}`);
  }
});

test('首页服务压缩为四组，精选案例只取两个有图详情案例', () => {
  assert.equal(HOME_SERVICE_GROUPS.length, 4);
  assert.deepEqual(
    HOME_SERVICE_GROUPS.map((group) => group.title),
    ['卷帘门与门体', '电机、遥控与控制', '门禁与锁具', '道闸与车辆出入'],
  );

  const featuredCases = repairCases
    .filter((item) => item.featured && item.slug && item.images?.length > 0)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 2);

  assert.equal(featuredCases.length, 2);
  assert.ok(featuredCases.every((item) => item.images[0].src));
  assert.deepEqual(
    featuredCases.map((item) => item.slug),
    [
      'xintiandi-underground-garage-tubular-motor',
      'hualian-south-industrial-roller-door',
    ],
  );
});

test('首页区块顺序为 Hero、故障、案例、服务、信任', () => {
  const homeSource = readProjectFile('src/app/page.js');
  const positions = ['hero', 'knowledge', 'cases', 'services', 'trust']
    .map((id) => homeSource.indexOf(`id="${id}"`));

  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
});

test('公开源码不再声明旧时效、免费上门或全天营业', () => {
  const sourceFiles = readdirSync(`${projectRoot}/src`, { recursive: true })
    .filter((fileName) => fileName.endsWith('.js'));
  const publicSource = sourceFiles
    .map((fileName) => readFileSync(`${projectRoot}/src/${fileName}`, 'utf8'))
    .join('\n');
  const layoutSource = readProjectFile('src/app/layout.js');

  assert.doesNotMatch(publicSource, /15分钟|免费上门/);
  assert.doesNotMatch(layoutSource, /openingHoursSpecification|priceRange|currenciesAccepted|paymentAccepted|00:00|23:59/);
});

test('移动拨号栏按 Hero 可见状态控制，遥控口稿使用统一响应口径', () => {
  const callBarSource = readProjectFile('src/components/MobileCallBar.js');
  const remoteScript = readFileSync(
    new URL('../../../content/遥控4.0/遥控4.0内容.md', import.meta.url),
    'utf8',
  );

  assert.match(callBarSource, /IntersectionObserver/);
  assert.match(callBarSource, /document\.getElementById\('hero'\)/);
  assert.match(callBarSource, /usePathname/);
  assert.match(callBarSource, /\[pathname\]/);
  assert.match(remoteScript, /通常约30分钟响应/);
  assert.doesNotMatch(remoteScript, /半小时上门/);
});
