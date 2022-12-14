import jwt from 'jsonwebtoken';
import connectDB from '../../../_utils/mongoose/mongodb';
import User from '../../../_utils/mongoose/models/user';
import bcrypt from 'bcryptjs';
async function handler(req, res) {
    if (req.method === 'GET') {
        var data = null
        try {
            const token = req.headers.authorization.split(' ')[1];
            data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
            const expT = new Date(data.exp * 1000);
            const currT = new Date();
            if (currT >= expT) {
                res.status(400).json({ error: 'Token Expired' });
                return;
            }
        } catch (err) { res.status(400).json({ error: 'Provide Token in authorization header' }); return; }
        if (!data.isAdmin) {
            res.status(400).json({ error: "User not Admin" })
            return;
        }
        try {
            const employee = await User.find({ isAdmin: false }, { password: 0, __v: 0 })
            res.status(200).json(employee)
        }
        catch (err) { console.error(err); res.status(500).json({ error: "Internal Server Error" }) }
    }
}
export default connectDB(handler);
