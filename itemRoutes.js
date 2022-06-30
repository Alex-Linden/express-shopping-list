"use strict";

const express = require("express");

const db = require("./fakeDb");
const itemsDb = db.items;

const router = new express.Router();

/** Return a list of shopping items */
router.get("/", function (req, res) {
  return res.json({ items: itemsDb });
});

/**accepts JSON, Add new item to items data base return item added */
router.post("/", function (req, res) {
  const newItem = req.body;
  itemsDb.push(newItem);
  //debugger;
  return res.status(201).json({
    added: newItem,
  });
});

/**accepts request param, returns single item: */
router.get("/:name", function (req, res) {
  let responseItem = "";
  for (let i = 0; i < itemsDb.length; i++) {
    if (itemsDb[i]["name"] === req.params.name) {
      responseItem = itemsDb[i];
    }
  }
  if (!responseItem) {
    return res.status(404).json({ err: "No such item" });
  }

  return res.json(responseItem);
});

/** accept JSON body, finds item in db, modify item, return it */
router.patch("/:name", function (req, res) {
  let itemToUpdate = "";
  for (let i = 0; i < itemsDb.length; i++) {
    if (itemsDb[i]["name"] === req.params.name) {
      itemToUpdate = itemsDb[i];
    }
  }
  const newItemInfo = req.body;
  itemToUpdate.name = newItemInfo.name;
  itemToUpdate.price = newItemInfo.price;

  return res.json(itemToUpdate);
});

/** accepts request param, finds item in db, deletes it, returns deleted message*/
router.delete("/:name", function (req, res) {
  for (let i = 0; i < itemsDb.length; i++) {
    if (itemsDb[i]["name"] === req.params.name) {
      itemsDb.splice(i, 1);
    }
  }
  return res.json({ message: "Deleted" });
});

module.exports = router;
