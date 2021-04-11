import fetch from 'isomorphic-fetch'
import React, { useState, useEffect} from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Container, Form, Button, Col, Row} from "react-bootstrap";
import { BASE_URL } from '../../constants/api';
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

function Establishment({establishment}) {


  const router = useRouter();

  const { control, handleSubmit, register, setValue, formState: { errors } } = useForm();

  const establishmentName = establishment.name; 

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

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
    
    router.push("/enquiry/feedback")

} 
  return (
    <Container>
      <h1 className="mt-5 mb-5">{establishment.name} Enquiry </h1>
      <Form  onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col >
          <Form.Label>Check in</Form.Label>
        <Form.Group>
          <Controller
            control={control}
            name="startDate"
            render={({field}) => (
              <DatePicker
                selected={checkInDate}
                onChange={(e) => field.onChange(e)}
                minDate={(new Date())}
                selected={field.value}
              />
            )}
          />
          </Form.Group>
          <Form.Label>Check Out</Form.Label>
          <Form.Group >
          <Controller
            control={control}
            name="endDate"
            render={({field}) => (
              <DatePicker 
                selected={field.value}
                minDate={checkInDate}
                value={handleCheckOutDate}
                onChange={(e) => field.onChange(e)}
              /> 
            )}
          />
             {errors.field && <div className="alert alert-danger">Required field</div>}
        </Form.Group>
        {checkInDate && checkOutDate && (
        <div className="summary">
          <p>
            You are booking {establishment.name} from {moment(checkInDate).format("LL")} to{" "}
            {moment(checkOutDate).format("LL")}.
          </p>
        </div>
      )}
        </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="firstname">
              <Form.Label>First name</Form.Label>
              <Form.Control name="firstname" as="input" rows={3} placeholder="Enter first name"
              aria-invalid={errors.firstname ? "true" : "false"}
              {...register('firstname', { required: true })}/>
               {errors.firstname && <div className="alert alert-danger">Required field</div>}
            </Form.Group>
        </Col>
        
          <Col>
            <Form.Group controlId="lastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control name="lastname" as="input" rows={3} placeholder="Enter last name" {...register("lastname", { required: true })}/>
              {errors.lastname && <div className="alert alert-danger">Required field</div>}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="ControlEmailInput">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" as="input" rows={3} placeholder="Enter email" {...register("email", { required: true })}/>
          {errors.email && <div className="alert alert-danger">Required field</div>}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your message</Form.Label>
          <Form.Control  name="message" as="textarea" rows={3} placeholder="Your message" {...register("message")}/>
        </Form.Group>
        <Button type="submit" >Submit</Button>
      </Form>

    <style jsx>
    {`
          .summary p {
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }

          .react-datepicker__input-container {
            margin-right: 3rem;
          }
    `}
    </style>
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