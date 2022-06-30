"use strict";

const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

beforeEach(function () {
  db.items.push(
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.4 }
  );
});

afterEach(function () {
  db.items = [];
});

test("GET /", async function () {
  const resp = await request(app).get(`/items/`);
  expect(resp.body).toEqual({ items: db.items });
});

test("POST /", async function () {
  const resp = await request(app).post(`/items/`).send({
    name: "bagels",
    price: 3.0,
  });
  expect(resp.statusCode).toEqual(201);
  expect(resp.body).toEqual({
    added: {
      name: "bagels",
      price: 3.0,
    },
  });
});

test("GET /:name", async function () {
  const resp = await request(app).get(`/items/cheerios`);
  expect(resp.statusCode).toEqual(200);
  expect(resp.body).toEqual({ name: "cheerios", price: 3.4 });
});

test("GET /:name", async function () {
  const resp = await request(app).get(`/items/xx`);
  expect(resp.statusCode).toEqual(404);
});

test("PATCH /:name", async function () {
  const resp = await request(app).patch(`/items/cheerios`).send({
    name: "fruit loops",
    price: 2.0,
  });
  expect(resp.statusCode).toEqual(200);
  expect(resp.body).toEqual({
      name: "fruit loops",
      price: 2.0,
    },
  );
});

test("DELETE /:name", async function () {
  const resp = await request(app).delete(`/items/cheerios`);
  expect(resp.statusCode).toEqual(200);
  expect(resp.body).toEqual({ message: "Deleted" });
  expect(db.items.length).toEqual(1);
});


