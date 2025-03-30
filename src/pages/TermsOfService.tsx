import React from "react";
import "../../src/index.css";
import logUI from "../assets/CIVIC.png";

function TermsOfService() {
  return (
    <div className="bg-white text-black">
      <div className="md:w-[50%] w-[100%] p-[10px] m-auto pt-[40px]">
        <div className="flex justify-center">
          <img width={40} src={logUI} alt="CIVIC REPORTS Logo" />
        </div>
        <h1 className="text-center">Terms of Service</h1>
        <p className="p text-center">
          <strong>Last Updated: 29/03/25</strong>
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using CIVIC REPORTS ("we," "us," or "our"), you agree
          to comply with these Terms of Service. If you do not agree, please do
          not use our Service.
        </p>

        <h2>2. User Accounts</h2>
        <p>You may need to create an account to access certain features:</p>
        <ul className="p">
          <li>You must provide accurate and complete information.</li>
          <li>You are responsible for maintaining account security.</li>
          <li>
            We reserve the right to suspend or terminate accounts for
            violations.
          </li>
        </ul>

        <h2>3. User Conduct</h2>
        <p>By using our Service, you agree to:</p>
        <ul className="p">
          <li>Respect others and refrain from hate speech or harassment.</li>
          <li>Not engage in illegal activities or fraudulent behavior.</li>
          <li>Not distribute spam, malware, or unauthorized advertisements.</li>
        </ul>

        <h2>4. Content Ownership and Usage</h2>
        <p>
          Users retain ownership of the content they post. However, by posting
          on CIVIC REPORTS, you grant us a non-exclusive license to use, modify,
          and distribute your content within our platform.
        </p>

        <h2>5. Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party websites. We are not
          responsible for their content, policies, or practices.
        </p>

        <h2>6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you
          violate these Terms of Service or engage in prohibited activities.
        </p>

        <h2>7. Disclaimers and Limitations of Liability</h2>
        <p>
          Our Service is provided "as is" without warranties. We are not liable
          for damages resulting from your use of our platform.
        </p>

        <h2>8. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Changes will
          be posted on this page with an updated “Last Updated” date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about these Terms, contact us at:</p>
        <p className="p">sudeepkondabathula@gmail.com</p>
      </div>
    </div>
  );
}

export default TermsOfService;
