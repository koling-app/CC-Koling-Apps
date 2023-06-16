const express = require("express");
const route = express.Router();
const userController = require("../controller/users");
const storyController = require("../controller/story");
const serviceController = require("../controller/services");

route.get("/users", userController.readAllUser);
route.post("/register", userController.createNewUser);
route.patch("/user/:id", userController.editUser);
route.post("/login", userController.loginUser);

route.get("/story", storyController.readAllStory);
route.post("/story", storyController.createNewStory);

route.get("/services", serviceController.readAllService);
route.post("/service", serviceController.createNewServices);
route.get("/service/:name", serviceController.searchService);

module.exports = route;
