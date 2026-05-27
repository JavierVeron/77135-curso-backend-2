import Router from "express"

const petsRoutes = Router();
const pets = [];

petsRoutes.get("/:pet", (req, res) => {    
    if (req.pet) {
        res.send({status:"ok", data:req.pet});
    }
})

petsRoutes.post("/", (req, res) => {
    const {name, specie} = req.body;    
    const newPet = {id:(pets.length+1), name, specie};
    pets.push(newPet);

    res.send({status:"ok", data:newPet});
})

petsRoutes.put("/:pet", (req, res) => {
    if (req.pet) {        
        const searchPet = pets.find(item => item.name.toUpperCase() == req.pet.name.toUpperCase());
        searchPet.adopted = true;  
        res.send({status:"ok", data:searchPet});
    }

    const pet = req.params.pet;
})

petsRoutes.param("pet", async (req, res, next, pet) => {
    const searchPet = await pets.find(item => item.name.toUpperCase() == pet.toUpperCase());
   
    if (searchPet) {
        req.pet = searchPet;
        next();
    } else {
        res.status(400).send({status:"error", message:"No se encuentra la Mascota!"});
    }
})

export default petsRoutes