import fs from 'fs';
import path from 'path';
import { notifyGoogle } from '../lib/notify-google.js';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

async function getUrlsFromSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Error: Sitemap not found at ${sitemapPath}`);
    console.error('Please run "npm run build" first to generate the sitemap.');
    return [];
  }
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  return urls.map(url => url.replace('<loc>', '').replace('</loc>', ''));
}

async function indexAllPosts() {
  console.log('Starting bulk indexing of all posts from sitemap...');
  
  const allUrls = await getUrlsFromSitemap(SITEMAP_PATH);

  if (allUrls.length === 0) {
    return;
  }

  console.log(`Found ${allUrls.length} URLs to index.`);

  for (const [index, url] of allUrls.entries()) {
    try {
      console.log(`[${index + 1}/${allUrls.length}] Notifying ${url}`);
      await notifyGoogle(url);
    } catch (error) {
      console.error(`  Error notifying ${url}:`, error.message);
    }
  }

  console.log('\nBulk indexing process completed.');
}

indexAllPosts();
