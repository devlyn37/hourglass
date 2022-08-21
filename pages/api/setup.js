import { MongoClient } from "mongodb";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

// const getRequiredParam = (query, name) => {
//   if (!query[name]) {
//     throw new Error(`Missing query param ${name}`);
//   }

//   return query[name];
// };

function formatMonthlySalaryForSuperfluid(monthlySalary) {
  var dollarsPerSecond = parseFloat(monthlySalary) / 30 / 24 / 60 / 60;
  // Because of limited faucet funds, manually max this out 
  dollarsPerSecond = dollarsPerSecond > 0.000001 ? 0.000001 : dollarsPerSecond;
  return parseEther(dollarsPerSecond.toString());
}

// Where the Superfluid logic takes place
async function createNewFlows(recipientDetails) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC,
    "rinkeby"
  );

  const sf = await Framework.create({
    chainId: 4,
    provider: provider,
  });

  const signer = sf.createSigner({
    privateKey: process.env.TREASURY_PRIVATE_KEY,
    provider: provider
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const operations = recipientDetails.map((details) => {
      return sf.cfaV1.createFlow({
        sender: "0x5fd4e33388669070738f60a020d1a7E079E4dD04",
        flowRate: formatMonthlySalaryForSuperfluid(details.monthlySalary),
        receiver: details.publicKey,
        superToken: DAIx,
        // userData?: string
      });
    });

    console.log(operations);
    console.log("Creating your streams...");

    const batchCall = sf.batchCall(operations);
    const txn = await batchCall.exec(signer);
    console.log(txn);

    return `Congrats - you've just created some money streams!
    Network: Rinkeby
    Super Token: DAIx
    `;
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

// const testData = {
//   payrollItems: [
//     {
//       name: "john smith",
//       monthlySalary: 10000,
//       taxLocation: "USA/FL",
//     },
//     {
//       name: "adam savage",
//       monthlySalary: 12000,
//       taxLocation: "USA/NYC",
//     },
//     //{ name: "Linda Bee", monthlySalary: 12000, taxLocation: "USA/CA" },
//   ],
// };

async function createEmployees(employees) {
  const client = new MongoClient(process.env.MONGO_CONNECTION);
  await client.connect();
  const employee = await client
    .db("hourglass")
    .collection("employees")
    .insertMany(employees);

  console.log("Mongo response: " + employee);
}

export default async function handler(req, res) {
  var employees = req.body.employees;
  
  for (var employee of employees) {
    var wallet = ethers.Wallet.createRandom();
    employee.publicKey = wallet.address;
    employee.privateKey = wallet.privateKey;
  }

  await createNewFlows(employees);

  await createEmployees(employees);
  res.status(200).json({ finished: true });
}