const StoryModel = require("../models/story");

const readAllStory = async (req, res) => {
  try {
    const [data] = await StoryModel.getAllStory();
    res.json({
      message: "Get All Story",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      errorMessage: error,
    });
  }
};

const createNewStory = async (req, res) => {
  const { body } = req;
  try {
    await StoryModel.addNewStory(body);
    res.json({
      message: "Create New User Success",
      data: body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = { readAllStory, createNewStory };
