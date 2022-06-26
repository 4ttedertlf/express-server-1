import { MongoClient, ObjectId, Db, Collection } from "mongodb";

let mongoClient: any;
let db: any;
const defaultCollectionName =
  process.env.AZURE_COSMOS_DATABASE_DEFAULT_COLLECTION_NAME;
let defaultCollection: any = undefined;

export async function connectApp(
  connectionString: string,
  databaseName: string
) {
  if (!connectionString) throw Error("No connection string found");
  if (!databaseName) throw Error("No database name found");

  mongoClient = new MongoClient(connectionString);
  db = mongoClient.db(databaseName);
  defaultCollection = db.collection(defaultCollectionName);
  return mongoClient;
}
export async function disconnect() {
  await mongoClient.close();
}
function toJson(data: any) {
  // convert _id to id and clean up
  const idWithoutUnderscore = data._id.toString();
  delete data._id;

  return {
    id: idWithoutUnderscore,
    ...data,
  };
}

// Get all from database
// Transform `_id` to `id`
export async function get(collectionName: string) {
  if (collectionName) throw Error("MongoDB: collection name is missing");

  const uploads = await db.collection(collectionName).find({});
  if (!uploads) return [];

  const alteredUploads = uploads.map((upload: any) => toJson(upload));

  return alteredUploads;
}
export async function getAll(collectionName: string) {
  if (!collectionName) throw Error("MongoDB: collection name is missing");

  const items = await db.collection(collectionName).find({}).toArray();
  if (!items) return [];

  const alteredUploads = items.map((upload: any) => toJson(upload));

  return alteredUploads;
}
// Get one  by id
export async function getById(collectionName: string, id: any) {
  if (!collectionName) throw Error("MongoDB: collection name is missing");

  if (!id) return null;

  const upload = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) });
  return toJson(upload);
}
// Delete one  by id
export async function deleteById(collectionName: string, id: any) {
  if (!collectionName) throw Error("MongoDB: collection name is missing");

  if (!id) return null;

  //@ts-ignore
  const uniqueId: any = ObjectId(id);

  return await db.collection(collectionName).deleteOne({ _id: uniqueId });
}
// Add one
export async function add(collectionName: string, obj: any) {
  if (!collectionName) throw Error("MongoDB: collection name is missing");

  // mongoDB generates id
  return await db.collection(collectionName).insertOne(obj);
}
// Update one
export async function update(collectionName: string, obj: any) {
  if (!collectionName) throw Error("MongoDB: collection name is missing");

  return await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(obj.id) }, { $set: obj });
}
