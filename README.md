# shaurya.github.io

Personal portfolio site. Vanilla HTML, CSS, JS. Deployed on GitHub Pages.

## Local Development

Open `index.html` in a browser. No build step required.

For live reload during development:
```bash
npx serve .
```

## Customization

- **Add a project**: Duplicate a `<article class="project-card">` block in `index.html`
- **Profile photo**: Replace the placeholder by adding an `<img>` inside `.about__image`
- **Resume**: Drop your PDF at `assets/resume.pdf`

## Structure

```
├── index.html        Single-page portfolio
├── css/style.css     Design system + responsive layout
├── js/main.js        Nav, scroll animations, active tracking
└── assets/
    ├── img/          Profile photo, project screenshots
    └── resume.pdf    Downloadable resume
```
