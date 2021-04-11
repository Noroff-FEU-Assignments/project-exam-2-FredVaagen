import React from "react";
import App from "next/app";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css"
import 'react-datepicker/dist/react-datepicker.css';


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";



class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount() {
    // grab token value from cookie
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default MyApp;