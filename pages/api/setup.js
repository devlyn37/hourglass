import { MongoClient } from "mongodb";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

const getRequiredParam = (query, name) => {
  if (!query[name]) {
    throw new Error(`Missing query param ${name}`);
  }

  return query[name];
};

function formatMonthlySalaryForSuperfluid(monthlySalary) {
  const dollarsPerSecond = parseFloat(monthlySalary) / 30 / 24 / 60 / 60;
  return parseEther(dollarsPerSecond.toString());
}

//where the Superfluid logic takes place
async function createNewFlows(recipientDetails) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC,
    "goerli"
  );
  const sf = await Framework.create({
    chainId: 5,
    provider: provider,
  });

  const signer = sf.createSigner({
    privateKey: process.env.TREASURY_PRIVATE_KEY,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const operations = recipientDetails.map((details) => {
      return sf.cfaV1.createFlow({
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
    Network: Goerli
    Super Token: DAIx
    `;
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

const testData = {
  payrollItems: [
    {
      name: "john smith",
      monthlySalary: 10000,
      taxLocation: "USA/FL",
      publicKey: "0x558d8C0d05DE2ae757548fE0483e9b82376aaf97",
    },
    {
      name: "adam savage",
      monthlySalary: 12000,
      taxLocation: "USA/NYC",
      publicKey: "0xE898BBd704CCE799e9593a9ADe2c1cA0351Ab660",
    },
    //{ name: "Linda Bee", monthlySalary: 12000, taxLocation: "USA/CA" },
  ],
};

export default async function handler(req, res) {
  const resultString = await createNewFlows(testData.payrollItems);

  res.status(200).json({ test: resultString });
}
