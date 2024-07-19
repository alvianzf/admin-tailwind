module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'serve',
        args: '-s build -l 3030',
        env: {
          PORT: 3030,
        },
      },
    ],
  };
  