import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

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
  background: linear-gradient(135deg, #ffffff, #f8f6ff);
  border-radius: 22px;
  padding: 2.2rem;
  padding-right: 4rem;
  box-shadow: 0 30px 70px rgba(0,0,0,0.35);
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

/* ---------- Title ---------- */
const Title = styled.h2`
  text-align: center;
  color: #4b0082;
  margin-bottom: 1.5rem;
`;

/* ---------- Input ---------- */
const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  margin: 0.6rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #4b0082;
    outline: none;
  }
`;

/* ---------- Buttons ---------- */
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1.5rem;
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
function ChangePassword({ onClose }) {
  const { currentUser, updateUser } = useAppContext();

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = () => {
  if (!currentPass || !newPass || !confirmPass) {
    alert("Please fill all fields");
    return;
  }

  if (currentPass !== currentUser.password) {
    alert("❌ Current password is incorrect");
    return;
  }

  if (newPass.length < 4) {
    alert("Password must be at least 4 characters");
    return;
  }

  if (newPass !== confirmPass) {
    alert("❌ New passwords do not match");
    return;
  }

  const updatedUser = {
    ...currentUser,
    password: newPass,
  };

  updateUser(updatedUser);

  // 🔥 Force logout
  localStorage.removeItem("vskill_current_user");
  alert("✅ Password updated.");
  navigate("/login"); 
};

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Change Password</Title>

        <Input
          type="password"
          placeholder="Current Password"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
        />

        <Input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <ButtonRow>
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleChangePassword}>
            Update
          </PrimaryButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}

export default ChangePassword;