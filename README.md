# @gumball12/yuki-no-plugin-test

A test plugin for [yuki-no](https://github.com/Gumball12/yuki-no) that demonstrates all lifecycle hooks.

## Installation

If you're using this as a Yuki-no plugin, you can use it without installation. For more details, please refer to the [Yuki-no Using Plugins documentation](https://github.com/Gumball12/yuki-no/blob/main/docs/PLUGINS.md#using-plugins).

## Usage

Add the plugin to your yuki-no workflow:

```yaml
- uses: Gumball12/yuki-no@v1
  env:
    # Optional: Custom plugin message
    YUKI_NO_TEST_MESSAGE: 'Translated by our team'
    YUKI_NO_TEST_DEBUG_MODE: true
    YUKI_NO_TEST_MULTILINE_VALUE: |
      value 1
      value 2
      value 3
  with:
    access-token: ${{ secrets.GITHUB_TOKEN }}
    head-repo: https://github.com/source/repository.git
    track-from: commit-hash
    plugins: |
      @gumball12/yuki-no-plugin-test@0.0.6
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

You can see these logs in your GitHub Actions workflow run logs.

## Related Links

- [yuki-no GitHub Action](https://github.com/Gumball12/yuki-no)
- [Plugin Development Guide](https://github.com/Gumball12/yuki-no/blob/main/docs/PLUGINS.md)
