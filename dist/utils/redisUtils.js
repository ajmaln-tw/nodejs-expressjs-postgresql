"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const redisGetAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
const redisSetAsync = (0, util_1.promisify)(redisClient.set).bind(redisClient);
