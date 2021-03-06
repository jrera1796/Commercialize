const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
    ]
  }).then(catsAll => {
    res.json(catsAll)
  })
    .catch(err => {
      if (err) { throw err };
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(catsOne => {
    if(!catsOne){
      res.status(404).json({ message: 'No post found with this id' });
    }
    res.json(catsOne)
  })
});


router.post('/', (req, res) => {
  // Create a new category
  Category.create(
    {
      category_name: req.body.category_name
    })
    .then(catsPost => {
      res.json(catsPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // Update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(updateCats => {
    if (!updateCats) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(updateCats);
  })
});

router.delete('/:id', (req, res) => {

  // Delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteCats => {
    if (!deleteCats) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json({ message: 'Category Deleted' });

  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
