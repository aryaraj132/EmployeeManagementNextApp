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
        try {
        const { id, date } = req.body;
        const currDate = new Date(date);
        const currMonth = currDate.getMonth();
        const currYear = currDate.getFullYear();
        const currDay = currDate.getDate();
        const newDate = currYear + "-" + (currMonth + 1) + "-" + (currDay + 1);
        const nextDay = new Date(newDate);
        const query = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': currDate } }, { starTime: { '$lt': nextDay } }] }, { type: "Work" }, { userID: id }] }, { "timeTaken": 1 })
        const workTotal = query.reduce((acc, curr) => acc + curr.timeTaken, 0);
        const query2 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': currDate } }, { starTime: { '$lt': nextDay } }] }, { type: "Meeting" }, { userID: id }] }, { "timeTaken": 1 })
        const meetingTotal = query2.reduce((acc, curr) => acc + curr.timeTaken, 0);
        const query3 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': currDate } }, { starTime: { '$lt': nextDay } }] }, { type: "Break" }, { userID: id }] }, { "timeTaken": 1 })
        const breakTotal = query3.reduce((acc, curr) => acc + curr.timeTaken, 0);
        const allTasks = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': currDate } }, { starTime: { '$lt': nextDay } }] }, { userID: id }] }, { "__v": 0, "_id": 0 })
        res.status(200).json({ work: workTotal, meeting: meetingTotal, break: breakTotal, allTasks: allTasks })
        }
        catch (err) { console.error(err); res.status(500).json({ error: "Internal Server Error" }) }
    }
}
export default connectDB(handler);
