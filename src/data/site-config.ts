export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Adam almounayar',
    subtitle: 'A Software Engineer',
    description: 'Currently Working at Amadeus s.a.s',
    image: {
        src: '',
        alt: 'Adam - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/MySite/'
        },
        {
            text: 'Projects',
            href: '/MySite/projects'
        },
        {
            text: 'Blog',
            href: '/MySite/blog'
        },
        {
            text: 'Tags',
            href: '/MySite/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/MySite/about'
        },
        {
            text: 'Contact',
            href: '/MySite/contact'
        },
        
    ],
    socialLinks: [
        {
            text: 'TikTok',
            href: 'https://www.tiktok.com/@adxdit'
        },
        {
            text: 'Instagram',
            href: 'https://www.instagram.com/adamxmounayar/'
        },
        {
            text: 'Github',
            href: 'https://github.com/adxdits'
        }
    ],
    hero: {
        title: 'Hi There & Welcome to My Corner of the Web!',
        text: "I'm **Adam**, Hello, I am a Software Engineer based in Paris, currently working at Amadeus S.A.S. With a strong passion for web development and machine learning algorithms, I specialize in building innovative solutions that bridge the gap between cutting-edge technology and user-friendly applications. ",
        image: {
            src: '/MySite/me.png',
            alt: 'image'
        },
        actions: [
            {
                text: 'Hire Me',
                href: '/MySite/contact'
            }
        ]
    },
    
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
