module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'npm',
        args: 'start',
        instances: 1,
        exec_mode: 'fork',
        env: {
          PORT: 3030,
        },
      },
    ],
  };
  