import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  verificationLink?: string;
  verificationCode?: string;
  appName?: string;
  supportEmail?: string;
}

export const VerificationEmail = ({
  verificationLink,
  verificationCode,
  appName,
  supportEmail,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://res.cloudinary.com/ddzz4trls/image/upload/v1737747092/logo_dqsbfm.png"
            width="100"
            height="100"
            alt="Logo"
            style={logo}
          />
          <Section>
            <Text style={heading}>Hey, Welcome!</Text>
            <Text style={text}>
              Thanks for registering an account with {appName}. We are excited
              to have you on board. We are committed to providing you with the
              best experience possible.
            </Text>
            <Text style={text}>
              Before we get started, we&apos;ll need to verify your email.
            </Text>
            <Text style={bold}>Here is your verification code:</Text>
            <Section style={codeContainer}>
              <Text style={code}> {verificationCode}</Text>
            </Section>
            <Text style={bold}>Please copy it and click the button below.</Text>
            <Button style={button} href={verificationLink}>
              Verify email address
            </Button>
            <Text style={text}>
              If the button above doesn&apos;t work, paste this link into your
              browser:
              <Link style={anchor} href={verificationLink}>
                {verificationLink}
              </Link>
            </Text>
            <Text style={footer}>
              If you didn&apos;t register an account with {appName} or if
              something is wrong, feel free to contact our support team at{" "}
              {supportEmail} We&apos;re here to help!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

VerificationEmail.PreviewProps = {
  verificationCode: "144833",
  verificationLink:
    "https://example.com/auth/email-verification/a3f8b58a-7d3a-49b2-ba3b-0d5211bba0ad",
  appName: "VeriSafe",
  supportEmail: "support@verisafe.com",
} as VerificationEmailProps;

export default VerificationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const button = {
  backgroundColor: "#181f31",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "280px",
  padding: "14px 0",
  margin: "20px auto 14px",
  verticalAlign: "middle",
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#6e4fee",
  display: "inline-block",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
};

const anchor = {
  textDecoration: "underline",
};

const logo = {
  margin: "0 auto",
  backgroundColor: "#282a35",
  borderRadius: "40px",
  boxShadow: "2px 2px 21px #6e4fee",
};

const heading = {
  fontSize: "23px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "600",
  color: "#404040",
  lineHeight: "26px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const bold = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const footer = {
  ...text,
  color: "#ababab",
  marginTop: "14px",
  marginBottom: "16px",
};
