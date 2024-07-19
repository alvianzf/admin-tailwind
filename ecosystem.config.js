module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'serve',
        args: '-s build -l 3030',
        instances: 1,
        exec_mode: 'fork',
        env: {
          PORT: 3030,
        },
      },
    ],
  };
  