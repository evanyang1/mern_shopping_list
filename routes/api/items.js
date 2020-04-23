const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Item Model
const Item = require('../../models/Item')

// @route GET api/items
// @desc Get All Items
// We don't need to do /api/items because in server.js it's done for us
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 }) // descending sort
        .then(items => res.json(items))
})

// @route POST /api/items
// @desc Create an item
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item ({
        name: req.body.name
    })
    // save() is MongoDB's post function
    newItem.save().then(item => res.json(item))
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Private
router.delete('/:id', auth, (req, res) => {
    // fetch by URI
    Item.findById(req.params.id).then(item => item.remove().then(_ => res.json({ success: true})))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router