import { MongoClient } from "mongodb";

// Receives an array of JSON employees in the request body
export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_CONNECTION);
  await client.connect();
  const employee = await client
    .db("hourglass")
    .collection("employees")
    .insertMany(req.body.employees);

  console.log("Mongo response: " + employee);

  res.status(200).send();
}