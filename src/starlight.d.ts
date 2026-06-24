// Starlight 虚拟模块类型声明
// astro check 无法识别 Vite 虚拟模块，此处做兜底声明

declare module 'virtual:starlight/user-config' {
  const config: {
    pagefind?: boolean;
    components?: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  export default config;
}

declare module 'virtual:starlight/components/LanguageSelect' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LanguageSelect: any;
  export default LanguageSelect;
}

declare module 'virtual:starlight/components/Search' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Search: any;
  export default Search;
}

declare module 'virtual:starlight/components/SiteTitle' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SiteTitle: any;
  export default SiteTitle;
}

declare module 'virtual:starlight/components/SocialIcons' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SocialIcons: any;
  export default SocialIcons;
}

declare module '@astrojs/starlight/components/PageSidebar.astro' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PageSidebar: any;
  export default PageSidebar;
}

declare module '@astrojs/starlight/components/Pagination.astro' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Pagination: any;
  export default Pagination;
}

declare module 'virtual:starlight/components/ThemeSelect' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ThemeSelect: any;
  export default ThemeSelect;
}
