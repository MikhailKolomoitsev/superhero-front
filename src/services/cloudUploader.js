import Axios from "axios";

const cloudUploader = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ydxsrpeb");
    const respose = await Axios.post(`https://api.cloudinary.com/v1_1/dgkshor0g/image/upload`, formData).then(res => res.data.secure_url)
    return respose
}

export default cloudUploader