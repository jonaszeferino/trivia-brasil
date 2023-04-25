import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://theonlyapps:3lUsCwxNVsaqxPMK@triviabrasil.wrqmgnu.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();

export default client;