'use strict';
var prefix = 'wjtp_';

const Hapi = require('hapi');
const MySQL = require('mysql');
const Joi = require('joi');

const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'tasks',
     password: 'tasks',
     database: 'globalbr_tasks'
});
connection.connect();

var Knex = require('knex')({
  client: 'mysql',
  connection: {
     host: 'localhost',
     user: 'tasks',
     password: 'tasks',
     database: 'globalbr_tasks'
  }
});

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

//
//Get all jobs
//
server.route({
    method: 'GET',
    path: '/jobs',
    handler: function (request, reply) {
      const limit = request.query.limit || 20;
      const status = request.query.status || false;
      var query = 'SELECT * FROM ' + prefix + 'job ';
      if(status) {
        query += 'WHERE status_id = ' + status + ' ';
      }
      query += 'ORDER BY id DESC LIMIT ' + limit;
      connection.query(query,
      function (error, results, fields) {
        if (error) throw error;
        return reply(results);
      });
    },
   config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
     validate: {
       query: {
         limit: Joi.number().integer(),
         status: Joi.number().integer()
       }
     }
   }
});

//
//Get single job
//
server.route({
    method: 'GET',
    path: '/jobs/{jobId}',
    handler: function (request, reply) {
      connection.query('SELECT * FROM ' + prefix + 'job WHERE id = ' + request.params.jobId,
      function (error, results, fields) {
        if (error) throw error;
        return reply(results);
      });
    },
   config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
     validate: {
       params: {
         jobId: Joi.number().integer()
       }
     }
   }
});

//
//Get all status codes
//
server.route({
    method: 'GET',
    path: '/statuses',
    handler: function (request, reply) {
      connection.query('SELECT * FROM ' + prefix + 'status',
      function (error, results, fields) {
        if (error) throw error;
        return reply(results);
      });
    },
   config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
   }
});

//
//Get users
//
server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
      connection.query('SELECT id, username, firstname, lastname, email, ph_office, ph_mobile FROM ' + prefix + 'person',
      function (error, results, fields) {
        if (error) throw error;
        return reply(results);
      });
    },
   config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
   }
});

//
// Save single job
//
server.route({
    method: 'PUT',
    path: '/jobs/{jobId}',
    handler: function (request, reply) {
      var payload = request.payload;
      //Sanitise dates
      payload.assignedon = new Date(payload.assignedon);
      payload.completedon = new Date(payload.completedon);
      payload.createdon = new Date(payload.createdon);
      payload.updatedon = new Date(payload.updatedon);
      payload.needby = new Date(payload.needby);
      if(payload.id === 'new') {
        delete payload['id'];
        Knex(prefix + 'job').insert(payload).then((res) => {
          reply({
            message: 'Successfully inserted new job' + request.params.jobId
          });
        }).catch(( err ) => {
          reply('Server error: ' + err);
        });
      } else {
        Knex(prefix + 'job').where( {
          id: request.params.jobId
        }).insert(payload).then((res) => {
          reply({
            message: 'Successfully inserted new job' + request.params.jobId
          });
        }).catch(( err ) => {
          reply('Server error: ' + err);
        });
      }
    },
   config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },/*
     validate: {
       params: {
         jobId: Joi.number().integer().required()
      },
      query: {
         title: Joi.string().required(),
         description: Joi.string(),
       }
     }*/
   }
});
//
// Start server
//
server.start((err) => {
   if (err) {
     throw err;
   }
  console.log('Server running at:', server.info.uri);
});
