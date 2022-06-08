import React, { Component, Fragment } from "react";

class Footer extends Component {
  render() {
    return (
      <div style={{ bottom: 0, width:"100%" , height:"80px" }} className="row w-100 bg-dark">
        <div className="row bg-dark container mx-auto px-6 pt-10 pb-6 justify-content-center">
            <span className="text-white text-center col align-self-center"> © Librairy Corp. All rights reserved.</span>
        </div>
      </div>
    );
  }
}

export default Footer;
