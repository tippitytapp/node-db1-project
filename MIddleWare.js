module.exports={
    validateAccountID,
    validateAccount,
    isValidQuery
}
const Accounts = require('./data/dbConfig.js');

function validateAccountID(req, res, next){
    Accounts('accounts')
        .where({id: req.params.id})
        .first()
        .then(account => {
            if(account){
                next();
            } else {
                res.status(404).json({
                    errorMessage: "no account with that ID found"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error Retrieving Account(s)",
                error: error
            })
        })
}

function validateAccount(req, res, next){
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


function isValidQuery(req, res, next){
    const query = req.query;
    if(!query.limit || !query.sortBy){
        next();
    }else if(query.limit && query.sortBy) {
        Accounts('accounts')
            .select("*")
            .limit(query.limit)
            .orderBy(query.sortBy, query.sortDir)
            .then(accounts => {
                res.status(200).json({
                    data: accounts
                })
            })
            .catch( error => {
                res.status(500).json({
                errorMessage: "Error Retrieving Accounts",
                error: error
            })
        })

    } else {
        res.status(500).json({
            errorMessage: "Error Retrieving Accounts"
        })
    }
}