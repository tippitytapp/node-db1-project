const express = require('express');
const Accounts = require('./data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    // Retrieve an individual account based on ID
    // SELECT * FROM Accounts WHERE ID = req.params.id
    Accounts('accounts')
        .where({id: req.params.id})
        .first()
        .then(account => {
            if(account){
                res.status(200).json({
                    data: account
                })
            } else {
                res.status(404).json({
                    errorMessage: "No account found with that ID"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error retrieving account",
                error: error
            })
        })
})

router.post('/', (req, res) => {
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


// Middleware

function validateNewAccount(req, res, next){
    const name = req.body.name;
    const budget = req.body.budget;
    if(!name || typeof name === String){
        res.status(400).json({
            errorMessage: "Please provide a name"
        })
    } else if (!budget || typeof budget === Number){
        res.status(400).json({
            errorMessage: "Please provide a numberical budget"
        })
    }else{
        next();
    }
    }

module.exports = router;