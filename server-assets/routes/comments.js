var router = require('express').Router();
var Comments = require('../models/comment');

// GET ALL COMMENTS ON A LOG
router.get('/api/ships/:shipId/logs/:logId/comments', (req, res, next) => {
    Comments.find({"logId":req.params.logId})
        .then(comments => {
            res.send(comments);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// GET A COMMENT BY ID
router.get('/api/ships/:shipId/logs/:logId/comments/:id', (req, res, next) => {
    Comments.findById(req.params.id)
        .then(log => {
            if(!log){
                res.status(400).send({error: 'Invalid ID '});
            }
            return res.send(log);
        })
        .catch(err => res.status(500).send(err));
});

// CREATE A COMMENT ON A LOG
router.post('/api/ships/:shipId/logs/:logId/comments', (req, res, next) => {
    Comments.create(req.body)
        .then(log => {
            res.send(log);
        })
        .catch( err => res.status(400).send(err));
});

// DELETE A COMMENT
router.delete('/api/ships/:shipId/logs/:logId/comments/:id', (req, res, next) => {
    Comments.findByIdAndRemove(req.params.id, (err, log) => {
        if (err) return res.status(500).send(err);
            const response = {
                message: "Comment successfully deleted!",
                id: log.id
            }
        return res.status(200).send(response);
    }); 
});

// UPDATE A COMMENT
router.put('/api/ships/:shipId/logs/:logId/comments/:id', (req, res, next) => {
    Comments.findByIdAndUpdate(
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
