// utility function to wrap asynchronous route handlers with a try-catch block
const tryCatch=(controller)=>async(req,res,next)=>{
    try {
        // Call the provided controller function
        await controller(req,res)
    } catch (error) {
        // Pass any caught errors to the next middleware
        return next(error)
    }
}

module.exports={tryCatch}