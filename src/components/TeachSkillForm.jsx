import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

/* ---------- Overlay ---------- */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

/* ---------- Modal ---------- */
const Modal = styled.div`
  background: rgba(255,255,255,0.95);
  padding: 2rem;
  padding-right: 3rem;
  border-radius: 20px;
  width: 500px;

  max-height: 85vh; /* 🔥 important */
  overflow-y: auto; /* 🔥 enables scroll */
  overflow-x: hidden;

  box-shadow: 0 20px 50px rgba(0,0,0,0.3);

  /* Smooth scrollbar */
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(75, 0, 130, 0.4);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 10px 0;
  }
`;

/* ---------- Input ---------- */
const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.6rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
   &[type="time"] {
    padding: 0.5rem;
    height: 42px;
}
`;

/* ---------- Select ---------- */
const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin: 0.6rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

/* ---------- Buttons ---------- */
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const Primary = styled(Button)`
  background: #4b0082;
  color: white;
`;

const Secondary = styled(Button)`
  background: #ddd;
`;

/* ---------- Component ---------- */

function TeachSkillForm({ onClose }) {
  const { currentUser } = useAppContext();

  const [selectedSkillId, setSelectedSkillId] = useState(
  currentUser?.skills?.[0]?.id || ""
);
  const [mode, setMode] = useState("Online");
  const [duration, setDuration] = useState("");
  const [coins, setCoins] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const userSkills = currentUser?.skills || [];

  const handlePost = () => {
  if (!selectedSkillId || !duration || !coins || !startTime || !endTime) {
    alert("Please fill all fields");
    return;
  }

  if (description.length < 200 || description.length > 300) {
    alert("Description must be between 200 and 300 characters");
    return;
  }

  const selectedSkill = userSkills.find(
  (s) => s.id === selectedSkillId
);

if (!selectedSkill) {
  alert("Invalid skill selected");
  return;
}
    const newPost = {
      id: "post_" + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      skillId: selectedSkill.id,
      skillName: selectedSkill.name,
      skillImage: selectedSkill.image,
      mode,
      duration,
      coins,
      startTime,
      endTime,
      description,
      createdAt: new Date().toISOString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("vskill_posted_skills")) || [];

    existing.push(newPost);

    localStorage.setItem(
      "vskill_posted_skills",
      JSON.stringify(existing)
    );

    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h2>Teach Skill</h2>

        {/* Skill Dropdown */}
        <Select
          value={selectedSkillId}
          onChange={(e) => setSelectedSkillId(e.target.value)}
        >
          {userSkills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </Select>

        {/* Mode */}
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option>Online</option>
          <option>Offline</option>
        </Select>

        {/* Duration */}
        <Input
          placeholder="Course Duration (e.g. 2 weeks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        {/* Coins */}
        <Input
          placeholder="Coins Required"
          value={coins}
          onChange={(e) => setCoins(e.target.value)}
        />

        {/* Time Slots */}
       
        <div style={{ marginTop: "1rem" }}>
        <p style={{ fontWeight: "600", marginBottom: "6px" }}>  Time Slot </p>

        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
        <Input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={{ flex: 1 }}
      />

      <Input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={{ flex: 1 }}
      />
      </div>
</div>

{/* Description */}
<div style={{ marginTop: "1rem" }}>
  <p style={{ fontWeight: "600", marginBottom: "6px" }}>
    Description (200–300 characters)
  </p>

  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    maxLength={300}
    rows={4}
    style={{
      width: "100%",
      padding: "0.8rem",
      borderRadius: "10px",
      border: "1px solid #ccc",
      resize: "none",
      fontSize: "0.9rem"
    }}
    placeholder="Explain what you will teach, your approach, and what students will learn..."
  />

  {/* Character counter */}
  <p style={{ fontSize: "0.75rem", color: "#666", textAlign: "right" }}>
    {description.length}/300
  </p>
</div>
        {/* Buttons */}
        <ButtonGroup>
          <Primary onClick={handlePost}>Post</Primary>
          <Secondary onClick={onClose}>Cancel</Secondary>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}

export default TeachSkillForm;