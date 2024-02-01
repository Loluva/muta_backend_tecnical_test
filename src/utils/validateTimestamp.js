const validateTimestamp=(timestamp)=>{
    const formatTimestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
    return formatTimestampRegex.test(timestamp)
}
module.exports={validateTimestamp}