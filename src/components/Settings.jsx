import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

/* ---------- Overlay ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

/* ---------- Modal ---------- */
const Modal = styled.div`
  width: 420px;
  max-width: 90%;
  background: linear-gradient(135deg, #ffffff, #f3f0ff);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 25px 60px rgba(0,0,0,0.3);
`;

/* ---------- Title ---------- */
const Title = styled.h2`
  text-align: center;
  color: #4b0082;
  margin-bottom: 1.5rem;
`;

/* ---------- Option Row ---------- */
const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.05);
  padding: 1rem;
  border-radius: 12px;
`;

/* ---------- Label ---------- */
const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

/* ---------- Toggle ---------- */
const Toggle = styled.input`
  width: 40px;
  height: 20px;
  cursor: pointer;
`;

/* ---------- Buttons ---------- */
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #4b0082, #6C63FF);
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: rgba(0,0,0,0.05);
`;

/* ---------- Component ---------- */
function Settings({ onClose }) {
  const { currentUser, updateUser } = useAppContext();

  // default = public
  const [isPublic, setIsPublic] = useState(
    currentUser?.isPublic ?? true
  );

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      isPublic,
    };

    updateUser(updatedUser);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Settings</Title>

        {/* Profile Visibility */}
        <OptionRow>
          <Label>Profile Visibility</Label>
          <Toggle
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </OptionRow>

        <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
          {isPublic ? "Public (Everyone can view your profile)" : "Private (Only you can view your profile)"}
        </p>

        {/* Buttons */}
        <ButtonRow>
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave}>
            Save
          </PrimaryButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}

export default Settings;