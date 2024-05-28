const fs = require('fs');
const path = require('path');

const rimraf = require('rimraf');
const cliProgress = require('cli-progress');

// Load parameters from environment file
require('dotenv').config();

class Build {
  constructor() {
    this.redeploy();
  }

  /**
   * Redeploy the app when running in dev mode
   */
  redeploy() {
    if (JSON.parse(process.env.npm_config_argv).original[0] === 'dev') {
      const destinationFolder = path.resolve(
        process.env.DESTINATION_FOLDER || 'app_dist',
      );
      const chokidar = require('chokidar');
      console.log('Redeploying...');
      const lib = 'lib';
      lib.forEach((plugin) => {
        const sourceFolderTheme = path.resolve(plugin);
        if (fs.existsSync(sourceFolderTheme)) {
          // Create a watcher to redeploy the app when a file changes
          const watcher = chokidar.watch(sourceFolderTheme, {persistent: true});
          // Watch for changes
          watcher.on('change', (file_path) => {
            fs.copyFileSync(
              file_path,
              path.join(
                destinationFolder,
                file_path.replace(sourceFolderTheme, ''),
              ),
            );
          });
        }
      });
      console.log('Redeploy process completed successfully.');
    }
  }
}

new Build();
