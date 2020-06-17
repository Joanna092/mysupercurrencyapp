import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
       <div className="container">
          <div className="row">
             <div className="col-12 col-sm-4 col-md-5">
                <p className="cp-text">
                   © Copyright 2020 THE BANKER. All rights reserved.
                </p>
             </div>
             <div className="col-12 col-sm-8 col-md-7 socialIcons">
                <a href="#" className="fa fa-twitter"></a>
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-linkedin"></a>
                <a href="#" className="fa fa-skype"></a>
                <a href="#" className="fa fa-youtube"></a>
             </div>
          </div>
       </div>
    </footer>
    );
    }
    export default Footer;