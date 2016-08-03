var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./../models');
var Album = db.Album;

router.use(bodyParser.json({ extended : false }));

router.get('/',function(req, res){
  Album.findAll({
    where: {
      visibility : true
    }
  })
  .then(function(data){
    res.json(data);
  });
});

router.post('/',function(req, res){
  Album.create(req.body)
  .then(function(album){
    return res.json(album);
  });
});

router.get('/ofArtist/:id', function(req, res) {
  Album.findAll({
    where: {
      ArtistId: encodeURI(req.params.id),
      visibility : true
    }
  })
  .then(function(albums){
    return res.json(albums);
  });
});


router.get('/:id', function(req, res) {
  Album.findOne({
    where: {
      id: encodeURI(req.params.id),
      visibility : true
    }
  })
  .then(function(album){
    return res.json(album);
  });
});

router.put('/:id', function(req, res){
  Album.update(
  {
    updatedAt : 'now()',
    title : req.body.title,
    description : req.body.description,
    RecordLabelId : req.body.RecordLabelId
  }, {
    where : {
      id : req.params.id
    }
  })
  .then(function(album){
    return res.json(album);
  });
});


router.delete('/:id', function(req, res){
  Album.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(data){
    return res.json(data);
  });
});



module.exports = router;

