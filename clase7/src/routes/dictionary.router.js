import Router from "express"
import DictionaryService from "../../service/DictionaryService.js";

const dictionaryRoutes = Router();

dictionaryRoutes.get("/:word", (req, res) => {
    let word = req.params.word;

    if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/.test(word)) {
        return res.redirect("/error404");
    }

    res.send({status:"ok", message:"Word: " + word});
})

dictionaryRoutes.param("word", async (req, res, next, word) => {
    let searchWord = await DictionaryService.find(word);
   
    if (searchWord) {
        req.word = searchWord;
        next();
    } else {
        req.word = null;
        res.redirect("/error");
    }
})

/* dictionaryRoutes.get("/*path", (req, res) => {
    console.log("hola");
    res.status(404).send({status:"error", message:"Error 404! Page Not Found!"});
}) */

export default dictionaryRoutes