import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
let db;

// Function to connect to the database
export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("cryptocurrency"); // Replace with your database name
  }
  return db;
}

// Ensure the database is connected before any operation
async function ensureDbConnection() {
  if (!db) {
    await connectToDatabase();
  }
}

// Export the connection for use in other files
export { db };

//////////////////////////////////////////
// Cryptocurrencies
//////////////////////////////////////////

// Get all cryptocurrencies
async function getCryptos() {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");
  let cryptos = await collection.find({}).toArray();
  cryptos.forEach((crypto) => (crypto._id = crypto._id.toString())); // Convert ObjectId to string
  return cryptos;
}

// Get cryptocurrency by id
export async function getCrypto(id) {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");
  const objectId = new ObjectId(id); // Ensure ID is an ObjectId
  return await collection.findOne({ _id: objectId });
}

// Create cryptocurrency
async function createCrypto(crypto) {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");
  const result = await collection.insertOne(crypto);
  return result.insertedId.toString();
}

// Update cryptocurrency
async function updateCrypto(crypto) {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");
  const query = { _id: new ObjectId(crypto._id) };
  const update = { $set: { watchlist: crypto.watchlist } };
  const result = await collection.updateOne(query, update);
  return result;
}

// Update cryptocurrency status
export async function updateCryptoStatus(id, status) {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");
  const query = { _id: new ObjectId(id) };
  const update = { $set: { watchlist: status } };
  const result = await collection.updateOne(query, update);
  return result;
}

// Delete cryptocurrency by id
export async function deleteCrypto(id) {
    await ensureDbConnection();
    const collection = db.collection("cryptocurrencies");

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) }); // Delete document by ID
        return result;
    } catch (error) {
        console.error("Error deleting from database:", error);
        throw error;
    }
}
//////////////////////////////////////////
// Portfolios
//////////////////////////////////////////

export async function getPortfolios() {
  await ensureDbConnection();
  const collection = db.collection("portfolio");
  const portfolios = await collection
    .aggregate([
      {
        $lookup: {
          from: "cryptocurrencies",
          localField: "portfolio.cryptoId",
          foreignField: "_id",
          as: "cryptoDetails",
        },
      },
    ])
    .toArray();

  return portfolios.map((portfolio) => ({
    ...portfolio,
    _id: portfolio._id.toString(),
    portfolio: portfolio.portfolio.map((entry) => ({
      ...entry,
      cryptoId: entry.cryptoId.toString(),
    })),
    cryptoDetails: portfolio.cryptoDetails.map((crypto) => ({
      ...crypto,
      _id: crypto._id.toString(),
    })),
  }));
}

export async function createPortfolio(portfolio) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");
  const result = await collection.insertOne({
    name: portfolio.name,
    walletAddress: portfolio.walletAddress,
    holdings: [], // Initialize holdings as an empty array
    createdAt: new Date(),
  });
  return result.insertedId.toString();
}

//////////////////////////////////////////
// Persons
//////////////////////////////////////////

export async function getPersonWithDetails(personId) {
  if (!ObjectId.isValid(personId)) {
    throw new Error("Invalid person ID");
  }
  await ensureDbConnection();
  const collection = db.collection("portfolio");
  const person = await collection
    .aggregate([
      { $match: { _id: new ObjectId(personId) } },
      {
        $lookup: {
          from: "cryptocurrencies",
          localField: "portfolio.cryptoId",
          foreignField: "_id",
          as: "cryptoDetails",
        },
      },
    ])
    .toArray();

  return person[0] || null;
}

export async function createPerson(person) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");
  person.portfolio = person.portfolio.map((crypto) => ({
    ...crypto,
    cryptoId: new ObjectId(crypto.cryptoId),
  }));
  const result = await collection.insertOne(person);
  return result.insertedId.toString();
}

// Add cryptocurrency to person's portfolio
export async function addCryptoToPortfolio(personId, portfolioEntry) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");
  portfolioEntry.cryptoId = new ObjectId(portfolioEntry.cryptoId);
  const query = { _id: new ObjectId(personId) };
  const update = { $push: { portfolio: portfolioEntry } };
  const result = await collection.updateOne(query, update);
  return result;
}

// Remove cryptocurrency from person's portfolio
export async function removeCryptoFromPortfolio(personId, cryptoId) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");
  const query = { _id: new ObjectId(personId) };
  const update = { $pull: { portfolio: { cryptoId: new ObjectId(cryptoId) } } };
  const result = await collection.updateOne(query, update);
  return result;
}

//////////////////////////////////////////
// Exports
//////////////////////////////////////////

export default {
  getCryptos,
  getCrypto,
  createCrypto,
  updateCrypto,
  updateCryptoStatus,
  deleteCrypto,
  getPortfolios,
  getPersonWithDetails,
  createPerson,
  createPortfolio,
  addCryptoToPortfolio,
  removeCryptoFromPortfolio,
};
