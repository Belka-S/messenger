const express = require('express');

// parse application/json
const json = express.json();

// parse application/x-www-form-urlencoded
const urlencoded = express.urlencoded({ extended: false });

// parse cookie

module.exports = { json, urlencoded };
