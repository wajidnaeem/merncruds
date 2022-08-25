const mongoose = require("mongoose");

// const DB = process.env.DATABASE;

const DB =
  "mongodb+srv://wajid:P2TVQIMjIvhors1R@cluster0.ba5h2.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((error) => console.log(error.message));
