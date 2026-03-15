# Routes

## Router: react-router-dom v7 (BrowserRouter)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Full portfolio homepage with hero, about, stack, work, experience, impact, personal, contact sections |
| `/projects` | `ProjectsPage` | Full project list with all portfolio items |

## Scroll Behavior

`ScrollManager` in `App.tsx` handles:
- Hash-based smooth scrolling (e.g., `/#about`, `/#stack`)
- Scroll-to-top on route change

## Hash Anchors (HomePage)

| Hash | Section |
|------|---------|
| `#top` | Hero |
| `#about` | About Me |
| `#stack` | Tech Stack |
| `#work` | Featured Work |
| `#experience` | Professional Journey |
| `#contact` | Contact |
