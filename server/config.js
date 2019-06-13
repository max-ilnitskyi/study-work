const config = {
  clientBuildPath: '../client/build', // relative path to static files
  // apiPrefix: 'http://localhost:3000',
  serverPort: process.env.PORT || '3001',
  mongodbUri: process.env.MONGODB_URI || `mongodb://localhost:27017/notes`,
  secret:
    process.env.NODE_ENV === 'production'
      ? process.env.SECRET || 'tempSecret'
      : 'secret'
};

module.exports = config;
