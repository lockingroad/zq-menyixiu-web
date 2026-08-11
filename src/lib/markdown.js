import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/faq');

function normalizeVideo(video) {
  if (!video) return null;

  if (typeof video === 'string') {
    return { src: video, mimeType: 'video/mp4' };
  }

  if (typeof video === 'object' && (video.src || video.url)) {
    return {
      ...video,
      src: video.src || video.url,
      mimeType: video.mimeType || 'video/mp4',
    };
  }

  return null;
}

function normalizeImages(images, title) {
  if (!Array.isArray(images)) return [];

  return images
    .map((image, index) => {
      if (typeof image === 'string') {
        return { src: image, alt: `${title || 'FAQ'}步骤图 ${index + 1}` };
      }

      if (image && typeof image === 'object' && (image.src || image.url)) {
        return {
          ...image,
          src: image.src || image.url,
          alt: image.alt || `${title || 'FAQ'}步骤图 ${index + 1}`,
        };
      }

      return null;
    })
    .filter(Boolean);
}

function normalizeFaqs(faqs) {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .filter((faq) => faq && typeof faq === 'object' && faq.question && faq.answer)
    .map((faq) => ({
      question: String(faq.question),
      answer: String(faq.answer),
    }));
}

function normalizePerformance(performance) {
  if (!performance || typeof performance !== 'object' || !performance.asOf) return null;

  return {
    asOf: String(performance.asOf),
    plays: Number(performance.plays) || 0,
    playsLabel: performance.playsLabel || String(performance.plays || 0),
    likes: Number(performance.likes) || 0,
    favorites: Number(performance.favorites) || 0,
  };
}

function normalizeRelatedService(relatedService) {
  if (!relatedService || typeof relatedService !== 'object' || !relatedService.href) return null;

  return {
    href: String(relatedService.href),
    label: relatedService.label || '查看相关维修服务',
    description: relatedService.description || '',
  };
}

// 所有 FAQ 统一返回完整内容模型；旧 Markdown 未声明 P1 字段时也保持兼容。
export function normalizePostMetadata(data = {}) {
  const video = normalizeVideo(data.video);

  return {
    ...data,
    updated: data.updated || data.date || null,
    directAnswer: data.directAnswer || data.excerpt || null,
    sourceUrl: data.sourceUrl || null,
    video,
    poster: data.poster || video?.poster || null,
    images: normalizeImages(data.images, data.title),
    galleryTitle: data.galleryTitle || null,
    faqSectionTitle: data.faqSectionTitle || null,
    faqs: normalizeFaqs(data.faqs),
    performance: normalizePerformance(data.performance),
    relatedService: normalizeRelatedService(data.relatedService),
    reviewer: data.reviewer || null,
  };
}

export function getSortedPostsData() {
  // Get file names under /content/faq
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const metadata = normalizePostMetadata(matterResult.data);

    // Combine the data with the slug
    return {
      slug,
      ...metadata,
    };
  });

  // 精选视频 FAQ 固定在知识库前部；其余内容仍按原发布日期排序，避免伪造更新时间。
  return allPostsData.sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }

    if (a.featured && b.featured) {
      const rankDifference = (Number(a.featuredOrder) || 999) - (Number(b.featuredOrder) || 999);
      if (rankDifference !== 0) return rankDifference;
    }

    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    }

    return a.slug.localeCompare(b.slug, 'zh-CN');
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const metadata = normalizePostMetadata(matterResult.data);

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...metadata,
  };
}
