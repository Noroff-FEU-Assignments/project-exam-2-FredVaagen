import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parseCookies  } from 'nookies'
import Container from 'react-bootstrap/Container'
import { BASE_URL } from './../../../constants/api';
import { useRouter } from "next/router";

const FileUpload = () => {
  const { register, handleSubmit } = useForm();
  const submitData = async (data,ctx) => {
    const token = parseCookies(ctx).token


    try {
      const formDataToSend = {
        name: data.name,
        description: data.description, 
        price: data.price, 
        lat: data.lat, 
        lng: data.lng, 
        address: data.address, 
      };

        const inputValue = await axios({
        url: `${BASE_URL}/establishments`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: formDataToSend
      });

      const id = inputValue.data.id; 
      const formData = new FormData();
      formData.append("files", data.file[0]);
      formData.append("ref", "establishments"); //name of content type
      formData.append("refId", id); //id of content type
      formData.append("field", "promoteImage");
      const res = await axios({
        method: "POST",
        url: "http://localhost:1337/upload",
        data: formData
   
      });
      console.log("Success", res);
    } catch (error) {
      console.log(error);
    }

  };





  return (
    <Container>
    <div className="create-establishment">
      <form onSubmit={handleSubmit(submitData)}>
        <div><label>Name</label><input type="text" {...register("name")} /></div>
        <div><label>Description</label><textarea type="text" {...register("description")} /></div>
        <div><label>Price per night</label><input type="number" {...register("price")} /></div>
        <div><label>Latitude</label><input type="number" {...register("lat")} /></div>
        <div><label>Longitude</label><input type="number" {...register("lng")} /></div>
        <div><label>Address</label><input type="text" {...register("address")} /></div>
        <div><label>Upload establishment promo/thumbnail image (Maximum of 1)</label><input type="file" {...register("file")} /></div>
        <button>Create</button>
      </form>
    </div>


    <style global jsx >
			{`
				.create-establishment input, textarea {
			    width: 100%;
          margin-top: .1rem;
          margin-bottom: 2rem;
				}

  
        .create-establishment button {
          width: 150px;
        }

			`}
		</style>
    </Container>
  );
};

export default FileUpload;