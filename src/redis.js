const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  19105,
  "redis-19105.c74.us-east-1-4.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);

redisClient.auth("qqq5eqIxlXXclQwuFDJ1eErapA2ttoeI", (err)=>{
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports ={SET_ASYNC, GET_ASYNC}