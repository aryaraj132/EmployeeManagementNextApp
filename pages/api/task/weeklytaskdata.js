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
            const { id } = req.body;
            const currDate = new Date();
            const currMonth = currDate.getMonth();
            const currYear = currDate.getFullYear();
            const week1 = new Date(currYear + "-" + (currMonth + 1) + "-01")
            const week2 = new Date(currYear + "-" + (currMonth + 1) + "-08")
            const week3 = new Date(currYear + "-" + (currMonth + 1) + "-15")
            const week4 = new Date(currYear + "-" + (currMonth + 1) + "-22")
            let week5 = undefined;
            if (currMonth === 0 || currMonth === 2 || currMonth === 4 || currMonth === 6 || currMonth === 7 || currMonth === 9 || currMonth === 11) {
                week5 = new Date(currYear + "-" + (currMonth + 1) + "-31")
            } else if (currMonth === 1 && currYear % 4 === 0) {
                if (currYear % 100 === 0 && currYear % 400 !== 0) {
                    week5 = new Date(currYear + "-" + (currMonth + 1) + "-28")
                } else {
                    week5 = new Date(currYear + "-" + (currMonth + 1) + "-29")
                }
            } else if (currMonth === 1 && currYear % 4 !== 0) {
                week5 = new Date(currYear + "-" + (currMonth + 1) + "-28")
            }
            else {
                week5 = new Date(currYear + "-" + (currMonth + 1) + "-30")
            }
            const w1q1 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week1 } }, { starTime: { '$lt': week2 } }] }, { type: "Work" }, { userID: id }] }, { "timeTaken": 1 })
            const w1workTotal = w1q1.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w1q2 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week1 } }, { starTime: { '$lt': week2 } }] }, { type: "Meeting" }, { userID: id }] }, { "timeTaken": 1 })
            const w1meetingTotal = w1q2.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w1q3 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week1 } }, { starTime: { '$lt': week2 } }] }, { type: "Break" }, { userID: id }] }, { "timeTaken": 1 })
            const w1breakTotal = w1q3.reduce((acc, curr) => acc + curr.timeTaken, 0);
    
            const w2q1 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week2 } }, { starTime: { '$lt': week3 } }] }, { type: "Work" }, { userID: id }] }, { "timeTaken": 1 })
            const w2workTotal = w2q1.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w2q2 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week2 } }, { starTime: { '$lt': week3 } }] }, { type: "Meeting" }, { userID: id }] }, { "timeTaken": 1 })
            const w2meetingTotal = w2q2.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w2q3 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week2 } }, { starTime: { '$lt': week3 } }] }, { type: "Break" }, { userID: id }] }, { "timeTaken": 1 })
            const w2breakTotal = w2q3.reduce((acc, curr) => acc + curr.timeTaken, 0);
    
            const w3q1 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week3 } }, { starTime: { '$lt': week4 } }] }, { type: "Work" }, { userID: id }] }, { "timeTaken": 1 })
            const w3workTotal = w3q1.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w3q2 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week3 } }, { starTime: { '$lt': week4 } }] }, { type: "Meeting" }, { userID: id }] }, { "timeTaken": 1 })
            const w3meetingTotal = w3q2.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w3q3 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week3 } }, { starTime: { '$lt': week4 } }] }, { type: "Break" }, { userID: id }] }, { "timeTaken": 1 })
            const w3breakTotal = w3q3.reduce((acc, curr) => acc + curr.timeTaken, 0);
    
            const w4q1 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week4 } }, { starTime: { '$lte': week5 } }] }, { type: "Work" }, { userID: id }] }, { "timeTaken": 1 })
            const w4workTotal = w4q1.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w4q2 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week4 } }, { starTime: { '$lte': week5 } }] }, { type: "Meeting" }, { userID: id }] }, { "timeTaken": 1 })
            const w4meetingTotal = w4q2.reduce((acc, curr) => acc + curr.timeTaken, 0);
            const w4q3 = await Task.find({ $and: [{ $and: [{ starTime: { '$gte': week4 } }, { starTime: { '$lte': week5 } }] }, { type: "Break" }, { userID: id }] }, { "timeTaken": 1 })
            const w4breakTotal = w4q3.reduce((acc, curr) => acc + curr.timeTaken, 0);
    
            data = {
                week1: {
                    work: w1workTotal,
                    meeting: w1meetingTotal,
                    break: w1breakTotal
                },
                week2: {
                    work: w2workTotal,
                    meeting: w2meetingTotal,
                    break: w2breakTotal
                },
                week3: {
                    work: w3workTotal,
                    meeting: w3meetingTotal,
                    break: w3breakTotal
                },
                week4: {
                    work: w4workTotal,
                    meeting: w4meetingTotal,
                    break: w4breakTotal
                },
                labeled:{
                Work:[w1workTotal,w2workTotal,w3workTotal,w4workTotal],
                Break:[w1breakTotal,w2breakTotal,w3breakTotal,w4breakTotal],
                Meeting:[w1meetingTotal,w2meetingTotal,w3meetingTotal,w4meetingTotal],
            }
            }
    
            res.status(200).json(data)
        }
        catch (err) { console.error(err); res.status(500).json({ error: "Internal Server Error" }) }
    }
}
export default connectDB(handler);
