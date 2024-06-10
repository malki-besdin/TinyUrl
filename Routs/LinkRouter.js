import express from "express";
import LinkController from "../Conttrollers/LinkController.js";

const LinkRouter = express.Router();

LinkRouter.get("/redirect/:id", LinkController.redirect);
LinkRouter.get("/stats/:id", LinkController.getClickStats);

LinkRouter.get("/", LinkController.getList);
LinkRouter.get("/:id", LinkController.getById);
LinkRouter.post("/", LinkController.add);
LinkRouter.put("/:id", LinkController.update);
LinkRouter.delete("/:id", LinkController.delete);

export default LinkRouter;