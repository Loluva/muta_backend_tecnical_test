// Validate optimal path parameters
const validateOptimalPathParameters=({materialList,maxWeight})=>{
  if(maxWeight==undefined || typeof(maxWeight)!=="number" ){
    let error= new Error("Invalid parameter: maxWeight")
    error.status=400
    throw error
  }
  materialList.forEach(meterial=>{
    if(!("weight" in meterial && "value" in meterial && "name" in meterial)){
      let error= new Error(`Invalid parameter: materialList. Problem at material: ${JSON.stringify(meterial)}`)
      error.status=400
      throw error
    }
  })
}
// Endpoint for calculating the optimal path
const postOptimalPath =(req,res)=>{
   validateOptimalPathParameters(req.body)
    const {materialList,maxWeight}=req.body
    // Filter recyclable materials
    const recyclableMaterialList=materialList.filter(material=>['plástico', 'cartón', 'vidrio', 'metales'].includes(material.name.toLowerCase()))

     // Initialize a matrix for dynamic programming
    const numItems=recyclableMaterialList.length
    const resultsMatrix = new Array(numItems + 1).fill(null).map(() => new Array(maxWeight + 1).fill(0));

    // Dynamic programming to find the optimal path
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
     // Send the optimal path and total value in the response
    return res.json({"optimalPath":selectedMaterials.reverse(),"totalValue":selectedMaterials.reduce((total,material)=>total+Number(material.value),0)}) 
}

module.exports={postOptimalPath}