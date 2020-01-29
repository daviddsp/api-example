/** @format */

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();
// const { PubSub } = require('@google-cloud/pubsub');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// async function quickstart(
// 	projectId = 'demoabc-slwrca', // Your Google Cloud Platform project ID
// 	topicName = 'projects/demoabc-slwrca/topics/abc-dtemo' // Name for the new topic to create
//   ) {
// 	// Instantiates a client
// 	const pubsub = new PubSub({projectId});

// 	// Creates the new topic
// 	const [topic] = await pubsub.createTopic(topicName);
// 	console.log(`Topic ${topic.name} created.`);
//   }

//Importando los archivos de la ruta
const ruta = require('./routes');
require('./config/socket.js')(io);

// Importacion de la conexion con los modelos
const sequelize = require('./config/sequelize');

// Configuracion del servidor

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.io = io;
	req.sequelize = sequelize;
	next();
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Json');
	next();
});

//Archivos de rutas del servicio
app.use('/api', ruta);

// Ruta de error
app.use((err, req, res, next) => {
	res.status(400).json({
		error: err.message,
	});
	next();
});

server.listen(process.env.PORT, () => {
	console.log(`Service up in the port ${process.env.PORT}`);
	console.log('Press Ctrl+C to quit.');
});

// module.exports = app;
