import fetch from 'isomorphic-fetch'
import React, { useState, useEffect} from "react";
import { useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Container, Form, Button, Col, Row} from "react-bootstrap";
import { BASE_URL } from '../../constants/api';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


const schema = yup.object().shape({
  firstname: 
    yup
      .string()
      .required("Please enter a first name")
      .min(2),

  lastname: 
    yup
      .string()
      .required("Please enter a last name")
      .min(3),

  email: 
     yup
      .string()
      .required("Please enter a valid email address")
      .matches(/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/, "Please enter a valid email address"),

      //startDate: 
      //yup
      //.object()
      //.required(),

      //endDate: 
     // yup
      //.object()
      //.required(),
      

    message: 
      yup
        .string()
       // .required("Please enter a message")
        //.min(10),
  });

function Establishment({establishment}) {
  const { register, control, handleSubmit, formState:{ errors } } = useForm({ 
    resolver: yupResolver(schema)});

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  console.log("Check in:", typeof(checkInDate))
  console.log("Check out:", checkOutDate)

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  const onSubmit = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      
    };

    await fetch([BASE_URL + "/enquiries"], requestOptions);
    
    console.log(data)
} 



  return (
    <Container>
      <h1 className="mt-5 mb-5">{establishment.name}</h1>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control {...register("firstname")} />
          {errors.firstname && <div className="alert alert-danger">{errors.firstname.message}</div>}
        </Form.Group> 
          <Form.Group>

          <Form.Label>Last name</Form.Label>
          <Form.Control  {...register("lastname")} />
          {errors.lastname && <div className="alert alert-danger">{errors.lastname.message}</div>}
        </Form.Group> 

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register("email")} />
          {errors.email && <div className="alert alert-danger">{errors.email.message}</div>}
        </Form.Group> 

        <Form.Label>Check in and check out dates</Form.Label>
        <Form.Group>
          <Controller
            control={control}
            name="startDate"
            render={({}) => (
              <DatePicker
                selected={checkInDate}
                onChange={handleCheckInDate}
               
              />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={() => (
              <DatePicker
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={handleCheckOutDate}
              />
            )}
          />

        </Form.Group>

        {checkInDate && checkOutDate && (
        <div className="summary">
          <p>
            You want to book {establishment.name} from {moment(checkInDate).format("LL")} to{" "}
            {moment(checkOutDate).format("LL")}.
          </p>
        </div>
      )}

        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message"  {...register("message")} />
           {errors.message && <div className="alert alert-danger">{errors.message.message}</div>}
        </Form.Group> 

        <Button variant="dark" type="submit" > Submit </Button>


      </Form>
    </Container>
  )
}

export async function getStaticProps({params: {name}}) {
    const establishment_res = await fetch(`${BASE_URL}/establishments/?name=${name}`)
    const specificEstablishment = await establishment_res.json()
  
    return {
      props: {
        establishment: specificEstablishment[0]
      }
    }
  }
  
  export async function getStaticPaths() {

      const establishments_res = await fetch(`${BASE_URL}/establishments`)
      const establishments = await establishments_res.json()
      return {
          paths: establishments.map(el => ({
              params: {name: String(el.name)}
          })),
          fallback: false
      };
  }

export default Establishment;


