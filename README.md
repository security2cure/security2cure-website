# Security2Cure Website

A modern Jekyll website for [Security2Cure](https://www.security2cure.com.au/), an annual cyber security conference and registered charity.

## Quick Start

**Prerequisites:** Ruby **3.1+** (this project pins **3.3.8** in `.ruby-version`) and Bundler.

```bash
./bin/setup          # once: install gems into vendor/bundle
./bin/serve          # dev server with live reload → http://localhost:4000
./bin/build          # production output in _site/
```

Or manually: `bundle config set --local path 'vendor/bundle'`, then `bundle install`, then `bundle exec jekyll serve`.

See **[SETUP.md](SETUP.md)** for **macOS**, Windows, and Linux setup (including Ruby installation and troubleshooting).

## Features

- Conference countdown timer
- Data-driven schedule and sponsors (YAML)
- Archive pages for past conferences
- Donations, about, and contact pages
- Responsive dark theme with modern typography
- SEO, sitemap, and RSS feed via Jekyll plugins

## Deploying to GitHub Pages

Pushes to `main` run [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the site with Jekyll and deploys it to GitHub Pages.

**One-time setup in GitHub:**

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually under **Actions → Deploy to GitHub Pages → Run workflow**).

For this repository (`bman013/security2cure`), the default site URL is:

**https://bman013.github.io/security2cure/**

To use a custom domain (e.g. `www.security2cure.com.au`), add it under **Settings → Pages → Custom domain** and configure DNS with your provider.

## License

Content © Security2Cure Ltd. Website source available for conference organisers.
