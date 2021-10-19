const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        // const criteria = _buildCriteria(filterBy)
        // console.log('criteria', criteria);
        const collection = await dbService.getCollection('comment')
        var toys = await collection.find().toArray()
        return toys
    } catch (err) {
        throw err
    }
}
async function add(comment) {
    try {
        const collection = await dbService.getCollection('comment')
        const addedComment = await collection.insertOne(comment)
        return addedComment
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