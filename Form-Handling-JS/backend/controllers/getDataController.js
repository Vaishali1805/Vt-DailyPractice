import myCache from '../myCache.js'

const getFormData = (req,res) => {
    console.log("am in getFormData");
    const data = myCache.get("submittedData");
    // console.log("🚀 ~ getFormData ~ data:", data)

    let file = myCache.get("profilePic")
    // console.log("file: ",file);

    res.json({ formData: data,fileData: file});
}

export {getFormData};