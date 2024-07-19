// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'serve',
        args: '-s build -l 3030',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  