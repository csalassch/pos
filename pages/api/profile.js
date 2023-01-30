import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
    const { tokenUser } = req.cookies;
    if(!tokenUser){
        return res.status(401).json({error:'no token'});
    }
    try {
        const user = verify(tokenUser, 'secret');
        console.log(user);
        return res.json({
            email: user.email,
            username:user.username
        });
    } catch (error) {
        return res.status(401).json({ error: 'invalid token' });
    }


}
