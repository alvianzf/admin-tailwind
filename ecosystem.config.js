module.exports = {
    apps: [
      {
        name: 'admin',
        script: 'react-scripts serve',
        args: '-s build -l 3030',
        env: {
          PORT: 3030,
        },
      },
    ],
  };
  