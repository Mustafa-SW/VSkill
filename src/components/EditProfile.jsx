import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;
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
  z-index: 200;
`;

/* ---------- Modal ---------- */
const Modal = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.95),
    rgba(240,240,255,0.85)
  );

  padding: 2.5rem;
  padding-right: 2.8rem;
  border-radius: 20px;
  width: 520px;
  max-height: 85vh;

  overflow-y: auto;
  overflow-x: hidden; /* prevents weird horizontal spill */

  box-shadow: 0 20px 50px rgba(0,0,0,0.3);

  /* ✅ keeps scrollbar inside rounded edges */
  scrollbar-gutter: stable;
  
  /* ✅ clip scrollbar within border radius */
  overflow: overlay;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    margin: 10px 0; /* 👈 keeps it away from top/bottom edges */
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(75, 0, 130, 0.4);
    border-radius: 10px;
  }
`;

/* ---------- Title ------c---- */
const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #4b0082;
  text-align: center;
`;

/* ---------- Input ---------- */
const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  margin: 0.6rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 0.95rem;

  &:focus {
    border-color: #4b0082;
    outline: none;
  }
`;

/* ---------- Section ---------- */
const Section = styled.div`
  margin-top: 1.5rem;
`;

/* ---------- Skill Card ---------- */
const SkillItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 🔥 important */
  background: rgba(255,255,255,0.8);
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  margin-top: 0.5rem;
`;

const CertificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 🔥 important */
  background: rgba(255,255,255,0.8);
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  margin-top: 0.5rem;
`;

const SkillInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CertificationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RemoveButton = styled.button`
  background: rgba(255, 0, 0, 0.08);
  border: none;
  color: #e63946;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

const SkillImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
`;

const CertificationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
`;

/* ---------- Buttons ---------- */
const Button = styled.button`
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(90deg, #4b0082, #6C63FF);
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: rgba(0,0,0,0.05);
  color: #333;
  border: 1px solid rgba(0,0,0,0.1);

  &:hover {
    background: rgba(0,0,0,0.1);
  }
`;

const AddSkillButton = styled(Button)`
  background: transparent;
  border: 1px dashed #4b0082;
  color: #4b0082;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: rgba(75,0,130,0.1);
  }
`;

const AddCertificationButton = styled(Button)`
  background: transparent;
  border: 1px dashed #4b0082;
  color: #4b0082;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: rgba(75,0,130,0.1);
  }
`;

function EditProfile({ onClose }) {
  const { currentUser, updateUser } = useAppContext();
  
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [skills, setSkills] = useState(currentUser?.skills || []);
  const [certifications, setCertifications] = useState(currentUser?.certifications || []);


  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState(null);

   const[showCertificationForm, setShowCertificationForm] = useState(false);
  const [certificationName, setCertificationName] = useState("");
  const [certificationImage, setCertificationImage] = useState(null);

  /* ---------- IMAGE ---------- */
  const handleSkillImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSkillImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ---------- SAVE SKILL INTO TEMP STATE ---------- */
  const handleSaveSkill = () => {
  if (!skillName || !skillImage) {
    alert("Please enter skill name and upload image");
    return;
  }

  const newSkill = {
    id: "skill_" + Date.now(),
    name: skillName,
    image: skillImage,
  };

  const updatedSkills = [...skills, newSkill];

  setSkills(updatedSkills);

  // ✅ update localStorage instantly
  const updatedUser = {
    ...currentUser,
    skills: updatedSkills,
  };

  updateUser(updatedUser);

  // ✅ reset + close form
  setSkillName("");
  setSkillImage(null);
  setShowSkillForm(false);
};

const handleRemoveSkill = (skillId) => {
  const confirmDelete = window.confirm("Are you sure you want to remove this skill?");

  if (!confirmDelete) return;

  const updatedSkills = skills.filter((skill) => skill.id !== skillId);

  setSkills(updatedSkills);

  // ✅ update localStorage via context
  const updatedUser = {
    ...currentUser,
    skills: updatedSkills,
  };

  updateUser(updatedUser);
};

/*-------- Certifications Section -----*/
const handleCertificationImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCertificationImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

const handleSaveCertification = () => {
  if (!certificationName || !certificationImage) {
    alert("Please enter certification name and upload image");
    return;
  }

  const newCertification = {
    id: "certification_" + Date.now(),
    name: certificationName,
    image: certificationImage,
  };

  const updatedCertifications = [...certifications, newCertification];

  setCertifications(updatedCertifications);

  // ✅ update localStorage instantly
  const updatedUser = {
    ...currentUser,
    certifications : updatedCertifications,
  };

  updateUser(updatedUser);

  // ✅ reset + close form
  setCertificationName("");
  setCertificationImage(null);
  setShowCertificationForm(false);
};

const handleRemoveCertification = (certificationId) => {
  const confirmDelete = window.confirm("Are you sure you want to remove this certification?");

  if (!confirmDelete) return;

  const updatedCertifications = certifications.filter((certification) => certification.id !== certificationId);

  setCertifications(updatedCertifications);

  // ✅ update localStorage via context
  const updatedUser = {
    ...currentUser,
    certifications: updatedCertifications,
  };

  updateUser(updatedUser);
};
  /* ---------- SAVE PROFILE ---------- */
  const handleSave = () => {
    const updatedUser = {
  ...currentUser,
  name,
  email,
  skills,
  certifications, 
};

    updateUser(updatedUser);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Title>Edit Profile</Title>

        {/* Basic Info */}
        <Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        {/* Skills Section */}
        <Section>
          <h3 style={{ color: "#4b0082" }}>Skills</h3>

          {/* Existing Skills */}
          {skills.map((skill) => (
          <SkillItem key={skill.id}>
          <SkillInfo>
          <SkillImg src={skill.image} alt={skill.name} />
         <span>{skill.name}</span>
        </SkillInfo>

        <RemoveButton onClick={() => handleRemoveSkill(skill.id)}>
        <FaTrash />
        </RemoveButton>
       </SkillItem>
       ))}

          {/* Add Skill Button */}
          {!showSkillForm && (
            <AddSkillButton onClick={() => setShowSkillForm(true)}>
              + Add Skill
            </AddSkillButton>
          )}

          {/* Skill Form */}
          {showSkillForm && (
            <div style={{ marginTop: "1rem" }}>
              <Input
                placeholder="Skill Name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />

              <Input type="file" accept="image/png, image/jpeg" onChange={handleSkillImageUpload} />

              <div style={{ display: "flex", gap: "10px" }}>
                <PrimaryButton onClick={handleSaveSkill}>Save</PrimaryButton>
                <SecondaryButton onClick={() => {
                  setShowSkillForm(false);
                  setSkillName("");
                  setSkillImage(null);
                  }}>
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          )}
</Section>

{/* Certifications Section */}
<Section>
          <h3 style={{ color: "#4b0082" }}>Certifications</h3>

          {/* Existing Certifications */}
          {certifications.map((certification) => (
          <CertificationItem key={certification.id}>
          <CertificationInfo>
          <CertificationImg src={certification.image} alt={certification.name} />
         <span>{certification.name}</span>
        </CertificationInfo>

        <RemoveButton onClick={() => handleRemoveCertification(certification.id)}>
        <FaTrash />
        </RemoveButton>
       </CertificationItem>
       ))}

          {/* Add Certification Button */}
          {!showCertificationForm && (
            <AddCertificationButton onClick={() => setShowCertificationForm(true)}>
              + Add Certification
            </AddCertificationButton>
          )}

          {/* Certification Form */}
          {showCertificationForm && (
            <div style={{ marginTop: "1rem" }}>
              <Input
                placeholder="Certification Name"
                value={certificationName}
                onChange={(e) => setCertificationName(e.target.value)}
              />

              <Input type="file" accept="image/png, image/jpeg" onChange={handleCertificationImageUpload} />

              <div style={{ display: "flex", gap: "10px" }}>
                <PrimaryButton onClick={handleSaveCertification}>Save</PrimaryButton>
                <SecondaryButton onClick={() => {
                  setShowCertificationForm(false);
                  setCertificationName("");
                  setCertificationImage(null);
                  }}>
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          )}
</Section>



        {/* Footer Buttons */}
        <div style={{ 
         display: "flex", 
        justifyContent: "flex-end", 
        gap: "10px", 
        marginTop: "2rem" 
        }}>
          <PrimaryButton onClick={handleSave}>Save Profile</PrimaryButton>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </div>
      </Modal>
    </Overlay>
  );
}

export default EditProfile;