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

      <div className='d-flex  p-3 bottom-footer justify-content-between'>
        <div>
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
        <div>
        <a className='text-dark'>
          Facebook
        </a>
        <a className='text-dark'>
          Instagram
        </a>
        <a className='text-dark'>
          Twitter
        </a>
        <a className='text-dark'>
          LinkedIn
        </a>
        </div>
      </div>

      
      <style jsx global>{`
          .footer-main {
            border-top: 1px solid #E9E9E9;
          }

          .bottom-footer {
            font-size: 14px;
            flex-wrap: wrap;
          }

          .bottom-footer a {
            margin-right: 1rem;
          }
        
        `}</style>
    </MDBFooter>
  );
}