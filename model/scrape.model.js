const mongoose = require('mongoose');

const scrapeDataSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  logo: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String }
});

const ScrapeData = mongoose.model('ScrapeData', scrapeDataSchema);

module.exports = ScrapeData;
