# Astro Doc Notes

- [Astro Doc Notes](#astro-doc-notes)
  - [Sections](#sections)
  - [Notes](#notes)
    - [Core Concepts](#core-concepts)
      - [Why Astro](#why-astro)
      - [Astro Islands](#astro-islands)
    - [Learn the Basics](#learn-the-basics)
      - [Project Structure](#project-structure)
      - [Components](#components)
      - [Pages](#pages)
      - [Layouts](#layouts)
      - [Astro Template Syntax](#astro-template-syntax)
      - [Imports](#imports)
      - [Integrations](#integrations)
    - [Manage your Content](#manage-your-content)

## Sections

- [x] ~~_Core Concepts_~~ [2024-11-19]
  - [x] ~~_Why Astro?_~~ [2024-11-19]
  - [x] ~~_Astro Islands_~~ [2024-11-19]
- [x] ~~_Learn the Basics_~~ [2024-11-19]
  - [x] ~~_Project Structure_~~ [2024-11-19]
  - [x] ~~_Components_~~ [2024-11-19]
  - [x] ~~_Pages_~~ [2024-11-19]
  - [x] ~~_Layouts_~~ [2024-11-19]
  - [x] ~~_Astro Template Syntax_~~ [2024-11-19]
  - [x] ~~_Imports_~~ [2024-11-19]
  - [x] ~~_Integrations_~~ [2024-11-19]
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

#### Project Structure

- Only two reserved directories:
  - 1. `src/pages`
  - 2. `src/content`

#### Components

- \*The most important thing to know about Astro components is that they **don't render on the client** (by default)
- An Astro component has two parts:
  - 1. Component Script
  - 2. Component Template
- Destructure `Astro.props` object to access component props
- Component are passed to a component as attributes
- `Astro.props` can be types via `type Props`
- Layout components can render children components by the `<slot />` tag
  - Names slots are supported: `<slot name="header" />`
    > Use a slot="my-slot" attribute on the child element that you want to pass through to a matching <slot name="my-slot" /> placeholder in your component.
- Use `<Fragment slot="name">` to pass multiple elements without a wrapping tag
- Named slots can be transferred to another component using both the name and slot attributes on a `<slot />` tag

```jsx
<BaseLayout>
  <slot name="head" slot="head" />
  <slot />
</BaseLayout>
```

#### Pages

- Astro makes use of file-based routing
- Link tag `href` should be relative to root domain; not a relative file path
- `404.astro` to create a custom 404 page
- `500.astro` to create a custom error page
  - This custom page is not available for prerendered pages and can’t be prerendered.
- **Page partials** support rendering libraries like `HTMX`

```jsx
---
export const partial = true;
---
```

#### Layouts

- If a layout component contains a page shell, its `<html>` element must be the parent of all other elements in the component. All `<style> or <script> elements must be enclosed by the <html> tags`.
- Layout components can be located with respective child pages by prefixing the filename with `_`
- Nested layouts are supported

#### Astro Template Syntax

- Astro components are templates that **only run once** (i.e. not reactive), during the rendering step.
- Dynamic attributes are coerced to strings; no passing functions as event handlers
- Dynamic tags are possible

```jsx
---
import MyComponent from "./MyComponent.astro";
const Element = 'div'
const Component = MyComponent;
---
<Element>Hello!</Element>
<Component />
```

- <Fragment> component useful when injecting raw html

```jsx
---
const htmlString = '<p>Raw HTML content</p>';
---
<Fragment set:html={htmlString} />
```

#### Imports

- Path aliases are supported

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

- Vite’s `import.meta.glob()` is a way to import many files at once using glob patterns to find matching file paths.
  - It can also be used to dynamically import multiple Astro components via `components.default`

```jsx
---
// imports all files that end with `.astro` in `./src/components/`
const components = Object.values(await import.meta.glob('../components/*.astro', { eager: true }));
---
<!-- Display all of our components -->
{components.map((component) => (
  <div>
    <component.default size={24} />
  </div>
))}
```

- Default Astro file interface

```ts
export interface AstroInstance {
  /* The file path of this file */
  file: string
  /* The URL for this file (if it is in the pages directory) */
  url: string | undefined
  default: AstroComponentFactory
}
```

#### Integrations

- Automatic install: `pnpm astro add [integration]`
- Automatic upgrading of Astro + integrations

```sh
# Upgrade Astro and official integrations together to latest
pnpm dlx @astrojs/upgrade
```

### Manage your Content
