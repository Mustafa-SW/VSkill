import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: rgba(255,255,255,0.95);
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.div`
  background: linear-gradient(90deg, #1a001a, #31094f);

  border-radius: 25px;

  padding: 2rem;

  color: white;

  box-shadow: 0 12px 30px rgba(0,0,0,0.3);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  width: 45px;
  height: 45px;

  border: none;
  border-radius: 50%;

  background: rgba(255,255,255,0.15);

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-size: 1rem;

  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.08);
  }
`;

const Name = styled.h1`
  margin: 0;
`;

const Email = styled.p`
  color: #d6c6ff;
`;

const Coins = styled.h3`
  margin-top: 1rem;
`;

const Section = styled.div`
  margin-top: 2rem;

  background: linear-gradient(
    135deg,
    rgba(231, 155, 93, 0.18) 0%,
    rgba(132, 83, 167, 0.12) 100%
  );

  backdrop-filter: blur(20px);

  border-radius: 22px;

  padding: 1.8rem;

  box-shadow: 0 10px 25px rgba(0,0,0,0.1);

  border: 1px solid rgba(255,255,255,0.2);
`;

const SectionTitle = styled.h2`
  color: #4b0082;
`;

const TransactionCard = styled.div`
  background: rgba(255,255,255,0.75);

  padding: 1rem 1.5rem;

  border-radius: 16px;

  margin-bottom: 1rem;

  box-shadow: 0 8px 20px rgba(0,0,0,0.08);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const SkillCard = styled.div`
  display: flex;
  gap: 1rem;

  background: rgba(255,255,255,0.8);

  border-radius: 18px;

  padding: 1rem;

  margin-bottom: 1rem;

  box-shadow: 0 8px 20px rgba(0,0,0,0.08);

  align-items: center;
`;

const SkillImage = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillTitle = styled.h3`
  margin: 0;
  color: #4b0082;
`;

const RemoveButton = styled.button`
  padding: 0.8rem 1rem;

  border: none;

  border-radius: 12px;

  background: #ff4d4d;

  color: white;

  cursor: pointer;

  font-weight: 600;

  &:hover {
    background: #e60000;
  }
`;

function AccountDetails() {

  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  const [postedSkills, setPostedSkills] = useState([]);

  useEffect(() => {

    const allTransactions =
      JSON.parse(localStorage.getItem("vskill_transactions")) || [];

    const myTransactions = allTransactions.filter(
      (txn) =>
        txn.senderId === currentUser.id ||
        txn.receiverId === currentUser.id
    );

    setTransactions(myTransactions);

    const allPosted =
      JSON.parse(localStorage.getItem("vskill_posted_skills")) || [];

    const mine = allPosted.filter(
      (skill) => skill.userId === currentUser.id
    );

    setPostedSkills(mine);

  }, [currentUser]);

  const removeSkill = (id) => {

    const allSkills =
      JSON.parse(localStorage.getItem("vskill_posted_skills")) || [];

    const updated = allSkills.filter(
      (skill) => skill.id !== id
    );

    localStorage.setItem(
      "vskill_posted_skills",
      JSON.stringify(updated)
    );

    setPostedSkills((prev) =>
      prev.filter((skill) => skill.id !== id)
    );
  };

  return (
    <Container>

      {/* HEADER */}
      
<Header>

  <HeaderTop>

    <BackButton onClick={() => navigate("/home")}>
      <FaArrowLeft />
    </BackButton>

    <div>
      <Name>
        {currentUser?.name}
      </Name>

      <Email>
        {currentUser?.email}
      </Email>
    </div>

  </HeaderTop>

  <Coins>
    {currentUser?.coins || 0} 🪙
  </Coins>

</Header>
      {/* TRANSACTION HISTORY */}
      <Section>

        <SectionTitle>
          Transaction History
        </SectionTitle>

        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.map((txn) => (

            <TransactionCard key={txn.id}>

  <div>
    <h3 style={{ margin: 0, color: "#4b0082" }}>
      {txn.skillName}
    </h3>

    <p style={{ margin: "5px 0 0", color: "#666" }}>
      {new Date(txn.createdAt).toLocaleString()}
    </p>
  </div>

  <p style={{ fontWeight: "600", margin: 0 }}>
    {txn.senderId === currentUser.id
      ? `Paid to ${txn.receiverName}`
      : `Received from ${txn.senderName}`}
  </p>

  <p style={{ margin: 0 }}>
    Status: <strong>{txn.status}</strong>
  </p>

  <p
    style={{
      margin: 0,
      fontWeight: "700",
      color: "#4b0082",
      fontSize: "1.05rem"
    }}
  >
    {txn.coins} 🪙
  </p>

</TransactionCard>
          ))
        )}

      </Section>

      {/* POSTED SKILLS */}
      <Section>

        <SectionTitle>
          Posted Skills
        </SectionTitle>

        {postedSkills.length === 0 ? (
          <p>No skills posted yet</p>
        ) : (
          postedSkills.map((skill) => (

            <SkillCard key={skill.id}>

              <SkillImage
                src={skill.skillImage}
                alt={skill.skillName}
              />

              <SkillInfo>

                <SkillTitle>
                  {skill.skillName}
                </SkillTitle>

                <p>
                  {skill.description}
                </p>

                <p>
                  {skill.mode} • {skill.duration}
                </p>

                <p>
                  {skill.coins} 🪙
                </p>

                <p>
                  {skill.startTime} - {skill.endTime}
                </p>

              </SkillInfo>

              <RemoveButton
                onClick={() => removeSkill(skill.id)}
              >
                Remove
              </RemoveButton>

            </SkillCard>

          ))
        )}

      </Section>

    </Container>
  );
}

export default AccountDetails;