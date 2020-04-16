const redis = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_DB } = process.env;

const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});
const set = async ({ key, value, expires }) => {
    await client.set(key, value);
    if (expires) {
        await client.expire(key, expires);
    }
}
const get = async (key) => {
    const value = await client.get(key)
    console.log("sesionid", value)
    return value
}

module.exports = {
    set,
    get
}
