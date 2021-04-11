import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container} from "react-bootstrap";
import { logout } from "../../lib/auth";
import AppContext from "../../context/AppContext";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Footer from "../footer/Footer";

const Layout = (props) => {
    const title = "Holidaze" ;
    const { user, setUser } = useContext(AppContext);

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar bg="none" expand="lg">
        <Navbar.Brand href="/">Holidaze</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
          <Link href="/establishments" passHref><Nav.Link>Establishments</Nav.Link></Link>
          <Link href="/contact" passHref><Nav.Link>Contact</Nav.Link></Link>
          </Nav>
          <Nav className="mr">
            <Nav.Item>
             {user ? (
               <Link href="/admin">
                 <a  className="mr-3">
                   Admin
                 </a>
               </Link>
             ) : (
              <></>
             )}
            </Nav.Item>
            <Nav.Item>
              {user ? (
                <Link href="/">
                  <a
                    onClick={() => {
                      logout();
                      setUser(null);
                    }}
                  >
                    Logout
                  </a>
                </Link>

              ) : (
                <Link href="/login">
                  <a>Sign in</a>
                </Link>
              )}
            </Nav.Item>
            
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <style jsx global>{`
          
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

          * {
          font-family: 'Roboto', sans-serif;
          font-weight: 300;
          }

          a {
            text-decoration: none;
            color: black;
            transistion: .3s;
    
          }

          a:hover {
            text-decoration: none;
            color: black;
            transform: scale(1.11);
            cursor: pointer;
          }

        

        `}</style>
        <Container fluid className="main">{props.children}</Container>
        <Footer />
      </div>
    );
  };
  
  export default Layout;
  // import Router from 'next/router'
  // <div onClick={() => Router.back()} className="ml-3">Back</div>

  







