import fs from 'fs';
import path from 'path';
import { notifyGoogle } from '../lib/notify-google.js';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const PREVIOUS_SITEMAP_PATH = path.join(process.cwd(), '.next', 'sitemap.xml.old');

async function getUrlsFromSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    return [];
  }
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  return urls.map(url => url.replace('<loc>', '').replace('</loc>', ''));
}

async function notifyNewPosts() {
  const currentUrls = await getUrlsFromSitemap(SITEMAP_PATH);
  const previousUrls = await getUrlsFromSitemap(PREVIOUS_SITEMAP_PATH);

  const newUrls = currentUrls.filter(url => !previousUrls.includes(url));

  if (newUrls.length === 0) {
    console.log('No new posts to notify.');
    return;
  }

  console.log(`Found ${newUrls.length} new posts to notify:`);
  for (const url of newUrls) {
    try {
      console.log(`- Notifying ${url}`);
      await notifyGoogle(url);
    } catch (error) {
      console.error(`  Error notifying ${url}:`, error.message);
    }
  }

  fs.copyFileSync(SITEMAP_PATH, PREVIOUS_SITEMAP_PATH);
  console.log('\nUpdated previous sitemap.');
}

notifyNewPosts();
