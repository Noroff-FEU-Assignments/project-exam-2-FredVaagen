import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-lg-left footer-main ' >
      <MDBContainer className='p-4 mt-5'>
        <MDBRow>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>ABOUT US</h5>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-dark'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 2
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 3
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 4
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>ESTABLISHMENTS</h5>

            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-dark'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 2
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 3
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 4
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0 ' >
            <h5 className='text-uppercase'>CONTACT US</h5>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-dark'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 2
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 3
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 4
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>WORK</h5>

            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-dark'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 2
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 3
                </a>
              </li>
              <li>
                <a href='#!' className='text-dark'>
                  Link 4
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='d-flex justify-content-between p-3 bottom-footer ' style={{ backgroundColor: '#FFFFFF' }}>
        &copy; {new Date().getFullYear()} Copyright:{' Holidaze, Inc'}
        <a className='text-dark' href='https://mdbootstrap.com/'>
        </a>
        <a className='text-dark' href='https://mdbootstrap.com/'>
        Personvern
        </a>
        <a className='text-dark'>Vilkår
        </a>
        <a className='text-dark'>
        Firmaopplysninger
        </a>
      </div>
      <style jsx global>{`
          

          .footer-main {
            border-top: 1px solid #E9E9E9;
          }

          .bottom-footer {
            font-size: 14px;
            flex-wrap: wrap;
           
    
          }

 


          .footer {
            margin-bottom: 5rem;
            
          }
      


        `}</style>
    </MDBFooter>
  );
}