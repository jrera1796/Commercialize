const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [{
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock', 
      ]
    }],
  }).then(tagAll => {
    res.json(tagAll)
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
      ]
    }]
  }).then(tagOne => {
    if (!tagOne) {
      res.status(404).json({ message: 'No tags found with this ID' })
    }
    res.json(tagOne)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagCreate => {
      res.json(tagCreate)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then((tagUpdate) => {
      if (!tagUpdate) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagUpdate);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteTag => {
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(404).json({ message: 'Tag Deleted' });

  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
