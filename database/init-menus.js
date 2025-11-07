// Script para inicializar datos de menú en MongoDB
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = 'restaurante_menus';

const menuItems = [
    {
        nombre: 'Ensalada César',
        descripcion: 'Lechuga romana, pollo a la parrilla, crutones, parmesano',
        precio: 12.99,
        categoria: 'entradas'
    },
    {
        nombre: 'Bruschetta',
        descripcion: 'Pan tostado con tomate, ajo y albahaca',
        precio: 8.99,
        categoria: 'entradas'
    },
    {
        nombre: 'Salmón a la Parrilla',
        descripcion: 'Salmón fresco con vegetales al vapor y arroz',
        precio: 24.99,
        categoria: 'platos'
    },
    {
        nombre: 'Pasta Carbonara',
        descripcion: 'Pasta con pancetta, huevo y parmesano',
        precio: 18.99,
        categoria: 'platos'
    },
    {
        nombre: 'Hamburguesa Clásica',
        descripcion: 'Carne de res, queso, lechuga, tomate, papas fritas',
        precio: 15.99,
        categoria: 'platos'
    },
    {
        nombre: 'Tiramisú',
        descripcion: 'Postre italiano tradicional con café y cacao',
        precio: 8.99,
        categoria: 'postres'
    },
    {
        nombre: 'Cheesecake',
        descripcion: 'Tarta de queso con frutos rojos',
        precio: 9.99,
        categoria: 'postres'
    },
    {
        nombre: 'Agua',
        descripcion: 'Agua embotellada',
        precio: 2.99,
        categoria: 'bebidas'
    },
    {
        nombre: 'Refresco',
        descripcion: 'Coca Cola, Pepsi, Sprite',
        precio: 3.99,
        categoria: 'bebidas'
    },
    {
        nombre: 'Vino Tinto',
        descripcion: 'Copa de vino tinto de la casa',
        precio: 12.99,
        categoria: 'bebidas'
    }
];

async function initMenus() {
    const client = new MongoClient(url);
    
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        
        const db = client.db(dbName);
        const collection = db.collection('menus');
        
        // Limpiar colección
        await collection.deleteMany({});
        
        // Insertar items
        const result = await collection.insertMany(menuItems);
        console.log(`${result.insertedCount} items del menú insertados`);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

initMenus();

