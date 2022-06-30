const express = require("express");
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,createNote);

noteRouter.delete("/:noteId",auth,deleteNote);

noteRouter.put("/:noteId",auth,updateNote);

module.exports = noteRouter;