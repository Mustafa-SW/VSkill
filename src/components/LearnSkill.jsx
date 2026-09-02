import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

/* ---------- Overlay ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 400;
`;

/* ---------- Modal ---------- */
const Modal = styled.div`
  width: 550px;
  max-width: 90%;
  background: linear-gradient(135deg, #ffffff, #f3f0ff);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 25px 60px rgba(0,0,0,0.3);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const TopSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

/* ---------- Close Button ---------- */
const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

/* ---------- Image ---------- */
const SkillImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  flex-shrink: 0;
`;

const Details = styled.div`
  flex: 1;
`;


const Description = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
  background: rgba(0,0,0,0.03);
  padding: 12px;
  border-radius: 10px;
`;

/* ---------- Title ---------- */
const Title = styled.h2`
  color: #4b0082;
  margin-bottom: 0.5rem;
`;

/* ---------- Info ---------- */
const Info = styled.p`
  margin: 0.4rem 0;
  font-size: 1rem;
  color: #333;
`;

/* ---------- Divider ---------- */
const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.1);
  margin: 1.2rem 0;
`;

/* ---------- Buttons ---------- */
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between; /* 🔥 key change */
  align-items: center;
  margin-top: 1.5rem;
`;

const LeftButtons = styled.div``;

const RightButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;

const ViewProfileButton = styled(Button)`
  background: linear-gradient(135deg, #4b0082, #6C63FF);
  color: white;
`;

const JoinButton = styled(Button)`
  background: linear-gradient(135deg, #4b0082, #6C63FF);
  color: white;
`;

const ChatButton = styled(Button)`
  background: linear-gradient(135deg, #4b0082, #6C63FF);
  color: white;
`;

/* ---------- Component ---------- */
function LearnSkill({ skill, onClose }) {

  const [showChat, setShowChat] = React.useState(false);
  const [showPrivateMessage, setShowPrivateMessage] = React.useState(false);

  if (!skill) return null;
  const navigate = useNavigate();

  const handleViewProfile = () => {
  navigate(`/profile/${skill.userId}`);
};

  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}>
          <FaTimes />
        </CloseBtn>

        <TopSection>
        <SkillImage src={skill.skillImage} alt={skill.skillName} />

        <Details>
          <Title>{skill.skillName}</Title>

          <Info><strong>Teacher:</strong> {skill.userName}</Info>
          <Info><strong>Mode:</strong> {skill.mode}</Info>
          <Info><strong>Duration:</strong> {skill.duration}</Info>
          <Info><strong>Coins:</strong> {skill.coins} 🪙</Info>

          <Divider />

          <Info>
            <strong>Time Slot:</strong> {skill.startTime} - {skill.endTime}
          </Info>
        </Details>
      </TopSection>

      {/* Description BELOW */}
      <Description>
        <strong>Description:</strong><br />
        {skill.description}
      </Description>

        <ButtonGroup>

          {/* LEFT SIDE */}
          <LeftButtons>
            <ViewProfileButton onClick={handleViewProfile}>
              View Profile
            </ViewProfileButton>
          </LeftButtons>

          {/* RIGHT SIDE */}
          <RightButtons>
            <JoinButton onClick={() => {
              const currentUser = JSON.parse(localStorage.getItem("vskill_current_user"));

              if ((currentUser.coins || 0) < skill.coins) {
                alert("❌ Not enough coins");
                return;
              }

              const newRequest = {
                id: "req_" + Date.now(),
                skillId: skill.skillId,
                skillName: skill.skillName,
                senderId: currentUser.id,
                senderName: currentUser.name,
                receiverId: skill.userId,
                receiverName: skill.userName,
                coins: skill.coins,
                status: "Pending",
                transactionDone: false,
                createdAt: new Date().toISOString()
              };

              const existing = JSON.parse(localStorage.getItem("vskill_requests")) || [];
              existing.push(newRequest);

              localStorage.setItem("vskill_requests", JSON.stringify(existing));

              alert("Request Sent ✅");
            }}>
              Join
            </JoinButton>

            <ChatButton
  onClick={() => {

    const currentUser =
      JSON.parse(
        localStorage.getItem("vskill_current_user")
      );

    const allUsers =
      JSON.parse(
        localStorage.getItem("vskill_users")
      ) || [];

    const teacher = allUsers.find(
      (u) =>
        String(u.id) ===
        String(skill.userId)
    );

    /* ===== CHECK EXISTING CHAT CONTACT ===== */

    /* ===== CHECK EXISTING CHAT CONTACT ===== */

const savedContacts =
  JSON.parse(
    localStorage.getItem(
      "vskill_chat_contacts"
    )
  ) || [];

/* ===== CHECK APPROVED REQUESTS ===== */

const requests =
  JSON.parse(
    localStorage.getItem("vskill_requests")
  ) || [];

const approvedConnection =
  requests.some(
    (req) =>

      req.status === "Approved"

      &&

      (

        (
          String(req.senderId) ===
            String(currentUser.id)

          &&

          String(req.receiverId) ===
            String(skill.userId)
        )

        ||

        (
          String(req.receiverId) ===
            String(currentUser.id)

          &&

          String(req.senderId) ===
            String(skill.userId)
        )

      )
  );

/* ===== CHECK SAVED CHAT CONTACT ===== */

const savedConnection =
  savedContacts.some(
    (contact) =>

      String(contact.currentUserId) ===
        String(currentUser.id)

      &&

      String(contact.id) ===
        String(skill.userId)
  );

/* ===== FINAL CONNECTION CHECK ===== */

const alreadyConnected =
  approvedConnection || savedConnection;

    /* ===== PRIVATE PROFILE ===== */

    if (
      teacher &&
      teacher.isPublic === false &&
      !alreadyConnected
    ) {

      setShowPrivateMessage(true);
      return;

    }

    /* ===== OPEN CHAT ===== */

    setShowChat(true);

  }}
>

  Chat
</ChatButton>
          </RightButtons>

        </ButtonGroup>
      </Modal>
      {showChat && (
      <Chat
        onClose={() => setShowChat(false)}
        initialUser={{
        id: skill.userId,
        name: skill.userName,
        status: "Teacher",
    }}
    
  />
)}

{/* ===== PRIVATE PROFILE MESSAGE ===== */}

{showPrivateMessage && (

  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 5000,
    }}
  >

    <div
      style={{
        width: "360px",
        background:
          "linear-gradient(135deg,#ffffff,#f3f0ff)",
        borderRadius: "18px",
        padding: "2rem",
        textAlign: "center",
        boxShadow:
          "0 20px 50px rgba(0,0,0,0.35)",
      }}
    >

      <h3
        style={{
          color: "#4b0082",
          marginBottom: "1rem",
        }}
      >
        Chat Unavailable
      </h3>

      <p
        style={{
          color: "#444",
          lineHeight: "1.5",
          marginBottom: "1.5rem",
        }}
      >
        User profile is inaccessible for chat.
      </p>

      <button
        onClick={() =>
          setShowPrivateMessage(false)
        }
        style={{
          border: "none",
          padding: "0.8rem 1.4rem",
          borderRadius: "10px",
          background:
            "linear-gradient(135deg,#4b0082,#6C63FF)",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Close
      </button>

    </div>

  </div>

)}
    </Overlay>
  );
}

export default LearnSkill;