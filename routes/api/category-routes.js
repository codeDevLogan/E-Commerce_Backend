const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll()
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json( { err, message: 'Server Error: Please try again later.' });
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:category_id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.category_id)
    if(!categoryData) {
      res.status(404).json({ message: 'No category with that ID exsists' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json( { err, message: 'Server Error: Please try again later.' });
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json( { err, message: 'Server Error: Please try again later.' });
  }
});

router.put('/:category_id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        category_id: req.params.category_id
      }
    });
    if(!categoryData[0]){
      res.status(404).json({ message: 'No category with that ID exsists' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json( { err, message: 'Server Error: Please try again later.' });
  }
});

router.delete('/:category_id', async(req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.category_id
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json( { err, message: 'Server Error: Please try again later.' });
  }
  // delete a category by its `id` value
});

module.exports = router;
