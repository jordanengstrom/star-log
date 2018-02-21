var router = require('express').Router();
var Ships = require('../models/ship');

// GET ALL SHIPS
router.get('/api/ships', (req, res, next) => {
    Ships.find({})
        .then(ships => {
            res.send(ships);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// GET SHIP BY ID
router.get('/api/ships/:id', (req, res, next) => {
    Ships.findById(req.params.id)
        .then(ship => {
            if(!ship){
                res.status(400).send({error: 'Invalid ID '});
            }
            return res.send(ship);
        })
        .catch(err => res.status(500).send(err));
});

// CREATE A SHIP
router.post('/api/ships', (req, res, next) => {
    Ships.create(req.body)
        .then(ship => {
            res.send(ship);
        })
        .catch( err => res.status(400).send(err));
});

// DESTROY A SHIP
router.delete('/api/ships/:id', (req, res, next) => {
    Ships.findByIdAndRemove(req.params.id, (err, ship) => {
        if (err) return res.status(500).send(err);
            const response = {
                message: "Ship successfully destroyed!",
                id: ship.id
            }
        return res.status(200).send(response);
    }); 
});

// UPDATE A SHIP
router.put('/api/ships/:id', (req, res, next) => {
    Ships.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, ship) => {
            if(err) return res.status(500).send(err);
            return res.send(ship);
        }
    );
});

module.exports = router;
