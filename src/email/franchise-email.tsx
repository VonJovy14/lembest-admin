import React from "react";

import {
  Body,
  Container,
  Head,
  Button,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const FranchiseEmail = ({ name }) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-12 mx-auto font-sans">
          <Container className="p-8 rounded-lg shadow-lg">
            <Img
              src="https://i.imgur.com/Sxn6KZn.png"
              alt="Franchise Email Image"
              className="w-full max-w-[200px] mx-auto mb-10"
            ></Img>

            <Text>Hi {name ? name : "there"}! 😊</Text>

            <Text className="text-justify">
              We saw your franchise inquiry come through our website—woohoo! 🎉
              First off, thank you for considering Lembest as your potential
              business partner. We&#x2019;re thrilled to share this exciting
              opportunity with you!
            </Text>

            <Text className="text-justify">
              Becoming a <strong className="strong">Lembest Franchisees</strong>{" "}
              means stepping into a proven and profitable business with&#xa0;
              <strong className="strong">
                zero royalty fees, zero marketing fees, and no sales quota!
              </strong>
              &#xa0; Sounds awesome, right? Let&#x2019;s dive into the details:
            </Text>

            <div className="mt-8">
              <Text className="text-xl font-bold">
                📌 Franchise Fee: ₱250,000 &#x28;valid for 4 years!&#x29;
              </Text>

              <div className="ml-5">
                <Text className="m-0 text-base">
                  Here&#x2019;s what&#x2019;s included:
                </Text>

                <Text className="m-0">
                  ✔ Use of our Trade Name & Proprietary Marks
                </Text>

                <Text className="m-0">
                  ✔ Site Approval + Market Study &#x28;so we choose the best
                  location for success!&#x29;
                </Text>

                <Text className="m-0">✔ Comprehensive Opening Assistance</Text>
                <Text className="m-0">
                  ✔ Operations Manual &#x28;on loan&#x29;
                </Text>
                <Text className="m-0">
                  ✔ Ongoing Marketing Support & R&D Inclusion
                </Text>
              </div>
            </div>

            <div className="mt-8">
              <Text className="text-xl font-bold">
                🍗 Want the complete package? We&#x2019;ve got you covered!
              </Text>

              <div className="ml-5">
                <Text className="m-0 text-base">For ₱403,000, you get:</Text>

                <Text className="m-0">✔ Franchise Fee + its inclusions</Text>

                <Text className="m-0">
                  ✔ Griller &#x28;your secret weapon for perfectly roasted
                  Lembest lechon!&#x29;
                </Text>

                <Text className="m-0">
                  ✔ Signage &#x28;so customers know exactly where to find
                  you!&#x29;
                </Text>

                <Text className="m-0">
                  ✔ Uniforms &#x28;look the part, sell the part!&#x29;
                </Text>
                <Text className="m-0">
                  ✔ Kitchen Utensils & Initial Stock worth ₱16,700
                </Text>
                <Text className="m-0">
                  ✔ Refundable ₱30,000 cash bond at the end of the contract
                </Text>
              </div>
            </div>

            <div className="mt-8">
              <Text className="text-xl font-bold">
                💰 Flexible Payment Plan? We got that too!
              </Text>

              <div className="ml-5">
                <Text className="m-0 text-base">
                  Start with just ₱303,000, and pay the remaining ₱100,000 in 4
                  easy monthly payments of ₱25,000.
                </Text>
              </div>
            </div>

            <div className="mt-10">
              <Text className="title">
                What&#x2019;s Next? Let&#x2019;s Talk! 🗣️
              </Text>

              <Text className="text-justify">
                We&#x2019;d love to connect with you and discuss how we can turn
                this into a reality. We can schedule a&#xa0;
                <strong className="strong">Zoom meeting</strong> or meet in
                person at our&#xa0;
                <strong className="strong">
                  Valenzuela office &#x28;open Monday-Thursday, 8:00 AM - 5:00
                  PM&#x29;
                </strong>
                .
              </Text>

              <Text className="text-justify">
                If you&#x2019;d like to move forward, simply click this button,
                and we&#x2019;ll give you a call as soon as possible to get
                started!
              </Text>

              <Button
                className="bg-red-500 text-white px-4 py-2 font-bold rounded-lg w-full text-center"
                href="https://react.email"
              >
                CALL ME
              </Button>

              <Text className="text-justify">
                Looking forward to hearing from you! 🚀
              </Text>
            </div>

            <div className="mt-10">
              <Text className="m-0">Best regards,</Text>
              <Text className="m-0">Lembest Marketing Team</Text>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FranchiseEmail;
