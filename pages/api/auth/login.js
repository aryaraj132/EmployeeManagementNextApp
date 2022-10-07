import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.body) {
            res.status(400).json({message: 'BadRequest'});
            return;
        }
    const { email, password } = req.body;
    var token = jwt.sign({ email, password }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '12h' });
    res.status(200).json({ token: token })
  }
}
  