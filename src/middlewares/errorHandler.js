// Custom error handling middleware
const errorHandler=(error,req,res,next)=>{

  let status = error.status || 500;
  let message = error.message || 'Internal Server Error';

  console.error(error)
  return res.status(status).json({error:message});
}
module.exports={errorHandler}

