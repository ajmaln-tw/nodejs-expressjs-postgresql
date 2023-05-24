"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.add = exports.all = void 0;
const Todo_1 = require("../models/Todo");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // sequelize using find all and sending the response res.json
        const list = yield Todo_1.Todo.findAll();
        if (list) {
            res.json(list);
        }
    }
    catch (error) {
        res.status(502).json({ error });
    }
});
exports.all = all;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("body", req.body);
        // checking whether the body of the request request{body} was sent
        if (req.body.title && req.body.data) {
            // if it checked that the body of the request was sent title: ,data: and done: it does the insertion
            let newTodo = yield Todo_1.Todo.create({
                title: req.body.title,
                data: req.body.data,
                done: req.body.done,
            });
            if (newTodo) {
                const list = yield Todo_1.Todo.findAll();
                if (list) {
                    //sending the response that it was added to the database with the response 201 created.
                    res.status(201).json(list);
                }
            }
        }
    }
    catch (error) {
        res.status(502).json({ error });
    }
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let id = req.body.id;
        // adding in the variable the id that we send via params(id) and if it exists
        let todo = yield Todo_1.Todo.findByPk(id);
        if (todo) {
            if (req.body.title.toLowerCase()) {
                todo.title = req.body.title;
            }
            if (req.body.data.toLowerCase()) {
                todo.data = req.body.data;
            }
            if (req.body.done) {
                todo.done = req.body.done;
            }
            yield todo.save();
            const list = yield Todo_1.Todo.findAll();
            if (list) {
                res.status(200).json(list);
            }
        }
        else {
            res.json({ error: "item not found" });
        }
    }
    catch (error) {
        res.status(502).json({ error });
    }
});
exports.update = update;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield Todo_1.Todo.findByPk(req.body.id);
        if (todo) {
            yield todo.destroy();
            const list = yield Todo_1.Todo.findAll();
            if (list) {
                res.status(200).json(list);
            }
        }
        else {
            res.json({ message: "No todo found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(502).json({ error });
    }
});
exports.del = del;
