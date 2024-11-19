# Astro Doc Notes

- [Astro Doc Notes](#astro-doc-notes)
  - [Sections](#sections)
  - [Notes](#notes)
    - [Core Concepts](#core-concepts)
      - [Why Astro](#why-astro)
      - [Astro Islands](#astro-islands)
    - [Learn the Basics](#learn-the-basics)

## Sections

- [x] ~~_Core Concepts_~~ [2024-11-19]
  - [x] ~~_Why Astro?_~~ [2024-11-19]
  - [x] ~~_Astro Islands_~~ [2024-11-19]
- [ ] Learn the Basics
  - [ ] Project Structure
  - [ ] Components
  - [ ] Pages
  - [ ] Layouts
  - [ ] Astro Template Syntax
  - [ ] Imports
  - [ ] Integrations
- [ ] Manage your Content
  - [ ] Markdown
  - [ ] Content collections
  - [ ] Connect a CMS
  - [ ] Add an RSS feed
- [ ] Routes and Navigation
  - [ ] Routing
  - [ ] Endpoints
  - [ ] Actions
  - [ ] Prefetch
  - [ ] Middleware
  - [ ] Internationalization
  - [ ] View Transitions
  - [ ] Server Islands
  - [ ] On-demand rendering
- [ ] Assets
  - [ ] CSS & Styling
  - [ ] Images
  - [ ] Fonts
  - [ ] Syntax Highlighting
  - [ ] Connect Hosted Media or DAM
- [ ] Connect Your Data
  - [ ] Data Fetching
  - [ ] Astro DB
  - [ ] Add Backend Services
  - [ ] E-commerce
  - [ ] Authentication
  - [ ] Environment Variables
- [ ] Client-Side Interactivity
  - [ ] UI Frameworks
  - [ ] Scripts & Event Handling
- [ ] Maintain Your Project
  - [ ] Upgrade Astro
  - [ ] Testing
  - [ ] Troubleshooting
- [ ] Recipes and Resources
  - [ ] How-to Recipes
  - [ ] Community Resources
- [ ] Reference
  - [ ] Configuration
  - [ ] Astro CLI
  - [ ] Directives Reference
  - [ ] TypeScript Reference
  - [ ] Error Reference
- [ ] Astro API Reference
  - [ ] Astro Runtime API
  - [ ] astro:actions
  - [ ] astro:assets
  - [ ] astro:content
  - [ ] astro:env
  - [ ] astro:i18n
  - [ ] astro:middleware
  - [ ] astro:transitions
- [ ] Other Development APIs
  - [ ] Integrations API
  - [ ] Adapter API
  - [ ] Image Service API
  - [ ] Dev Toolbar App API
  - [ ] Content Loader API
  - [ ] Container API (Experimental)
  - [ ] Programmatic Astro API (Experimental)

## Notes

### Core Concepts

#### Why Astro

- **Astro** is _the_ web framework for building **content-driven websites**
- Features:
  - **Islands** architecture pattern
  - UI-agnostic
  - Server-first
  - Zero JS by default
  - Content Collections

#### Astro Islands

- **partial** or **selective hydration** of isolated dynamic regions within a server rendered HTML document
- _An Astro island is an enhanced UI component on an otherwise static page of HTML_
- Two types of islands:
  - 1. **Server Islands** (default): rendered on the server (static placeholder content used while awaiting server-rendered dynamic content to load)
  - 2. **Client Islands**: rendered on the client

### Learn the Basics
