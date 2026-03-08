const fs = require('fs');
const path = require('path');
const file = path.join('src', 'app', 'firma-scarpa', '[slug]', 'page.tsx');
let c = fs.readFileSync(file, 'utf8');

// Fix 1: generateMetadata
c = c.replace(
  `if (mdxPost && mdxPost.frontmatter.category === "firma-scarpa") {
    const { title, description, category, date } = mdxPost.frontmatter;`,
  `if (mdxPost && (mdxPost.frontmatter.category === "firma-scarpa" || (mdxPost.frontmatter.section || "").toLowerCase() === "firma-scarpa")) {
    const { title, description, category, date, section } = mdxPost.frontmatter;`
);

// Fix 2: FirmaScarpaSlugPage
c = c.replace(
  `const mdxPost = getPostBySlug(slug);
  if (mdxPost && mdxPost.frontmatter.category === "firma-scarpa") {`,
  `const mdxPost = getPostBySlug(slug);
  if (mdxPost && (mdxPost.frontmatter.category === "firma-scarpa" || (mdxPost.frontmatter.section || "").toLowerCase() === "firma-scarpa")) {`
);

fs.writeFileSync(file, c, 'utf8');
console.log('OK - fixes aplicados');
