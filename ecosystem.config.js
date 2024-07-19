module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'react-scripts serve',
        args: '-s build -l 3030',
        isntances: 1,
        exec_mode: 'fork',
        env: {
          PORT: 3030,
        },
      },
    ],
  };
  