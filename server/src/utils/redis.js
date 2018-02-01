import redis from 'redis';
import config from 'config';

const redisConfig = config.get('redisConfig');

var client = redis.createClient(redisConfig);

const redisServer = {
    setData:function(dataObj){
        client.set(dataObj.key, dataObj, function(err) {
            console.log(err)
        })
    },

    getData:function(key){
        client.get(key, function (err, reply) {
            console.log(reply.toString());
            return reply;
        });
    }
}
export {redisServer };