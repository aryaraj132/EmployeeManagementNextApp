import jwt from 'jsonwebtoken';
import connectDB from '../../../_utils/mongoose/mongodb';
import User from '../../../_utils/mongoose/models/user';
import bcrypt from 'bcryptjs';
async function handler(req, res) {
    if (req.method === 'POST') {
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
        if (!req.body) {
            res.status(400).json({ error: 'BadRequest' });
            return;
        }
        const { oldPassword, newPassword } = req.body;
        try {
            const user = await User.findOne({ _id: data._id })
            if (!user) {
                res.status(400).json({ error: "User not Found" })
            }
            else {
                const validatePass = await bcrypt.compare(oldPassword, user.password)
                if(!validatePass){
                    res.status(400).json({error:"Password Did not match"})
                }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(newPassword, salt)
                const updatedUser = await User.findByIdAndUpdate(user._id, { password: hashedPass }, { new: true })
                const { password, __v, ...other } = updatedUser._doc
                res.status(200).json(other)
            }
            }
        }
        catch (err) { console.error(err); res.status(500).json({ error: "Internal Server Error" }) }
    }
}
export default connectDB(handler);
