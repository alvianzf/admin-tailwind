module.exports = {
    apps: [
      {
        name: 'admin',
        script: './start-serve.sh',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  