// const {PubSub} = require('@google-cloud/pubsub');

const subscriptionName = 'projects/demoabc-slwrca/subscriptions/subscriber-abc';

  // Imports the Google Cloud client library
const projectId = 'demoabc-slwrca'
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub({projectId});
require('dotenv').config();

module.exports = {
  init: async (req, res) => {
		res.io.emit('Hello', 'Hello World');
		res.json('Hello World');
	},
	create: async (req, res) => {
    const { first_name, last_name, email, comments, status } = req.body;
    
		await req.sequelize.Claims.create({
			first_name: first_name,
      last_name: last_name,
      email: email,
      comments: comments,
      status: status
		});

		res.json('Creado');
	},
	get: async (req, res) => {
		const person = await req.sequelize.Claims.findAll();
		res.json(person);
	}, 
}
