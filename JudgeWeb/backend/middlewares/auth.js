import jwt from 'jsonwebtoken';

const authMiddleware = async(req, res) => {
    if(req.headers && req.headers.authorization) {
        const token = await req.headers.authorization.split(' ');
        if(token[0] === 'Bearer') {
            jwt.verify(token[1],process.env.SECRET_KEY, function(err) {
                if(!err) {
                    return res.status(200).json({result : 6});
                }
                else {
                    logger.error('Token Error\n' + err);
                    return res.status(200).json({result : 5});
                }
            });
        }
    }
    else {
        return res.status(200).json({result : 4});
    }
};

export default authMiddleware;

//로그인시 access와 refresh 둘다 발급(refresh token 서버에 저장?)
//local에 refresh저장 헤더에는 access저장?
//토큰을 사용하기전에 프론트에서 access 만료날짜 확인(payload를 통해 확인가능)
//access가 만료되었으면 refresh 만료안되었으면 access발급요청
//refresh가 만료되면 로그아웃

//장점 access 만 있을때보다 안전 => 어차피 털건 코드뿐이므로 만료시간과 무관?
//단점 구현복잡, http 요청회수 많아져 자원낭비