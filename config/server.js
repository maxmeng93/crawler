const { env } = process;

module.exports = {
    // service port
    port: env.Port || 3001,

    // mongodb address
    database: env.Database || 'mongodb://localhost:27017/test',

    // jwt encryption secret
    jwtSecret: env.JwtSecret || 'jwtSecret',

    // Maximize the number of groups
    maxGroupsCount: 3,

    // qiniu config
    qiniuAccessKey: env.QiniuAccessKey || '',
    qiniuSecretKey: env.QiniuSecretKey || '',
    qiniuBucket: env.QiniuBucket || '',
    qiniuUrlPrefix: env.QiniuUrlPrefix || '',

    allowOrigin: env.AllowOrigin,

    // token expires time
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,

    // administrator user id
    administrator: env.Administrator || '',

    // default group name
    defaultGroupName: 'fiora',
};
