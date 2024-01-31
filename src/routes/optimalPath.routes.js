const {Router} =require("express")
const {authenticateJWT}=require("../middlewares/authMiddleware")

const optimalPathRoute=Router()

optimalPathRoute.post("/",authenticateJWT,(req,res)=>{

    const {materialList,maxWeight}=req.body
    const recyclableMaterialList=materialList.filter(material=>['plástico', 'cartón', 'vidrio', 'metales'].includes(material.name.toLowerCase()))
    
    const numItems=recyclableMaterialList.length
    const resultsMatrix = new Array(numItems + 1).fill(null).map(() => new Array(maxWeight + 1).fill(0));

    for (let i = 1; i <= numItems; i++) {
        for (let currentWeight = 0; currentWeight <= maxWeight; currentWeight++) {
          const itemWeight = recyclableMaterialList[i - 1].weight;
          const itemValue = recyclableMaterialList[i - 1].value;
    
          if (itemWeight <= currentWeight) {
            resultsMatrix[i][currentWeight] = Math.max(resultsMatrix[i - 1][currentWeight], resultsMatrix[i - 1][currentWeight - itemWeight] + itemValue);
          } else {
            resultsMatrix[i][currentWeight] = resultsMatrix[i - 1][currentWeight];
          }
        }
      }

    // Reconstruct the optimal solution
    let currentWeight = maxWeight;
    let selectedMaterials = [];

    for (let i = numItems; i > 0 && currentWeight > 0; i--) {
        if (resultsMatrix[i][currentWeight] !== resultsMatrix[i - 1][currentWeight]) {
        selectedMaterials.push(recyclableMaterialList[i - 1]);
        currentWeight -= recyclableMaterialList[i - 1].weight;
        }
    }
    return res.json(selectedMaterials.reverse()) 


})

module.exports={optimalPathRoute}
