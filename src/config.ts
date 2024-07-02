import type { NavigationLink, Site, User } from './types.ts'

export const SITE: Site = {
    author: 'sppan24',
    url: 'https://sppan24.cn',
    title: 'SPPanLogs',
    description: 'SPPan\'s personal blog, I enjoy the process of building something using any technology stack',
    shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Posts', url: '/posts' },
    { name: 'Category', url: '/categories' },
    { name: 'Timeline', url: '/timeline' },
    { name: 'About', url: '/posts/about' },
    { name: 'Friends', url: '/friends' },
]

export const Friends: User[] = [
    {
        avatar: 'https://images.godruoyi.com/gblog/assets/brand-logo.Z0NyS6D-_1xODv0.webp',
        social: { blog: 'https://godruoyi.com/', github: 'godruoyi' },
        title: 'Hello, Godruoyi.',
        name: '二愣徐',
        description: 'Hi, I am Lianbo, I enjoy the process of building something using any technology stack, welcome to my blog.',
    },
]

export const FooterLinks = [
    {
        section: 'Blog',
        links: [
            { name: 'Posts', url: '/posts' },
            { name: 'Timeline', url: '/timeline' },
            { name: 'Categories', url: '/categories' },
            { name: 'About Me', url: '/posts/about-godruoyi' },
        ],
    },
    {
        section: 'Other',
        links: [
            { name: 'RSS', url: '/rss.xml' },
            { name: 'Site Map', url: '/sitemap-index.xml' },
            { name: 'Twitter', url: 'https://x.com/godruoyi' },
        ],
    },
]

export const GoogleAnalytics = {
    enable: false,
    id: 'G-TKQ4L3ZDSF',
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'inLanguage': 'en-US',
        '@id': SITE.url,
        'url': SITE.url,
        'name': SITE.title,
        'description': SITE.description,
        'isPartOf': {
            '@type': 'WebSite',
            'url': SITE.url,
            'name': SITE.title,
            'description': SITE.description,
        },
    },
}
