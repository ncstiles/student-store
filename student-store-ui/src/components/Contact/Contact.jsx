import * as React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <h1 className="contact-header">Contact Us</h1>
      <div className="contact-info">
        <div className="contact-rows">
          <div className="contact-cols">
            <span>Email</span>
            <span className="last">ncstiles@fb.com</span>
          </div>

          <div className="contact-cols">
            <span>Phone</span>
            <span>1-800-BEST-SITE</span>
          </div>

          <div className="contact-cols">
            <span>Address</span>
            <div className="contact-rows">
              <span>111 Lucky Street</span>
              <span>Lostville, Kentucky</span>
              <span>USA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
