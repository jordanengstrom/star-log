var router = require('express').Router();
var Logs = require('../models/log');

// GET ALL LOGS FOR SHIP
router.get('/api/ships/:shipId/logs', (req, res, next) => {
    Logs.find({"shipId":req.params.shipId})
        .then(logs => {
            res.send(logs);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// GET LOG BY ID
router.get('/api/ships/:shipId/logs/:id', (req, res, next) => {
    Logs.findById(req.params.id)
        .then(log => {
            if(!log){
                res.status(400).send({error: 'Invalid ID '});
            }
            return res.send(log);
        })
        .catch(err => res.status(500).send(err));
});

// CREATE A LOG FOR SHIP
router.post('/api/ships/:shipId/logs', (req, res, next) => {
    Logs.create(req.body)
        .then(log => {
            res.send(log);
        })
        .catch( err => res.status(400).send(err));
});

// DELETE A LOG
router.delete('/api/ships/:shipId/logs/:id', (req, res, next) => {
    Logs.findByIdAndRemove(req.params.id, (err, log) => {
        if (err) return res.status(500).send(err);
            const response = {
                message: "Log successfully deleted!",
                id: log.id
            }
        return res.status(200).send(response);
    }); 
});

// UPDATE A LOG
router.put('/api/ships/:shipId/logs/:id', (req, res, next) => {
    Logs.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, log) => {
            if(err) return res.status(500).send(err);
            return res.send(log);
        }
    );
});

module.exports = router;
