import myCache from '../myCache.js'

const getFormData = (req,res) => {
    console.log("am in getFormData");
    const data = myCache.get("submittedData");
    console.log("🚀 ~ getFormData ~ data:", data)

    res.json({ formData: data});
}

export {getFormData};