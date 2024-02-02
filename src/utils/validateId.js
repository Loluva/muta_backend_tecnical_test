//utility function to validate the format of an ID parameter
const validateidParameter=(id)=>{
    if(id==undefined || isNaN(id) || !Number.isInteger(Number(id))){
        let error= new Error("Invalid parameter: id")
        error.status=400
        throw error
    }
}
module.exports={validateidParameter}