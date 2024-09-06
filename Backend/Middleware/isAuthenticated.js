import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    console.log("authentication prosess")
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({
                message: "user is not Authenticated",
                sucess: false
            })
        }
        const decode_token = jwt.verify(token, process.env.SECRET_KEY);
        console.group(decode_token)
        if (!decode_token) {
            return res.status(400).json({
                message: "token is not verfiy",
                sucess: false
            })
        }
        console.log(decode_token.userId)
        req.id = decode_token.userId;
        next()
    } catch (error) {

    }
}