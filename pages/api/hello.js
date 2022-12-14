import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_CONNECTION);
  await client.connect();
  const collection = await client
    .db("hourglass")
    .collection("employees")
    .find({})
    .toArray();

  console.log(collection);
  var obj = JSON.stringify(collection);
  console.log("Stringified is: " + obj);
  res.status(200).send(obj);
}
