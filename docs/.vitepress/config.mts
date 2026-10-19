import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Meridian',
  description: 'Meridian Community — documentación, arquitectura y desarrollo abierto.',
  lang: 'es-DO',
  base: '/-meridian-showcase/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://christianhola.github.io/-meridian-showcase/' },
  head: [
    ['meta', { name: 'theme-color', content: '#f9fafb' }],
    ['meta', { property: 'og:title', content: 'Meridian — Community & Documentation' }],
    ['meta', { property: 'og:description', content: 'Explora el conocimiento, las herramientas y la comunidad Meridian.' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Meridian',
    search: { provider: 'local' },
    outline: { label: 'En esta página', level: [2, 3] },
    docFooter: { prev: 'Anterior', next: 'Siguiente' },
    lastUpdated: { text: 'Actualizado' },
    darkModeSwitchLabel: 'Apariencia',
    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menú',
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Agentes', link: '/agents/' },
      { text: 'Laptop virtual', link: '/desktop/' },
      { text: 'Documentación', link: '/GETTING-STARTED' },
      { text: 'Visión', link: '/vision' },
      { text: 'Comunidad', link: '/community' },
      { text: 'GitHub', link: 'https://github.com/christianhola/-meridian-showcase' }
    ],
    sidebar: [
      { text: 'Descubrir Meridian', items: [
        { text: 'Introducción', link: '/GETTING-STARTED' },
        { text: 'Visión del proyecto', link: '/vision' },
        { text: 'Galería del dashboard', link: '/dashboard' },
        { text: 'Hoja de ruta', link: '/ROADMAP' }
      ] },
      { text: 'Ingeniería', collapsed: false, items: [
        { text: 'Arquitectura', link: '/ARCHITECTURE' },
        { text: 'Flujo de agentes IA', link: '/AI-AGENT-WORKFLOW' },
        { text: 'Runtime de agentes', link: '/AGENT-RUNTIME' },
        { text: 'Daytona Desktop', link: '/AGENT-VIRTUAL-DESKTOP' },
        { text: 'Desarrollo con IA', link: '/AI-ASSISTED-DEVELOPMENT' },
        { text: 'Enrutamiento semántico', link: '/SEMANTIC-ROUTING-MCP' },
        { text: 'Contratos de plugins', link: '/PLUGIN-CONTRACT' }
      ] },
      { text: 'Producto', collapsed: true, items: [
        { text: 'Guía de interfaz', link: '/INTERFACE-GUIDE' },
        { text: 'Agente de código', link: '/MERIDIAN-CODE-AGENT' },
        { text: 'Motor de voz', link: '/MERIDIAN-VOICE-ENGINE' },
        { text: 'Referencias visuales', link: '/DESIGN-REFERENCES-21ST' }
      ] },
      { text: 'Comunidad', collapsed: false, items: [
        { text: 'Participa', link: '/community' },
        { text: 'Manifiesto', link: '/COMMUNITY-MANIFESTO' },
        { text: 'Gobernanza', link: '/GOVERNANCE' },
        { text: 'Política de contribuciones IA', link: '/AI-CONTRIBUTION-POLICY' },
        { text: 'Preparación de lanzamiento', link: '/LAUNCH-READINESS' }
      ] }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/christianhola/-meridian-showcase' }],
    footer: { message: 'Un espacio abierto para aprender, construir y compartir.', copyright: 'Meridian Community · Documentación pública' }
  }
})
