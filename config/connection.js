const { connect, connection } = require('mongoose');

connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nosql-social-network-api",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = connection;