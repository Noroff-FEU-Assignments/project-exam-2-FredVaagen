import fetch from 'isomorphic-fetch'
import React, { useState} from "react";
import DatePicker from "react-datepicker";
import { Container, Form, Button, Col, Row} from "react-bootstrap";
import { BASE_URL } from '../../constants/api';

import "react-datepicker/dist/react-datepicker.css";

function Establishment({establishment}) {

  const establishmentName = establishment.name; 
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  const onSubmit = async event => {
    event.preventDefault();
    
    const res = await fetch('http://localhost:1337/enquiries', {
      body: JSON.stringify({
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        establishmentName: establishmentName,
        message:event.target.message.value,
        email: event.target.email.value,
        startDate: startDate,
        endDate: endDate,
       
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    console.log(result)
  }


  return (

    <Container>
      <h1 className="mt-5 mb-5">{establishment.name}</h1>
      <Form onSubmit={onSubmit}>
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
        <Row>
        <Col>
        <Form.Group>
          <Form.Label>Pick start and end date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              minDate={(new Date())}
              required
           />
        </Form.Group>
        </Col>
        </Row>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your message</Form.Label>
          <Form.Control  name="message" as="textarea" rows={3} placeholder="Your message"/>
        </Form.Group>
        <Button type="submit" > {loading ? "Loading... " : "Submit"}</Button>
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