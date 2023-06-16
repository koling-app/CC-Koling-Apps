const ServiceModel = require("../models/services");

const readAllService = async (req, res) => {
  try {
    const [data] = await ServiceModel.getAllService();
    res.json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      errorMessage: error,
    });
  }
};

const createNewServices = async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    await ServiceModel.addNewService(body);
    res.status(201).json({
      message: "Create New Services Success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const searchService = async (req, res) => {
  const { name } = req.params;
  try {
    const [data] = await ServiceModel.findService(name);
    res.status(200).json({
      message: "Find The Services",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = { createNewServices, readAllService, searchService };
