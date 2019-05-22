const config = {
  clientBuildPath: '../client/build', // relative path to static files
  // apiPrefix: 'http://localhost:3000',
  serverPort: '3001',
  mongodbUri: process.env.MONGODB_URI || `mongodb://localhost:27017/notes`
};

module.exports = config;
