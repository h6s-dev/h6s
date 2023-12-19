/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  output: 'export',
  transpilePackages: ['@h6s/calendar', '@h6s/table'],
}
