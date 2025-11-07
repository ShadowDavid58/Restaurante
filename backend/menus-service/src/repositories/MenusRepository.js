// Repository Layer - MongoDB
const { MongoClient } = require('mongodb');

class MenusRepository {
    constructor() {
        this.client = new MongoClient(
            process.env.MONGODB_URL || 'mongodb://localhost:27017'
        );
        this.dbName = 'restaurante_menus';
        this.collectionName = 'menus';
    }

    async connect() {
        if (!this.db) {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
        }
        return this.db;
    }

    async findAll() {
        const db = await this.connect();
        const collection = db.collection(this.collectionName);
        return await collection.find({}).toArray();
    }

    async findById(id) {
        const db = await this.connect();
        const collection = db.collection(this.collectionName);
        return await collection.findOne({ _id: id });
    }

    async findByCategory(category) {
        const db = await this.connect();
        const collection = db.collection(this.collectionName);
        return await collection.find({ categoria: category }).toArray();
    }

    async close() {
        await this.client.close();
    }
}

module.exports = MenusRepository;

