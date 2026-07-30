import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { repairCases } from '../src/lib/config.js';

const caseSlug = 'hualian-south-industrial-roller-door';

test('华联南侧工业卷帘门案例具备可发布的详情数据与图片', () => {
  const repairCase = repairCases.find((item) => item.slug === caseSlug);

  assert.ok(repairCase, `缺少案例 slug：${caseSlug}`);
  assert.equal(repairCase.date, '2026-06-07');
  assert.equal(repairCase.location, '枣强华联南边门市');
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
