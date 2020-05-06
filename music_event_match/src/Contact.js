import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="contact">
        <h2 className="contact-header">Contact</h2>
        <div className="contact-cont">
          <div className="phone">
            <h3>Phone Number</h3>
            <h4>1(800)555-555</h4>
          </div>
          <div className="address">
            <h3>Address</h3>
            <h4>Music Event Match 12345 Jupiter Rd. Planet, OS 47282</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
