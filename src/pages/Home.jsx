import React, { useState } from "react";
import styled from "styled-components";
import EditProfile from "../components/EditProfile";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import TeachSkillForm from "../components/TeachSkillForm";
import LearnSkill from "../components/LearnSkill";
import RequestSection from "../components/RequestSection";
import About from "../components/About";
import ChangePassword from "../components/ChangePassword";
import Settings from "../components/Settings";


import { useRef, useEffect } from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import logo from "../assets/vskill-logo.png"; // vskill logo
import { FaChalkboardTeacher, FaComments } from "react-icons/fa";
import Chat from "../components/Chat";

const SkillImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;


const Container = styled.div`
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.95); /* almost solid white */
  padding: 2rem;
  color: #1a1a1a; /* dark text for visibility */
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #1a001a, #31094fff);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  position: sticky;
  top: 1rem;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 90px;
  margin-right: 1rem;
`;

const LogoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #ffffffff; 
  margin: 0;
  letter-spacing: 2px;
  font-family: 'calibri'; 
`;


const LogoSubtitle = styled.p`
  font-size: 1.2rem;
  color: #cdb3ff;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.5px;
  font-style: italic;
`;

const IconButton = styled.button`
  background: rgba(255,255,255,0.15);
  border: none;
  padding: 0.6rem;
  border-radius: 50%;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255,255,255,0.35);
    transform: scale(1.2);
  }
`;

// Frosted White Content Section
const ContentSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(231, 155, 93, 0.25) 0%,   /* slightly transparent white */
    rgba(132, 83, 167, 0.15) 100%
  );
  backdrop-filter: blur(25px);      /* frosted glass effect */
  -webkit-backdrop-filter: blur(25px); /* Safari support */
  color: #1a1a1a;                   /* Dark text */
  padding: 3rem 2rem;
  border-radius: 25px;
  margin-top: 2rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2); /* subtle border for depth */
  transition: all 0.3s ease;
`;


const SearchBarContainer = styled.div`
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  /* remove space-between */
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 800px;
  padding: 1.5rem 1.8rem;
  border-radius: 50px;
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 1.25rem;
  background: rgba(255,255,255,0.85);
  color: #1a1a1a;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  &::placeholder {
    color: #888;
    font-style: italic;
  }
  &:focus {
    border-color: #4b0082;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const TeachButton = styled.button`
  position: relative;
  padding: 1rem 1.8rem;
  border-radius: 14px;
  border: none;
  transform: translateX(-60px); /* 👈 shift left */
  background: linear-gradient(135deg, #280640, #6f0f92);
  color: white;

  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  transition: all 0.3s ease;

  box-shadow: 0 8px 20px rgba(75, 0, 130, 0.35);

  overflow: hidden;

  /* subtle glass overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* glow effect */
  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: linear-gradient(135deg, #6C63FF, #9f7bff);
    z-index: -1;
    opacity: 0;
    filter: blur(12px);
    transition: opacity 0.3s ease;
  }

  svg {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(-60px) translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(75, 0, 130, 0.5);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover svg {
    transform: rotate(-10deg) scale(1.1);
  }

  &:active {
    transform: translateX(-60px) scale(0.96);
    box-shadow: 0 6px 15px rgba(75, 0, 130, 0.3);
  }
`;

const ChatButton = styled.button`
  position: relative;
  padding: 1rem 1.6rem;
  border-radius: 14px;
  border: none;

  transform: translateX(-50px);

  background: linear-gradient(135deg, #14001f, #4b0082);
  color: white;

  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  transition: all 0.3s ease;

  box-shadow: 0 8px 20px rgba(75, 0, 130, 0.35);

  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: linear-gradient(135deg, #6C63FF, #9f7bff);
    z-index: -1;
    opacity: 0;
    filter: blur(12px);
    transition: opacity 0.3s ease;
  }

  svg {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(-50px) translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(75, 0, 130, 0.5);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  &:active {
    transform: translateX(-50px) scale(0.96);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 220px));
  gap: 2rem;
  justify-content: center; /* 🔥 keeps cards centered */
`;

const SkillCard = styled.div`
  background: rgba(255,255,255,0.85); /* white-ish card */
  padding: 1.8rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 35px rgba(0,0,0,0.25);
  }
`;

const SkillName = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #4b0082; /* Purple */
  margin: 0.3rem 0;
  font-family: 'Montserrat', sans-serif;
`;

const TeacherName = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0.3rem 0;
  font-weight: 400;
`;

const SkillCoins = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 600;
  color: #171614ff;
  font-size: 1rem;
`;

const UserMenuContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;

  width: 250px;
  padding: 1.5rem;

  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(20px);

  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);

  z-index: 100;
`;

const UserInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Username = styled.h3`
  margin: 0;
  color: #4b0082;
`;

const Coins = styled.p`
  margin: 0.3rem 0 0;
  font-weight: 600;
`;

const MenuItem = styled.div`
  padding: 0.7rem 0;
  cursor: pointer;
  font-weight: 500;
  color: #333;

  &:hover {
    color: #6C63FF;
    transform: translateX(5px);
  }
`;

function Home() {
 const { getPostedSkills } = useAppContext();
 const allSkills = getPostedSkills() || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [showTeachForm, setShowTeachForm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showRequests, setShowRequests] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const filteredSkills = allSkills.filter(
  (skill) =>
    skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.userName.toLowerCase().includes(searchTerm.toLowerCase())
);
  const [showUserMenu, setShowUserMenu] = useState(false);
const userMenuRef = useRef(null);

const [showEditProfile, setShowEditProfile] = useState(false);

// Close on outside click
useEffect(() => {
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);  

const UserMenu = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAppContext();

  const user = JSON.parse(localStorage.getItem("vskill_current_user"));

  const handleLogout = () => {
    logoutUser();                // clear context
    localStorage.removeItem("vskill_current_user"); // clear storage
    navigate("/login", { replace: true });  // redirect
  };

  return (
    <UserMenuContainer>
      <UserInfo>
        <Username>{user?.name || "User"}</Username>
        <Coins>{user?.coins || 0} 🪙</Coins>
      </UserInfo>

      <MenuItem onClick={() => {
  setShowUserMenu(false);

  const user = JSON.parse(localStorage.getItem("vskill_current_user"));

  if (user?.id) {
    navigate(`/profile/${user.id}`);
  }
}}>
  View Profile
</MenuItem>

      <MenuItem onClick={() => {
          setShowUserMenu(false);
          setShowEditProfile(true);
          }}>
       Edit Profile
      </MenuItem>
      
      <MenuItem onClick={() => {
  setShowUserMenu(false);
  setShowChangePassword(true);
}}>
  Change Password
</MenuItem>

<MenuItem
  onClick={() => {
    setShowUserMenu(false);
    navigate("/account-details");
  }}
>
  Account Details
</MenuItem>

 
      <MenuItem onClick={() => {
  setShowUserMenu(false);
  setShowSettings(true);
}}>
  Settings
</MenuItem>

      <MenuItem style={{ color: "red" }} onClick={handleLogout}>
        Logout
      </MenuItem>
    </UserMenuContainer>
  );
};

  return (
    <Container>
      {/* Header */}
      <Header>
        <div style={{ position: "relative" }} ref={userMenuRef}>
  <IconButton onClick={() => setShowUserMenu(!showUserMenu)}>
    <FaUserCircle />
  </IconButton>

  {showUserMenu && <UserMenu />}
</div>

        <LogoContainer>
          <Logo src={logo} alt="VSkill Logo" />
          <LogoTextContainer>
            <LogoTitle>VSkill</LogoTitle>
            <LogoSubtitle>Online Marketplace for Skills</LogoSubtitle>
          </LogoTextContainer>
        </LogoContainer>

        <IconButton onClick={() => setShowRequests(true)}>
        <FaEnvelope />
        </IconButton>
      </Header>

      {/* Frosted Content Section */}
      <ContentSection>
        {/* Search Bar */}
        <SearchBarContainer>
 
  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
  <SearchInput
    type="text"
    placeholder="Search skills..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
  <TeachButton onClick={() => setShowTeachForm(true)}>
    <FaChalkboardTeacher />
    Teach Skills
  </TeachButton>

  <ChatButton onClick={() => setShowChat(true)}>
    <FaComments />
    Chat
  </ChatButton>
</div>

</SearchBarContainer>

        {/* Skills Grid */}
        <SkillsGrid>
  {filteredSkills.length === 0 ? (
    <p style={{ textAlign: "center", color: "#666", gridColumn: "1/-1" }}>
      No skills available yet
    </p>
  ) : (
    filteredSkills.map((skill) => (
      <SkillCard key={skill.id} onClick={() => setSelectedSkill(skill)}>
        <SkillImage src={skill.skillImage} alt={skill.skillName} />
        <SkillName>{skill.skillName}</SkillName>
        <TeacherName>Teacher: {skill.userName}</TeacherName>
        <SkillCoins>{skill.coins} 🪙</SkillCoins>
      </SkillCard>
    ))
  )}
</SkillsGrid>
      </ContentSection>
      
      {/* Teach Skill Modal */}
      {showTeachForm && (
      <TeachSkillForm onClose={() => setShowTeachForm(false)} />
      )}

      {showEditProfile && (
      <EditProfile onClose={() => setShowEditProfile(false)} />
      )}

      {selectedSkill && (
  <LearnSkill
    skill={selectedSkill}
    onClose={() => setSelectedSkill(null)}
  />
)}

  {showRequests && (
  <RequestSection onClose={() => setShowRequests(false)} />
)}
      
  {showChangePassword && (
  <ChangePassword onClose={() => setShowChangePassword(false)} />
)}

{showSettings && (
  <Settings onClose={() => setShowSettings(false)} />
)}

{showChat && (
  <Chat onClose={() => setShowChat(false)} />
)}

    <About />
    </Container>
  );
}

export default Home;
