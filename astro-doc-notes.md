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
      - [Authoring Content](#authoring-content)
      - [Markdown](#markdown)
      - [Content Collections](#content-collections)
      - [Connect a CMS](#connect-a-cms)
      - [Add an RSS Feed](#add-an-rss-feed)

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
- [x] ~~_Manage your Content_~~ [2024-11-20]
  - [x] ~~_Authoring Content_~~ [2024-11-20]
  - [x] ~~_Markdown_~~ [2024-11-20]
  - [x] ~~_Content collections_~~ [2024-11-20]
  - [x] ~~_Connect a CMS_~~ [2024-11-20]
  - [x] ~~_Add an RSS feed_~~ [2024-11-20]
- [x] ~~_Routes and Navigation_~~ [2024-11-21]
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

#### Authoring Content

- Storyblok and Contentful > good options for headless CMS service

#### Markdown

- Supports [GitHub Flavored Markdown](https://github.com/lifeparticle/Markdown-Cheatsheet)
- Markdown support powered by [remark](https://docs.astro.build/en/guides/markdown-content/#:~:text=is%20powered%20by-,remark,-%2C%20a%20powerful%20parsing)
- Markdown related plugin sites-to-know:
  - [awesome-remark](https://github.com/remarkjs/awesome-remark)
  - [awesome-rehype](https://github.com/rehypejs/awesome-rehype)
- Snippet to implement `remark-toc` and `rehype-accessible-emojis`

```js
import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'

export default defineConfig({
  markdown: {
    remarkPlugins: [[remarkToc, { heading: 'toc', maxDepth: 3 }]],
    rehypePlugins: [rehypeAccessibleEmojis],
  },
})
```

- In order to customize a plugin, provide an options object after it in a nested array (see above)
- [Recipe to add reading time](https://docs.astro.build/en/recipes/reading-time/)
- Special frontmatter `layout` property can be use to provide a page shell around markdown content

#### Content Collections

- Content collections live within the reserved directory `/src/content` as top-level sub-directories `/src/content/blogs`
- Prefixing filenames with `_` will prevent them from being built
- `astro sync` will update the auto-generated metadata directory `.astro`. Beware of dragons.
- `src/content/config.ts` is where the schema for each collection is defined

```ts
// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content'
// 2. Define your collection(s)
const blogCollection = defineCollection({
  /* ... */
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
}
```

```ts
// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
}
```

- `type` can either be `content` for MD/MDX files or `data` for JSON/YAML files
- Astro uses [Zod](https://github.com/colinhacks/zod) to power content schemas

```ts
// Example: A cheatsheet of many common Zod datatypes
import { z, defineCollection } from 'astro:content'

defineCollection({
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    sortOrder: z.number(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    author: z.string().default('Anonymous'),
    language: z.enum(['en', 'es']),
    tags: z.array(z.string()),
    // An optional frontmatter property. Very common!
    footnote: z.string().optional(),
    // In frontmatter, dates written without quotes around them are interpreted as Date objects
    publishDate: z.date(),
    // You can also transform a date string (e.g. "2022-07-08") to a Date object
    // publishDate: z.string().transform((str) => new Date(str)),
    // Advanced: Validate that the string is also an email
    authorContact: z.string().email(),
    // Advanced: Validate that the string is also a URL
    canonicalURL: z.string().url(),
  }),
})
```

- Key methods:

```ts
import { getCollection, getEntry } from 'astro:content'

// Get all entries from a collection.
// Requires the name of the collection as an argument.
// Example: retrieve `src/content/blog/**`
const allBlogPosts = await getCollection('blog')

// Get a single entry from a collection.
// Requires the name of the collection and either
// the entry `slug` (content collections) or `id` (data collections)
// Example: retrieve `src/content/authors/grace-hopper.json`
const graceHopperProfile = await getEntry('authors', 'grace-hopper')
```

- Accessing referenced data example

```ts
---
import { getEntry, getEntries } from 'astro:content';

const blogPost = await getEntry('blog', 'welcome');

// Resolve a singular reference
const author = await getEntry(blogPost.data.author);
// Resolve an array of references
const relatedPosts = await getEntries(blogPost.data.relatedPosts);
```

- `getColletions` takes a second argument as a callback that can be used to filter the response for content collection

```ts
// Example: Filter out content entries with `draft: true`
import { getCollection } from 'astro:content'
const publishedBlogEntries = await getCollection('blog', ({ data }) => {
  return data.draft !== true
})
```

- Type Generic helper

```ts
interface Props {
  post: CollectionEntry<'blog'>
}
```

- Rendering content to HTML

```jsx
---
import { getEntry } from 'astro:content';
const entry = await getEntry('blog', 'post-1');
const { Content, headings } = await entry.render();
---
<p>Published on: {entry.data.published.toDateString()}</p>
<Content />
```

- Generating static output from content collections

```jsx

---
import { getEntry } from 'astro:content';
const entry = await getEntry('blog', 'post-1');
const { Content, headings } = await entry.render();
---
<p>Published on: {entry.data.published.toDateString()}</p>
<Content />
```

- Using SSR with content collections

```jsx
---
import { getEntry } from "astro:content";
// 1. Get the slug from the incoming server request
const { slug } = Astro.params;
if (slug === undefined) {
  throw new Error("Slug is required");
}
// 2. Query for the entry directly using the request slug
const entry = await getEntry("blog", slug);
// 3. Redirect if the entry does not exist
if (entry === undefined) {
  return Astro.redirect("/404");
}
// 4. (Optional) Render the entry to HTML in the template
const { Content } = await entry.render();
---
```

- You can cache unchanged content by adding the following to `astro.config.mjs`
  - `npm run astro build -- --force` to force rebuilding cache

```mjs
{
  experimental: {
    contentCollectionCache: true,
  },
}
```

- Snippet related to `readingTime` implementation

```jsx
---
import { getEntry } from 'astro:content';
const blogPost = await getEntry('blog', 'post-1');
const { remarkPluginFrontmatter } = await blogPost.render();
---
<p>{blogPost.data.title} — {remarkPluginFrontmatter.readingTime}</p>
```

#### Connect a CMS

- Use to generate content if your client doesn't want to write markdown 😮‍💨

#### Add an RSS Feed

- Auto-magically done via Astro's official RSS Feed [integration](https://github.com/withastro/astro/tree/main/packages/astro-rss)
- RSS feed standard format fields:
  - `title`
  - `description`
  - `link`
  - `pubDate`
  - `content`
- Enforce RSS schema helper

```js
import { rssSchema } from '@astrojs/rss'

const blog = defineCollection({
  schema: rssSchema,
})
```

- Be aware of possible issue with [trailing slashes](https://docs.astro.build/en/guides/rss/#removing-trailing-slashes)
- Pretty feed stylesheet
  - [pretty-feed](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl)

```js
// rss.xml.js
rss({
  // ex. use your stylesheet from "public/rss/styles.xsl"
  stylesheet: '/rss/styles.xsl',
  // ...
})
```

- Auto-discovery of RSS feed

```html
{# include in <head> #}
<link
    rel="alternate"
    type="application/rss+xml"
    title="Your Site's Title"
    href={new URL("rss.xml", Astro.site)}
/>
```
