const express = require('express');
const Accounts = require('./data/dbConfig.js');
const router = express.Router();
const {isValidQuery, validateAccount, validateAccountID} = require('./MIddleWare.js');

router.get('/', isValidQuery, (req, res) => {
    // Retrieve a list of all accounts in database
    // SELECT * FROM Accounts
    Accounts
        .select("*")
        .from('accounts')
        .then(accounts => {
            res.status(200).json({
                data: accounts
            })
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error retrieving accounts",
                error: error
            })
        })
})


router.get('/:id', validateAccountID, (req, res) => {
    // Retrieve an individual account based on ID
    // SELECT * FROM Accounts WHERE ID = req.params.id
    Accounts('accounts')
        .where({id: req.params.id})
        .first()
        .then(account => {
            res.status(200).json({
                data: account
            })
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error retrieving account",
                error: error
            })
        })
})

router.post('/', validateAccount, (req, res) => {
    // add a new account
    // INSERT INTO Accounts (account, 'id')
    const account = req.body;
    Accounts
        .insert(account, 'id')
        .into('accounts')
        .then(id => {
            if(id){
                res.status(201).json({
                    data: id,
                    message: "Acount Created Successfully"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error creating Account",
                error: error
            })
        })
})

router.put('/:id', validateAccountID, validateAccount, (req, res) => {
    const account = req.body
    Accounts('accounts')
        .where({id: req.params.id})
        .update({
            name: account.name,
            budget: account.budget
        }, 'id')
        .then(count => {
            if(count > 0){
                res.status(200).json({
                    recordsUpdated: count,
                    statusMessage: "record updated successfully"
                })
            } else {
                res.status(500).json({
                    errorMessage: "Could not update account"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error occured updating record",
                error: error
            })
        })
})

router.delete('/:id', validateAccountID, (req, res) => {
    Accounts('accounts')
        .where({id: req.params.id})
        .first()
        .del()
        .then(count => {
            if(count > 0){
                res.status(200).json({
                    deletedCount: count,
                    statusMessage: "Account deleted Successfully"
                })
            } else {
                res.status(500).json({
                    errorMessage: "Error deleting account"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error deleting account",
                error: error
            })
        })
})



module.exports = router;