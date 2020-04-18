const redis = require('redis');


const client = redis.createClient({
    host: sosong-redis.mnkbea.0001.apse1.cache.amazonaws.com,
    port: 6379
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
