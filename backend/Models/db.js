const mongoose = require('mongoose');
const uri = "mongodb+srv://jhautkarsh2005:Utkarsh@signin.9a92x.mongodb.net/?retryWrites=true&w=majority&appName=SIGNIN";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
