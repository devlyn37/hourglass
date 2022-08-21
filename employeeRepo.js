import { MongoClient } from "mongodb";

export default class EmployeeRepo {
  static async createMany(employees) {
    const client = new MongoClient(process.env.MONGO_CONNECTION);
    await client.connect();
    console.log(employees);
    const employee = await client
      .db("hourglass")
      .collection("employees")
      .insertMany(employees);

    console.log(employee);
  }
}
