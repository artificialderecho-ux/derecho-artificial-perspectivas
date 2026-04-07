import { spawnSync } from 'node:child_process';

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', env: process.env });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('next', ['build']);

if (!process.env.VERCEL) {
  run('next-sitemap', ['--config', 'next-sitemap.config.cjs']);
} else {
  console.log('Skipping next-sitemap on Vercel to reduce build memory usage.');
}
