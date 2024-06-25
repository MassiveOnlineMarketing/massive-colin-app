export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      sitemap: 'https://massiveonlinemarketing.nl/sitemap.xml',
    }
  }