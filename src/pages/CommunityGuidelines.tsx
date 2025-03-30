import React from "react";
import "../../src/index.css";
import logUI from "../assets/CIVIC.png";

function CommunityGuidelines() {
  return (
    <div className="bg-white text-black">
      <div className="md:w-[50%] w-[100%] p-[10px] m-auto pt-[40px]">
        <div className="flex justify-center">
          <img width={40} src={logUI} alt="CIVIC REPORTS Logo" />
        </div>
        <h1 className="text-center">Community Guidelines</h1>
        <p className="p text-center">
          <strong>Last Updated: 29/03/25</strong>
        </p>

        <h2>1. Be Respectful</h2>
        <p>
          Treat others with kindness and respect. Harassment, hate speech, or
          discrimination based on race, gender, religion, or other factors will
          not be tolerated.
        </p>

        <h2>2. No Misinformation or Fake News</h2>
        <p>
          Ensure that the content you share is accurate and verified. Spreading
          false information or misleading content is prohibited.
        </p>

        <h2>3. No Spam or Self-Promotion</h2>
        <p>
          Avoid excessive self-promotion, spam, or irrelevant advertisements.
          Meaningful contributions to discussions are encouraged.
        </p>

        <h2>4. Protect Privacy</h2>
        <p>
          Do not share personal or confidential information about yourself or
          others without consent. This includes private addresses, phone
          numbers, and financial details.
        </p>

        <h2>5. No Harmful or Illegal Activities</h2>
        <p>
          Do not use our platform to promote or engage in illegal activities,
          threats, violence, or anything that could cause harm to others.
        </p>

        <h2>6. Report Violations</h2>
        <p>
          If you notice any content that violates these guidelines, report it to
          our moderation team. We appreciate your help in maintaining a positive
          community.
        </p>

        <h2>7. Enforcement</h2>
        <p>
          Users who violate these guidelines may face consequences, including
          warnings, content removal, or account suspension.
        </p>

        <h2>8. Changes to Guidelines</h2>
        <p>
          We may update these Community Guidelines from time to time. Changes
          will be posted on this page with an updated “Last Updated” date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about these guidelines, contact us at:</p>
        <p className="p">sudeepkondabathula@gmail.com</p>
      </div>
    </div>
  );
}

export default CommunityGuidelines;
