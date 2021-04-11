import fetch from 'isomorphic-fetch'
import React, { useState} from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Container, Form, Button, Col, Row} from "react-bootstrap";
import { BASE_URL } from '../../constants/api';
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

function Establishment({establishment}) {
  const { register, control, handleSubmit, formState:{ errors } } = useForm()

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


  const onSubmit = async event => {
    await fetch('http://localhost:1337/enquiries', {
      body: JSON.stringify({
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        establishmentName: establishmentName,
        message:event.target.message.value,
        email: event.target.email.value,
        startDate: checkInDate,
        endDate: checkOutDate,
       
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
  }



  return (
    <Container>
      <h1 className="mt-5 mb-5">{establishment.name} Enquiry </h1>
      <Form  onSubmit={onSubmit}>

        <Row>
          <Col >
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
        </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="firstname">
              <Form.Label>First name</Form.Label>
              <Form.Control name="firstname" as="input" rows={3} placeholder="Enter first name" required/>
            </Form.Group>
        </Col>
        
          <Col>
            <Form.Group controlId="lastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control name="lastname" as="input" rows={3} placeholder="Enter last name" required/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="ControlEmailInput">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" as="input" rows={3} placeholder="Enter email" required/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your message</Form.Label>
          <Form.Control  name="message" as="textarea" rows={3} placeholder="Your message"/>
        </Form.Group>
        <Button type="submit" >Submit</Button>
      </Form>

    <style jsx>
    {`

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