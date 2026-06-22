# Load rbenv when available so bin scripts work even if the shell
# has not sourced ~/.zshrc yet (common on fresh macOS terminals).
if [[ -d "${HOME}/.rbenv/bin" ]]; then
  export PATH="${HOME}/.rbenv/bin:${HOME}/.local/bin:${PATH}"
  # shellcheck disable=SC1090
  eval "$(rbenv init - bash 2>/dev/null || rbenv init -)"
fi

if ! command -v ruby >/dev/null 2>&1; then
  echo "Ruby is not installed. See SETUP.md for macOS/Linux/Windows instructions." >&2
  exit 1
fi

if ! ruby -e 'exit(Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.1.0") ? 0 : 1)'; then
  echo "Ruby 3.1+ is required. Current: $(ruby -v)" >&2
  echo "macOS ships with Ruby 2.6 — install Ruby 3.3.8 via rbenv (see SETUP.md)." >&2
  exit 1
fi
