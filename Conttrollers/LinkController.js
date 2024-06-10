import { query } from "express";
import LinkModel from "../Models/LinkModel.js";
import mongoose, { Query } from "mongoose";

const LinkController = {

  getList: async (req, res) => {
    try {
      const links = await LinkModel.find();
      links[3].targetParamName = "target"
      res.json({ links });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      console.log("get by id")
      const link = await LinkModel.findById(req.params.id);//שליפה לפי מזהה
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl } = req.body;
    try {
      const newLink = await LinkModel.create({ originalUrl });//הוספת חדש
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await LinkModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  redirect: async (req, res) => {
    try {
      const id = req.params.id;
      const target = req.query.t || "";
      console.log(target);
      if (target == "target") {
        const targetValue = url.targetValues[0].value;
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      const ipAddress = req.ip;
      const insertedAt = new Date();
      const url = await LinkModel.findById(id);

      if (!url) {
        return res.status(404).json({ message: "Link not found" });
      }
      url.clicks.push({ insertedAt, ipAddress, targetParamValue: target });
      url.save();
      return res.redirect(url.originalUrl);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },

  getClickStats: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const link = await LinkModel.findById(id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
      const stats = link.clicks.reduce((acc, click) => {
        const value = click.targetParamValue || "unknown";
        if (!acc[value]) {
          acc[value] = 0;
        }
        acc[value]++;
        return acc;
      }, {});
      return res.json(stats);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

};
export default LinkController;