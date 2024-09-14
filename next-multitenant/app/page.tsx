"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Provider,useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { logout } from "./slices/auth";
import { store } from './store';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./components/Post";
import Profile from "./components/profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import EventBus from "./common/EventBus";
import Image from "next/image";
import Home from "./components/Home";
import Main from "./components/Main";

export default function Page() {



  return (
    <React.StrictMode>
    <Provider store={store}>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Home />
        <Main />
      </div>
    </main>
    </Provider>
    </React.StrictMode>
  );
}
