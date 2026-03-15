# Page Dependency Trees

## HomePage (src/pages/HomePage.tsx)

```
src/pages/HomePage.tsx
├── src/components/Navigation.tsx
│   ├── src/components/ButtonLink.tsx
│   └── src/types/content.ts
├── src/components/Footer.tsx
├── src/components/ButtonLink.tsx
├── src/components/ContactLinkRow.tsx
│   └── src/components/Icon.tsx
│       └── src/types/content.ts
├── src/components/Icon.tsx (AccentIcon)
├── src/components/ImpactCard.tsx
│   ├── src/components/Icon.tsx
│   └── src/data/motion.ts
├── src/components/PersonalCard.tsx
│   └── src/data/motion.ts
├── src/components/ProjectCard.tsx
│   ├── src/components/Tag.tsx
│   └── src/data/motion.ts
├── src/components/Reveal.tsx
│   └── src/data/motion.ts
├── src/components/SectionHeading.tsx
│   └── src/types/content.ts
├── src/components/TechCard.tsx
│   ├── src/components/Icon.tsx
│   └── src/data/motion.ts
├── src/components/TimelineItem.tsx
│   ├── src/components/Tag.tsx
│   └── src/data/motion.ts
├── src/data/home.ts
│   └── src/types/content.ts
├── src/data/motion.ts
├── src/data/projects.ts
│   └── src/types/content.ts
├── src/data/site.ts
│   └── src/types/content.ts
├── src/types/content.ts
└── src/index.css (global styles)
```

## ProjectsPage (src/pages/ProjectsPage.tsx)

```
src/pages/ProjectsPage.tsx
├── src/components/Navigation.tsx
│   └── (same subtree as above)
├── src/components/Footer.tsx
├── src/components/ProjectCard.tsx
│   └── (same subtree as above)
├── src/components/Reveal.tsx
│   └── src/data/motion.ts
├── src/components/SectionHeading.tsx
├── src/data/home.ts (projectsPageIntro)
├── src/data/motion.ts
├── src/data/projects.ts
├── src/data/site.ts
└── src/index.css (global styles)
```
