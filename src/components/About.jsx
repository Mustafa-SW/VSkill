import React from "react";
import styled from "styled-components";
import { FaUsers, FaCoins, FaLightbulb } from "react-icons/fa";

/* ---------- Container ---------- */
const Container = styled.div`
  margin-top: 3rem;
  padding: 3rem 2rem;
  border-radius: 25px;
  background: linear-gradient(135deg, #b54676, #31094f);
  color: white;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
`;

/* ---------- Title ---------- */
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

/* ---------- Subtitle ---------- */
const Subtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem auto;
  color: #d6c8ff;
  font-size: 1.2rem;
  line-height: 1.6;
`;

/* ---------- Grid ---------- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

/* ---------- Card ---------- */
const Card = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255,255,255,0.15);
  }
`;

/* ---------- Icon ---------- */
const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.8rem;
  color: #cdb3ff;
`;

/* ---------- Card Title ---------- */
const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

/* ---------- Card Text ---------- */
const CardText = styled.p`
  font-size: 1.1rem;
  color: #ddd;
`;

/* ---------- Footer ---------- */
const Footer = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #bbb;
`;

/* ---------- Component ---------- */
function About() {
  return (
    <Container>
      <Title>About VSkill</Title>

      <Subtitle>
        VSkill is a peer-to-peer learning platform where users can teach and learn skills using a coin-based system. 
        Share your knowledge, learn from others, and grow together in a collaborative ecosystem.
      </Subtitle>

      <Grid>
        <Card>
          <Icon><FaLightbulb /></Icon>
          <CardTitle>Learn Anything</CardTitle>
          <CardText>
            Explore skills taught by real people — from coding to creativity.
          </CardText>
        </Card>

        <Card>
          <Icon><FaUsers /></Icon>
          <CardTitle>Teach & Earn</CardTitle>
          <CardText>
            Share your knowledge and earn coins by helping others learn.
          </CardText>
        </Card>

        <Card>
          <Icon><FaCoins /></Icon>
          <CardTitle>Coin Economy</CardTitle>
          <CardText>
            Use coins to join courses and build a fair learning ecosystem.
          </CardText>
        </Card>
      </Grid>

      <Footer>
        © {new Date().getFullYear()} VSkill — Learn. Teach. Grow.
      </Footer>
    </Container>
  );
}

export default About;