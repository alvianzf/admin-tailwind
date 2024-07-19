// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'npx',
        args: 'serve -s build -l 3030',
        interpreter: 'none',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  