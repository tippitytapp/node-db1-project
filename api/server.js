const express = require("express");
const colors = require('colors');

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

module.exports = server;
