import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
    const { email, password } = req.body;
    //Check if the email and password are valid
    if (email === "magdiel.jimenez@freebug.mx" && password === 'admin') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: "magdiel.jimenez@freebug.mx",
            username: 'mags'
        }, 'secret');
        const serialized = serialize('tokenUser', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized);

        return res.json('login succesfully');
    }
    return res.status(401).json({error:'invalid email or password'})

}