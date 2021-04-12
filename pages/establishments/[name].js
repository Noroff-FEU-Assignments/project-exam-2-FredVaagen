import fetch from 'isomorphic-fetch'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { BASE_URL } from '../../constants/api';
import Carousel from 'react-bootstrap/Carousel'
import Link from 'next/link'

import MapSection from '../../components/establishments/maps/SimpleMap';
import SimpleMap from '../../components/establishments/maps/SimpleMap'

export default function Establishment({establishment}) {
  const images = establishment.images;

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  } // our location object from earlier

  return (
    <Container className="establishment">
      <Row>
        <Col s={12} md={6} className="main-image  mb-3">
          <Carousel>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={establishment.promoteImage.url}
                alt="First slide"
              />
            </Carousel.Item>
            {images.map(image => 
              <Carousel.Item key={image.id}>
                <Image 
                  className="d-block w-100" 
                  src={image.url} 
                  alt="">
                </Image>
                </Carousel.Item>
            )} 
          </Carousel>
            </Col>
            <Col className="description" s={12} md={6}>
                <h2>{establishment.name}</h2>
                <p>{establishment.description}</p>
                <div className="price-location">
                  <p className="location">Location: {establishment.address} </p>
                  <p className="price">NOK {establishment.price} per night</p>
                </div>
                <Link href="/enquiry/[name]" as={`/enquiry/${establishment.name}`}><Button className="button">BOOK NOW</Button></Link>
            </Col>
          </Row>

          <Container className="establishment-details">
            <Row>
       <SimpleMap />
            </Row>
          </Container>

          <style jsx global>{`

            .establishment {
              margin-top: 5%;
              height: auto;
              margin-bottom: 5%;
              color: black;
            }

            .description {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              

            }

              .carousel-item img {
                max-height: 350px;
              }

              .price-location {
                display: flex;
                justify-content: space-between;
              }

             

            .button {
              background: none;
              color: black;
              border: 1px solid black;
            }

            .button:hover {
              background: black;
              color: white;
            }

            .establishment-details {
              height: 50vh;
            
             
              
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

