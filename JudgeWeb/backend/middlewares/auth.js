import jwt from 'jsonwebtoken';

const authMiddleware = async(req, res, next) => {
    if(req.headers && req.headers.authorization) {
        const token = await req.headers.authorization.split(' ');
        logger.info(token[0]);
        logger.info(token[1]);
        if(token[0] === 'Bearer') {
            jwt.verify(token[1],process.env.SECRET_KEY, function(err, decoded) {
                if(!err) {
                    logger.info(1);
                    logger.info(JSON.stringify(decoded));
                    next();
                }
                else {
                    logger.info(2);
                    return res.status(200).json({result : 4});
                }
            });
        }
    }
    else {
    logger.info(3);
    return res.status(200).json({result : 4});
    }
};

module.exports = authMiddleware;
