//utility function to validate the format of an timestamp parameter
const validateTimestamp=(timestamp)=>{
    const formatTimestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
    return formatTimestampRegex.test(timestamp)
}
module.exports={validateTimestamp}