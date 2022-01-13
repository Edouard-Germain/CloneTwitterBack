const express = require("express")
const app = express()

const User = require("../models/User")
const Tweet = require("../models/Tweet")
const Comment = require("../models/Comment")

module.exports = app