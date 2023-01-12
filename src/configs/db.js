const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.set("strictQuery", false);

module.exports = mongoose.connect(connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("✅ Connected to database on port " + port);
      } else {
        console.log("❌ Error connecting to database: " + err);
      }
    }
  );