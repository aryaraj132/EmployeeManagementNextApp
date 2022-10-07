import jwt from 'jsonwebtoken';
import connectDB from '../../../_utils/mongoose/mongodb';
import User from '../../../_utils/mongoose/models/user';
import bcrypt from 'bcryptjs';
async function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.body) {
            res.status(400).json({message: 'BadRequest'});
            return;
        }
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        res.status(400).statusMessage="User Not Found"
        res.send()}
    else{
    const validatePass = await bcrypt.compare(req.body.password, user.password)
        if(!validatePass){
            res.status(401).statusMessage="Password Did not match"
            res.send()
        }
        else{
        const {password, __v,...other} = user._doc
        var token = jwt.sign(other, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({ token: token })
        }
    }
  }
}
export default connectDB(handler);
  