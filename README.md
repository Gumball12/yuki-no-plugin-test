# @gumball12/yuki-no-plugin-test

A test plugin for [yuki-no](https://github.com/Gumball12/yuki-no) that demonstrates all lifecycle hooks.

## Installation

```bash
pnpm add @gumball12/yuki-no-plugin-test
```

## Usage

Add the plugin to your yuki-no workflow:

```yaml
- uses: Gumball12/yuki-no@v1
  env:
    # Optional: Custom plugin message
    PLUGIN_MESSAGE: 'Translated by our team'
    DEBUG_MODE: true
  with:
    access-token: ${{ secrets.GITHUB_TOKEN }}
    head-repo: https://github.com/source/repository.git
    track-from: commit-hash
    plugins: |
      @gumball12/yuki-no-plugin-test
```

## What it does

- **Logs** all lifecycle events with clear messages
- **Enhances** created issues with commit metadata
- **Supports** custom message input for personalization
- **Demonstrates** proper plugin development patterns

## Example Output

```
[yuki-no-test-plugin] 🚀 Plugin initialized
[yuki-no-test-plugin] 🔍 Starting comparison process
[yuki-no-test-plugin] ✅ Found 2 commits to process
[yuki-no-test-plugin] Commit 1: abc123d - Add documentation
[yuki-no-test-plugin] 📝 Creating issue for commit: abc123d
[yuki-no-test-plugin] 🎉 Issue #42 created
[yuki-no-test-plugin] ✅ Enhancement comment added
[yuki-no-test-plugin] 🏁 Process completed successfully
```

## Related Links

- [yuki-no GitHub Action](https://github.com/Gumball12/yuki-no)
- [Plugin Development Guide](https://github.com/Gumball12/yuki-no/blob/main/PLUGINS.md)
