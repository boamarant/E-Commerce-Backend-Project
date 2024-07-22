const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories with the products within them
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single category using id along with products with it
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by its new ID
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a specific category using its ID
router.delete('/:id', async (req, res) => {
  try {
    const affectedRows = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
