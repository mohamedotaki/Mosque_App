import "./css/ContactUs.css";
import Feedback from "../Components/Feedback/Feedback";
import { GeoAltFill, EnvelopeFill, TelephoneFill } from "react-bootstrap-icons";

import coverImage from "../about-us.jpg";

export default function ContactUs() {
  return (
    <div className="Main">
      <div className="ContactUs">
        <h2>Contact Details</h2>
        <hr width="80%" />
        <div className="ContactUsElements">
          <h4>
            <TelephoneFill color="Green" style={{ marginRight: "10px" }} />
            Call Us
          </h4>
          <a>+353</a>
        </div>
        <div className="ContactUsElements">
          <h4>
            <EnvelopeFill color="Green" style={{ marginRight: "10px" }} />
            Our Email
          </h4>
          <a href="mailto:info@ballyhaunis-mosque.org">
            info@ballyhaunis-mosque.org
          </a>
        </div>
        <div
          href="https://maps.app.goo.gl/Y5nGJzJhzwt8Ccy8A"
          className="ContactUsElements"
        >
          <h4>
            <GeoAltFill color="Green" style={{ marginRight: "10px" }} />
            Our Location
          </h4>
          <p>
            <strong>
              3 Sherwood Ave, Hazelhill, Ballyhaunis, Co. Mayo, F35 DY95
            </strong>
          </p>
        </div>
      </div>

      <div className="Location">
        <h2>Find Us</h2>
        <hr width="80%" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2358.6500217557473!2d-8.773649623674242!3d53.76011464368437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485c002638f95879%3A0xd82fc3aef9646f88!2sBallyhaunis%20Mosque%20kousar%20masjid!5e0!3m2!1sen!2sie!4v1698190128684!5m2!1sen!2sie"
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="Feedback">
        <h2>Feedback</h2>
        <hr width="80%" />

        <div className="Info">
          Thank you for using this webapp! If you have any suggestion about this
          webapp, please let us know in the form below. Any queries about the
          mosque please contact the mosque directly.
        </div>

        <Feedback />
      </div>
    </div>
  );
}
