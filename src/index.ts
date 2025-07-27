import { GitHub } from '@yuki-no/plugin-sdk/infra/github';
import type { YukiNoPlugin } from '@yuki-no/plugin-sdk/types/plugin';
import {
  getBooleanInput,
  getInput,
  getMultilineInput,
} from '@yuki-no/plugin-sdk/utils/input';

let github: GitHub;

/**
 * Test plugin demonstrating all yuki-no lifecycle hooks
 */
const plugin: YukiNoPlugin = {
  name: 'yuki-no-test-plugin',

  async onInit(ctx) {
    console.log(`[${plugin.name}] 🚀 Plugin initialized`);

    github = new GitHub({
      ...ctx.config,
      repoSpec: ctx.config.upstreamRepoSpec,
    });

    // Handle custom message input
    const customMessage = getInput('PLUGIN_MESSAGE');
    if (customMessage) {
      console.log(`[${plugin.name}] 💬 Custom message: ${customMessage}`);
    }

    // Enable debug mode if requested
    const debugMode = getBooleanInput('PLUGIN_DEBUG_MODE');
    if (debugMode) {
      console.log(`[${plugin.name}] 🐛 Debug mode enabled`);
    }

    // Check multiline value
    const multilineValue = getMultilineInput('PLUGIN_MULTILINE_VALUE');
    if (multilineValue) {
      console.log(
        `[${plugin.name}] ↕️ Multiline value: ${multilineValue.join(', ')}`,
      );
    }
  },

  async onBeforeCompare(ctx) {
    console.log(`[${plugin.name}] 🔍 Starting comparison process`);
    console.log(
      `[${plugin.name}] Tracking from: ${ctx.config.trackFrom || 'not set'}`,
    );
  },

  async onAfterCompare(ctx) {
    console.log(
      `[${plugin.name}] ✅ Found ${ctx.commits.length} commits to process`,
    );

    // Log commit summaries
    ctx.commits.forEach((commit, index) => {
      console.log(
        `[${plugin.name}] Commit ${index + 1}: ${commit.hash.substring(0, 7)} - ${commit.title}`,
      );
    });
  },

  async onBeforeCreateIssue(ctx) {
    console.log(
      `[${plugin.name}] 📝 Creating issue for commit: ${ctx.commit.hash.substring(0, 7)}`,
    );
    console.log(
      `[${plugin.name}] Files changed: ${ctx.commit.fileNames?.length || 0}`,
    );
  },

  async onAfterCreateIssue(ctx) {
    console.log(`[${plugin.name}] 🎉 Issue #${ctx.issue.number} created`);

    // Add enhancement comment
    try {
      const customMessage = getInput('PLUGIN_MESSAGE', '');

      await github.api.rest.issues.createComment({
        ...github.ownerAndRepo,
        issue_number: ctx.issue.number,
        body: `🤖 **Enhanced by ${plugin.name}**

- **Commit**: \`${ctx.commit.hash}\`
- **Files**: ${ctx.commit.fileNames?.length || 0} changed${customMessage ? `\n- **Message**: ${customMessage}` : ''}

---
*Processed at ${new Date().toISOString()}*`,
      });

      console.log(`[${plugin.name}] ✅ Enhancement comment added`);
    } catch (error) {
      console.error(
        `[${plugin.name}] ❌ Comment failed:`,
        error instanceof Error ? error.message : error,
      );
    }
  },

  async onFinally(ctx) {
    console.log(
      `[${plugin.name}] 🏁 Process ${ctx.success ? 'completed successfully' : 'finished with errors'}`,
    );
  },

  async onError(ctx) {
    console.error(`[${plugin.name}] 💥 Error: ${ctx.error.message}`);
  },
};

export default plugin;
