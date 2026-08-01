import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as caseConfig from '../src/lib/config.js';

const caseSlug = 'hualian-south-industrial-roller-door';
const xintiandiCaseSlug = 'xintiandi-underground-garage-tubular-motor';
const { repairCases } = caseConfig;

test('枣强门市工业卷帘门案例具备可发布的详情数据与图片', () => {
  const repairCase = repairCases.find((item) => item.slug === caseSlug);

  assert.ok(repairCase, `缺少案例 slug：${caseSlug}`);
  assert.equal(repairCase.date, '2026-06-07');
  assert.equal(repairCase.location, '枣强门市');
  assert.match(repairCase.title, /工业卷帘门/);
  assert.match(repairCase.customerReport, /没反应/);
  assert.match(repairCase.customerReport, /空转/);
  assert.match(repairCase.repairProcess, /传动链条/);
  assert.equal(repairCase.douyinUrl, 'https://v.douyin.com/p4_xke7yvjM/');
  assert.equal(repairCase.images.length, 4);

  for (const image of repairCase.images) {
    assert.match(image.src, /^\/images\/cases\/.+\.webp$/);
    assert.ok(image.alt);

    const publicImagePath = fileURLToPath(
      new URL(`../public${image.src}`, import.meta.url),
    );
    assert.ok(existsSync(publicImagePath), `图片不存在：${image.src}`);
  }
});

test('图文案例在地点导航和案例列表中置顶', () => {
  assert.equal(
    typeof caseConfig.groupRepairCasesByLocation,
    'function',
    '缺少可测试的案例分组排序函数',
  );

  const groups = caseConfig.groupRepairCasesByLocation(repairCases);
  const featuredCase = groups[0]?.items[0];

  assert.equal(groups[0]?.location, '新天地');
  assert.equal(featuredCase?.slug, xintiandiCaseSlug);
  assert.equal(featuredCase?.featured, true);
  assert.deepEqual(featuredCase?.badges, ['新案例', '图文实拍']);
  assert.equal(groups[1]?.location, '枣强门市');
});

test('新天地地下车库管状电机案例具备完整详情数据', () => {
  const repairCase = repairCases.find((item) => item.slug === xintiandiCaseSlug);

  assert.ok(repairCase, `缺少案例 slug：${xintiandiCaseSlug}`);
  assert.equal(repairCase.date, '2026-07-26');
  assert.equal(repairCase.location, '新天地');
  assert.match(repairCase.title, /管状电机/);
  assert.match(repairCase.customerReport, /没反应/);
  assert.match(repairCase.inspection, /电机损坏/);
  assert.match(repairCase.repairProcess, /更换/);
  assert.equal(repairCase.images.length, 4);
  assert.equal(repairCase.douyinUrl, 'https://v.douyin.com/zyMRwnGMVN0/');
  assert.equal(
    repairCases.some((item) => item.location === '新天地商业街'),
    false,
  );

  for (const image of repairCase.images) {
    assert.ok(image.alt);

    const publicImagePath = fileURLToPath(
      new URL(`../public${image.src}`, import.meta.url),
    );
    assert.ok(existsSync(publicImagePath), `图片不存在：${image.src}`);
  }
});
