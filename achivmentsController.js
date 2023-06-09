const Paper = require('./models/Paper')
const Metal = require('./models/Metal')
const Plastic = require('./models/Plastic')
const Glass = require('./models/Glass')
const { validationResult } = require('express-validator')
const { response } = require('express')

class achivmentsController {

    async saveAll(req, res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({message: "error", errors})
            }
            const {hwid} = req.body;
            const candidate1 = await Paper.findOne({hwid})
            if (candidate1) {
                return res.json({message: "exist"})
            }
            var achiv = new Paper({hwid})
            await achiv.save()
            achiv = new Metal({hwid})
            await achiv.save()
            achiv = new Plastic({hwid})
            await achiv.save()
            achiv = new Glass({hwid})
            await achiv.save()
            return res.json({message: "saved"})
        } catch(e){
            res.json({message: 'save error' + e})
        }
    }

    async getPaper(req, res) {
        try {
            const {hwid} = req.body 
            const achivments = await Paper.findOne({hwid})
            if (achivments) {
                return res.json({achivments})
            }

            else {
                return res.json({message: 'false'})
            }
        } catch (e) {
            res.json({message: 'false'})
        }
    }

    async getMetal(req, res) {
        try {
            const {hwid} = req.body 
            const achivments = await Metal.findOne({hwid})
            if (achivments) {
                return res.json({achivments})
            }

            else {
                return resizeTo.json({message: 'false'})
            }
        } catch (e) {
            res.json({message: 'false'})
        }
    }

    async getPlastic(req, res) {
        try {
            const {hwid} = req.body 
            const achivments = await Plastic.findOne({hwid})
            if (achivments) {
                return res.json({achivments})
            }

            else {
                return res.json({message: 'false'})
            }
        } catch (e) {
            res.json({message: 'false'})
        }
    }

    async getGlass(req, res) {
        try {
            const {hwid} = req.body 
            const achivments = await Glass.findOne({hwid})
            if (achivments) {
                return res.json({achivments})
            }

            else {
                return res.json({message: 'false'})
            }
        } catch (e) {
            res.json({message: 'false'})
        }
    }

    async update(req, res){
        try{
            const {hwid, count1, count2, count3, count4} = req.body
            var app = await Paper.updateOne({'hwid': hwid }, {$set: {'count': count1} });
            app = await Metal.updateOne({'hwid': hwid }, {$set: {'count': count2} });
            app = await Plastic.updateOne({'hwid': hwid }, {$set: {'count': count3} });
            app = await Glass.updateOne({'hwid': hwid }, {$set: {'count': count4} });
            res.json({message: `Updated`})
        } catch(e){
            res.json({message: 'update error'})
        }
    }
}

module.exports = new achivmentsController()