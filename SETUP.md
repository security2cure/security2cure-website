# Security2Cure Website: Local Development Setup

This guide walks you through setting up a **local Ruby environment** to build and preview the Security2Cure Jekyll website on **macOS**, **Linux**, or **Windows**.

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Ruby        | 3.1+    | Project pins **3.3.8** in `.ruby-version` |
| Bundler     | 2.6+    | Installed via `gem install bundler` |
| Git         | Any     | Optional, for version control |

### macOS

| Requirement | Notes |
|-------------|-------|
| macOS 12+   | Tested on Apple Silicon and Intel |
| Xcode Command Line Tools | Run `xcode-select --install` if `git` or `make` are missing |
| rbenv (recommended) | Avoid the system Ruby at `/usr/bin/ruby` (usually 2.6.x, too old) |

### Linux (Debian/Ubuntu/Kali)

```bash
sudo apt install ruby-full build-essential
gem install bundler
```

Use rbenv or your distro packages if you need Ruby 3.3.x specifically.

### Windows

| Requirement | Notes |
|-------------|-------|
| Ruby        | Install via [RubyInstaller for Windows](https://rubyinstaller.org/) |
| Ruby DevKit | MSYS2 — included with RubyInstaller; run `ridk install` when prompted |

> **Tip (Windows):** During RubyInstaller setup, check **"Add Ruby executables to your PATH"** and allow the MSYS2 development toolchain installation to complete.

## Quick Start

From the project directory:

```bash
./bin/setup    # install gems (first time only)
./bin/serve    # preview at http://localhost:4000
./bin/build    # write static site to _site/
```

### Windows (PowerShell)

```powershell
bundle config set --local path 'vendor/bundle'
bundle install
bundle exec jekyll serve
```

Open your browser at **http://localhost:4000**. Press `Ctrl+C` to stop the server.

## Virtual Environment Explained

Ruby does not use Python-style `venv` folders. Instead, **Bundler** isolates project gems into `vendor/bundle/`. This is your virtual environment:

```
Security2Cure/
├── vendor/bundle/     ← Gems installed here (git-ignored)
├── .bundle/           ← Local Bundler config (git-ignored)
├── Gemfile            ← Declares required gems
└── Gemfile.lock       ← Pinned gem versions (commit this file)
```

This keeps Jekyll and its dependencies separate from your system Ruby installation and other projects.

### Why `bundle exec`?

Always prefix Jekyll commands with `bundle exec` to ensure the project-local gem versions are used:

```bash
bundle exec jekyll serve      # Development server with live reload
bundle exec jekyll build      # Build static site to _site/
bundle exec jekyll serve --livereload   # Auto-refresh on file changes
```

The `./bin/serve` and `./bin/build` scripts do this for you.

## First-Time Ruby Installation (macOS)

macOS ships with an old system Ruby (2.6.x). **Do not use it** for this project — Bundler and Jekyll require Ruby 3.1+.

### Option A: Homebrew + rbenv (recommended)

Requires [Homebrew](https://brew.sh/) and administrator access:

```bash
# Install Homebrew if needed (see https://brew.sh/)
brew install rbenv ruby-build

# Enable rbenv in your shell (~/.zshrc on macOS)
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc

# Install the project Ruby version
rbenv install 3.3.8
cd /path/to/s2c_prod
rbenv local 3.3.8    # reads .ruby-version automatically

gem install bundler
./bin/setup
```

### Option B: rbenv without Homebrew

If you cannot install Homebrew, rbenv can be installed from source:

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

echo 'export PATH="$HOME/.rbenv/bin:$HOME/.local/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

If `rbenv install 3.3.8` fails building the `psych` extension, install libyaml first:

```bash
mkdir -p ~/.local/src && cd ~/.local/src
curl -fsSL -o yaml-0.2.5.tar.gz https://github.com/yaml/libyaml/releases/download/0.2.5/yaml-0.2.5.tar.gz
tar xzf yaml-0.2.5.tar.gz && cd yaml-0.2.5
./configure --prefix="$HOME/.local" && make -j$(sysctl -n hw.ncpu) && make install

RUBY_CONFIGURE_OPTS="--with-libyaml-dir=$HOME/.local" rbenv install 3.3.8
```

Then set the local version and install gems:

```bash
cd /path/to/s2c_prod
rbenv local 3.3.8
gem install bundler
./bin/setup
```

### Verify macOS setup

```bash
which ruby          # should be ~/.rbenv/shims/ruby, not /usr/bin/ruby
ruby --version      # ruby 3.3.8
bundle --version    # 2.6.x
```

Restart your terminal after changing `~/.zshrc`.

## First-Time Ruby Installation (Windows)

If Ruby is not yet installed:

1. Download **Ruby+Devkit 3.3.x (x64)** from [rubyinstaller.org/downloads](https://rubyinstaller.org/downloads/)
2. Run the installer with default options
3. At the end, a terminal opens. Select option **3** to install MSYS2 and the development toolchain
4. Verify installation:

```powershell
ruby --version    # Should show 3.x.x
gem --version     # Should show 3.x.x
```

5. Install Bundler globally (one-time):

```powershell
gem install bundler
```

Then return to the [Quick Start](#quick-start) steps above.

## Common Commands

| Command | Description |
|---------|-------------|
| `bundle exec jekyll serve` | Start dev server at localhost:4000 |
| `bundle exec jekyll serve --drafts` | Include draft posts |
| `bundle exec jekyll build` | Generate production site in `_site/` |
| `bundle exec jekyll clean` | Remove generated files and caches |
| `bundle update` | Update gems to latest compatible versions |

## Updating Content

Most content is data-driven. Edit these files and refresh your browser:

| Content | File(s) |
|---------|---------|
| Conference date, venue, countdown | `_config.yml` → `conference:` section |
| Current year schedule | `_data/schedule.yml` |
| Current year sponsors | `_data/sponsors.yml` |
| About page | `about.md` |
| Donations page | `donations.md` |
| Past conferences | `_archives/*.md` + `_data/archives/*.yml` |
| Site styling | `assets/css/*.scss` |

After editing `_config.yml`, restart the Jekyll server (changes to config are not hot-reloaded).

## Production Build

To generate the static site for deployment:

```bash
bundle exec jekyll build
# or
./bin/build
```

Output is written to `_site/`. Deploy this folder to your hosting provider (GitHub Pages, Netlify, Cloudflare Pages, etc.).

### GitHub Pages

This repository deploys via GitHub Actions (see `.github/workflows/pages.yml`). Enable **Settings → Pages → Source: GitHub Actions** in the repository.

## Troubleshooting

### `ruby --version` shows 2.6.x on macOS

You are using the system Ruby. Install rbenv (see [macOS setup](#first-time-ruby-installation-macos)), restart your terminal, and confirm `which ruby` points to `~/.rbenv/shims/ruby`.

### `bundle: command not found`

Bundler is not installed. Run:

```bash
gem install bundler
```

On macOS with rbenv, run this **after** `rbenv local 3.3.8` so gems install for the correct Ruby.

### `Could not find 'bundler' (2.6.7)` 

Install the locked Bundler version:

```bash
gem install bundler -v 2.6.7
```

### `jekyll: command not found` (without bundle exec)

Use `bundle exec jekyll serve` or `./bin/serve` instead of `jekyll serve`.

### Native extension build errors (Windows)

Ensure the MSYS2 dev toolchain is installed:

```powershell
ridk install
```

Select option **3** (MSYS2 and MINGW development toolchain).

### Native extension build errors (macOS)

- Ensure Xcode Command Line Tools are installed: `xcode-select --install`
- If `rbenv install` fails on `psych`, see [libyaml steps](#option-b-rbenv-without-homebrew) above

### Port 4000 already in use

Use a different port:

```bash
bundle exec jekyll serve --port 4001
```

### Sass deprecation warnings

These are harmless warnings from Jekyll's Sass processor and do not affect the site.

## Project Structure

```
Security2Cure/
├── _config.yml           Site configuration
├── _data/                YAML data (schedules, sponsors)
├── _includes/            Reusable HTML components
├── _layouts/             Page templates
├── _archives/            Past conference pages
├── assets/               CSS, JavaScript, images
├── about.md              About page
├── donations.md          Donations page
├── contact.md            Contact page
├── archives.html         Archive index
├── index.html            Homepage
├── Gemfile               Ruby dependencies
└── SETUP.md              This file
```

## Need Help?

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Bundler Documentation](https://bundler.io/)
- [rbenv Documentation](https://github.com/rbenv/rbenv)
- Contact: hello@security2cure.com.au
