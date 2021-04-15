import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Container from 'react-bootstrap/Container'

const ImageUpload = () => {
  const { register, handleSubmit } = useForm();
  const submitData = async (data) => {
      const formData = new FormData();
      formData.append("files", data.file[0]);
      formData.append("ref", "establishments"); //name of content type
      formData.append("refId", 111); //id of content type
      formData.append("field", "images");

      const res = await axios({
        method: "POST",
        url: "http://localhost:1337/upload",
        data: formData
      });
      console.log("Success", res);
    } 

  return (
    <Container>
    <div className="FileUpload">
      <form onSubmit={handleSubmit(submitData)}>
        <div><input hidden type="text" {...register("name")} /></div>
        <div><label>Upload establishment images (Maximum of 5)</label><input type="file"  {...register("file")} /></div>
        <button type="submit">Upload</button>
      </form>
    </div>
    <style global jsx >
        {`
	    .FileUpload input {
			width: 100%;
            margin: 1rem;
	    } 
        .FileUpload button  
            margin: 1rem;
            width: 300px;
	    `}       
		</style>
    </Container>
  );
};

export default ImageUpload;