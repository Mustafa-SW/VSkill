import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import logo from "../assets/vskill-logo.png";

/* ---------- Layout ---------- */

const Container = styled.div`
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  min-height: 100vh;

  background: url("/src/assets/login_bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 2rem;
  color: #1a1a1a;
`;

/* ---------- Header ---------- */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem 2rem;
  max-width: 450px;
  margin: 0 auto;

  background: linear-gradient(90deg, #1a001a, #31094f);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
  margin-right: 1rem;
`;

const LogoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: 2px;
  font-family: 'calibri';
`;

const LogoSubtitle = styled.p`
  font-size: 1rem;
  color: #cdb3ff;
  margin: 0;
  font-style: italic;
`;

/* ---------- Content Section ---------- */

const ContentSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(235, 231, 225, 0.6),
    rgba(174, 83, 165, 0.15)
  );
  backdrop-filter: blur(25px);

  padding: 3rem;
  border-radius: 25px;
  margin-top: 3rem;

  max-width: 450px;
  margin-left: auto;
  margin-right: auto;

  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  text-align: center;
`;

/* ---------- Form ---------- */

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #4b0082;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  margin: 0.8rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #4b0082;
  }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #4b0082, #6C63FF);
  color: #fff;
  padding: 0.9rem;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  border: none;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 1rem;
`;

const LinkText = styled.p`
  margin-top: 1.2rem;

  span {
    color: #6C63FF;
    cursor: pointer;
    font-weight: 600;
  }
`;

/* ---------- Component ---------- */

function Register() {
  const { registerUser } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
  if (!name || !email || !password) {
    setError("All fields are required");
    return;
  }

  const result = registerUser({ name, email, password });

  if (!result.success) {
    setError(result.message);
    return;
  }

  navigate("/login");
};


  return (
    <Container>
      {/* Header */}
      <Header>
        <LogoContainer>
          <Logo src={logo} />
          <LogoTextContainer>
            <LogoTitle>VSkill</LogoTitle>
            <LogoSubtitle>Online Marketplace for Skills</LogoSubtitle>
          </LogoTextContainer>
        </LogoContainer>
      </Header>

      {/* Register Form */}
      <ContentSection>
        <Title>Create your VSkill account</Title>

        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleRegister}>Register</Button>

        {error && <ErrorText>{error}</ErrorText>}

        <LinkText>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </LinkText>
      </ContentSection>
    </Container>
  );
}

export default Register;