"use strict";

const express = require("express");

const itemsDb = require("./fakeDb");

const router = new express.Router()

/** Return a list of shopping items */
app.get("/items", function (req, res) {
  return res.json({ "items": itemsDb });
});

app.post("/items:", function (req, res) {
  const newItem = req.json;
  itemsDb.push(newItem);
  return res.json({
    "added": newItem,
  });
});

app.get("/:name", function (req, res) {
  let responseItem = '';
  for (let i = 0; i < itemsDb.length; i++) {
    if (itemsDb[i]["name"] === req.params.name) {
      responseItem = itemsDb[i];
    }
  }
  if (!responseItem) {
    return res.status(404).json({ err: "No such item" });
  }

  return res.json({ responseItem });

});

app.patch("/:name", function (req, res) {
  let itemToUpdate = '';
  for (let i = 0; i < itemsDb.length; i++) {
    if (itemsDb[i]["name"] === req.params.name) {
      itemToUpdate = itemsDb[i];
    }
  }
  const newItemInfo = req.json;
  itemToUpdate.name = newItemInfo.name;
  itemToUpdate.price = newItemInfo.price;

  return res.json({ itemToUpdate });
});

app.delete("/:name", function(req, res) {
  for (let i = 0; i < itemsDb.length; i++) {
    if (itemsDb[i]["name"] === req.params.name) {
      itemsDb.splice(i, 1);
    }
  }
  return res.json({"message" : "Deleted"})
})

module.exports = router;