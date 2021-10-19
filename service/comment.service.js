const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
var md5 = require('md5');

async function query(filterBy = '') {
    try {

        const collection = await dbService.getCollection('comment')
        var comments = await collection.find({ txt: { $regex: filterBy, $options: 'i' } }).toArray()
        // console.log('comments', comments);
        return comments
    } catch (err) {
        throw err
    }
}
async function add(comment) {
    // console.log('comment', comment);
    try {
        const collection = await dbService.getCollection('comment')
        const found = await collection.findOne({ email: comment.email });
        if (found) {
            comment.imgUrl = found.imgUrl
        }
        else {
            // comment.imgUrl = `https://www.gravatar.com/${md5(comment.email)}`
            // console.log(comment.imgUrl);
            comment.imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU'
        }
        await collection.insertOne(comment)
        console.log('comment backend', comment);
        return comment;
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}

module.exports = {
    query,
    add
}