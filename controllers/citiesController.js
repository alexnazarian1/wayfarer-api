const db = require('../models');

function handleError(res, err, message, status = 400) {
  console.log(message, err);
  return res.status(status).json({ message: 'SERVER ERROR' });
};

const index = (req, res) => {
  db.City.find({}, (err, foundCities) => {
    if (err) {return handleError(res, err, 'Error in cities#index:')};
    if (!foundCities) {return res.json({ message: 'No cities in database' })};
    res.json({ cities: foundCities });
  });
};

const show = (req, res) => {
  db.City.findById(req.params.id, (err, foundCity) => {
    if (err) {return handleError(res, err, 'Error in cities#show:')};
    if (!foundCity) {return res.json({ message: 'City not found in database' })};
    res.json({ city: foundCity });
  });
};

const create = (req, res) => {
    // Validations??
  db.City.create(req.body, (err, savedCity) => {
    if (err) {return handleError(res, err, 'Error in cities#create:')};
    res.status(201).json({ city: savedCity });
  });
};

const update = (req, res) => {
    // Validations??
  db.City.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCity) => {
    if (err) {return handleError(res, err, 'Error in cities#update:')};
    res.status(201).json({ city: updatedCity });
  });
};

const destroy = (req, res) => {
  db.City.findByIdAndDelete(req.params.id, (err, deletedCity) => {
    if (err) {return handleError(res, err, 'Error in cities#destroy:')};
    res.json({ city: deletedCity});
  });
};


module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};