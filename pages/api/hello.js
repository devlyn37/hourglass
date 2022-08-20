import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_CONNECTION);
  await client.connect();
  const collection = await client
    .db("hourglass")
    .collection("testdata")
    .find({})
    .toArray();

  res.status(200).json({ testData: collection });
}
