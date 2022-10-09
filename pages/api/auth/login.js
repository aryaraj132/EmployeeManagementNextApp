import jwt from 'jsonwebtoken';
import connectDB from '../../../_utils/mongoose/mongodb';
import User from '../../../_utils/mongoose/models/user';
import bcrypt from 'bcryptjs';
async function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.body) {
            res.status(400).json({error: 'BadRequest'});
            return;
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({email: email});
            if(!user){
                res.status(400).json({error:"User Not Found"})}
            else{
            const validatePass = await bcrypt.compare(password, user.password)
                if(!validatePass){
                    res.status(400).json({error:"Password Did not match"})
                }
                else if(user.isAdmin || user.isActive){
                const {password, __v,...other} = user._doc
                var token = jwt.sign(other, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '12h' });
                res.status(200).json({token: token})
                }
                else{
                    res.status(400).json({error:"User is not active"})
                }
            }
        }
        catch(err){console.error(err);res.status(500).json({error:"Internal Server Error"})}
  }
}
export default connectDB(handler);
  