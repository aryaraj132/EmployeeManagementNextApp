import jwt from 'jsonwebtoken';
import connectDB from '../../../_utils/mongoose/mongodb';
import Task from '../../../_utils/mongoose/models/task';
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
        const { description, type, timeTaken, starTime } = req.body;
        try {
            const task = await new Task({
                userID: data._id,
                description: description,
                type: type,
                timeTaken: timeTaken,
                starTime: starTime
            })
            await task.save()
            const { __v, _id, ...other } = task._doc
            res.status(200).json(other)
        }
        catch (err) { console.error(err); res.status(500).json({ error: "Internal Server Error" }) }
    }
}
export default connectDB(handler);
