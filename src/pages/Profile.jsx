import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FaBook,
  FaGraduationCap,
  FaUsers,
  FaStar,
  FaCoins,
  FaAward,
} from "react-icons/fa";

/* ================= CONTAINER ================= */

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background: rgba(255,255,255,0.95);
`;

/* ================= HEADER ================= */

const Header = styled.div`
  background: linear-gradient(90deg, #1a001a, #31094f);
  backdrop-filter: blur(10px);

  border-radius: 25px;
  padding: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  color: white;

  box-shadow: 0 12px 35px rgba(0,0,0,0.35);
`;

const BackButton = styled.button`
  padding: 0.9rem 1.6rem;

  border: none;
  border-radius: 14px;

  background: rgba(255,255,255,0.15);

  color: white;

  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.4px;

  cursor: pointer;

  backdrop-filter: blur(10px);

  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.28);
    transform: translateY(-2px);
  }
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Avatar = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 50%;

  background: rgba(255,255,255,0.15);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.2rem;
  font-weight: 700;

  backdrop-filter: blur(10px);

  border: 2px solid rgba(255,255,255,0.2);
`;

const UserInfo = styled.div``;

const Name = styled.h2`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
`;

const Email = styled.p`
  margin-top: 0.5rem;
  color: #d6c6ff;
`;

const CoinBadge = styled.div`
  margin-top: 1rem;

  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  background: rgba(255,255,255,0.12);

  padding: 0.7rem 1.2rem;
  border-radius: 30px;

  font-weight: 600;
`;

const RightHeader = styled.div`
  text-align: right;
`;

const Level = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;

const ActiveText = styled.p`
  margin-top: 0.5rem;
  color: #d6c6ff;
`;

/* ================= STATS ================= */

const StatsGrid = styled.div`
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(231, 155, 93, 0.25) 0%,
    rgba(132, 83, 167, 0.15) 100%
  );

  backdrop-filter: blur(25px);

  border-radius: 22px;

  padding: 1.5rem;

  box-shadow: 0 12px 30px rgba(0,0,0,0.12);

  transition: all 0.3s ease;

  border: 1px solid rgba(255,255,255,0.2);

  &:hover {
    transform: translateY(-6px);
  }
`;

const StatTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconWrap = styled.div`
  width: 52px;
  height: 52px;

  border-radius: 15px;

  background: rgba(75,0,130,0.12);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #4b0082;

  font-size: 1.2rem;
`;

const StatValue = styled.h2`
  margin: 1rem 0 0.2rem;
  color: #1a001a;
`;

const StatLabel = styled.p`
  margin: 0;
  color: #555;
  font-weight: 500;
`;

/* ================= DASHBOARD ================= */

const Dashboard = styled.div`
  margin-top: 2rem;

  display: grid;
  grid-template-columns: 320px 1fr;

  gap: 2rem;

  @media(max-width: 950px){
    grid-template-columns: 1fr;
  }
`;

/* ================= SIDEBAR ================= */

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SideCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(231, 155, 93, 0.18) 0%,
    rgba(132, 83, 167, 0.12) 100%
  );

  backdrop-filter: blur(20px);

  border-radius: 22px;

  padding: 1.5rem;

  box-shadow: 0 10px 25px rgba(0,0,0,0.1);

  border: 1px solid rgba(255,255,255,0.2);
`;

const SideTitle = styled.h3`
  margin-top: 0;
  color: #4b0082;
`;

const AboutText = styled.p`
  color: #444;
  line-height: 1.7;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Badge = styled.div`
  padding: 0.6rem 1rem;

  border-radius: 25px;

  background: rgba(75,0,130,0.12);

  color: #4b0082;

  font-weight: 600;
  font-size: 0.9rem;
`;

/* ================= MAIN ================= */

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
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

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;

  color: #4b0082;
`;

/* ================= COURSE CARD ================= */

const CourseCard = styled.div`
  background: rgba(255,255,255,0.75);

  border-radius: 18px;

  padding: 1.2rem;

  margin-bottom: 1rem;

  box-shadow: 0 8px 20px rgba(0,0,0,0.08);

  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CourseTitle = styled.h4`
  margin: 0;
  color: #4b0082;
`;

const CourseDesc = styled.p`
  color: #555;
  margin-top: 0.6rem;
`;

/* ================= CERTIFICATIONS ================= */

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.2rem;
`;

const CertCard = styled.div`
  overflow: hidden;

  border-radius: 18px;

  background: rgba(255,255,255,0.85);

  box-shadow: 0 10px 25px rgba(0,0,0,0.1);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CertImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

const CertName = styled.p`
  padding: 1rem;
  margin: 0;

  text-align: center;

  font-weight: 600;
  color: #333;
`;

function Profile() {
  const { currentUser } = useAppContext();
  const { userId } = useParams();
  const navigate = useNavigate();

  const allUsers =
    JSON.parse(localStorage.getItem("vskill_users")) || [];

  const profileUser = userId
    ? allUsers.find((u) => u.id === userId)
    : currentUser;

  const [stats, setStats] = useState({
    coursesTaught: 0,
    skillsLearned: 0,
    students: 0,
    rating: 4.5,
    lastActive: "Today",
    badges: 2,
    certifications: 1,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!profileUser) return;

    const posted =
      JSON.parse(localStorage.getItem("vskill_posted_skills")) || [];

    const myCourses = posted.filter(
      (p) => p.userId === profileUser.id
    );

    setCourses(myCourses);

    const requests =
      JSON.parse(localStorage.getItem("vskill_requests")) || [];

    const learned = requests.filter(
      (r) =>
        r.senderId === profileUser.id &&
        r.status === "Approved"
    );

    const students = requests.filter(
      (r) =>
        r.receiverId === profileUser.id &&
        r.status === "Approved"
    );

    setStats((prev) => ({
      ...prev,
      coursesTaught: myCourses.length,
      skillsLearned: learned.length,
      students: students.length,
      certifications:
        profileUser.certifications?.length || 0,
    }));
 }, [profileUser?.id]);

  if (!profileUser) return <p>User not found</p>;

  return (
    <Container>

      {/* HEADER */}
      <Header>

        <LeftHeader>

  <Avatar>
    {profileUser?.name?.charAt(0)}
  </Avatar>

  <UserInfo>
    <Name>{profileUser?.name}</Name>

    <Email>
      {profileUser?.email || "No Email"}
    </Email>

    <CoinBadge>
      <FaCoins />
      {profileUser?.coins || 0} Coins
    </CoinBadge>
  </UserInfo>

</LeftHeader>

        <RightHeader>

  <Level>Skill Mentor</Level>

  <ActiveText>
    Last Active: Today
  </ActiveText>

  <BackButton onClick={() => navigate("/home")}>
    Go Back
  </BackButton>

</RightHeader>

      </Header>

      {/* STATS */}
      <StatsGrid>

        <StatCard>
          <StatTop>
            <IconWrap>
              <FaBook />
            </IconWrap>
          </StatTop>

          <StatValue>
            {stats.coursesTaught}
          </StatValue>

          <StatLabel>
            Courses Taught
          </StatLabel>
        </StatCard>

        <StatCard>
          <StatTop>
            <IconWrap>
              <FaGraduationCap />
            </IconWrap>
          </StatTop>

          <StatValue>
            {stats.skillsLearned}
          </StatValue>

          <StatLabel>
            Skills Learned
          </StatLabel>
        </StatCard>

        <StatCard>
          <StatTop>
            <IconWrap>
              <FaUsers />
            </IconWrap>
          </StatTop>

          <StatValue>
            {stats.students}
          </StatValue>

          <StatLabel>
            Students Taught
          </StatLabel>
        </StatCard>

        <StatCard>
          <StatTop>
            <IconWrap>
              <FaStar />
            </IconWrap>
          </StatTop>

          <StatValue>
            {stats.rating}
          </StatValue>

          <StatLabel>
            Rating
          </StatLabel>
        </StatCard>

      </StatsGrid>

      {/* DASHBOARD */}
      <Dashboard>

        {/* SIDEBAR */}
        <Sidebar>

          <SideCard>
            <SideTitle>
              About
            </SideTitle>

            <AboutText>
              Passionate mentor on VSkill helping
              learners gain practical knowledge and
              real-world skills through interactive
              learning experiences.
            </AboutText>
          </SideCard>

          <SideCard>

            <SideTitle>
              Achievements
            </SideTitle>

            <BadgeContainer>
              <Badge>
                <FaAward /> Top Mentor
              </Badge>

              <Badge>
                Fast Responder
              </Badge>

              <Badge>
                Skill Expert
              </Badge>
            </BadgeContainer>

          </SideCard>

        </Sidebar>

        {/* MAIN */}
        <MainContent>

          <Section>

            <SectionTitle>
              {userId
                ? "Courses by User"
                : "Your Courses"}
            </SectionTitle>

            {courses.length === 0 ? (
              <p>No courses created yet</p>
            ) : (
              courses.map((course) => (
                <CourseCard key={course.id}>

                  <CourseTitle>
                    {course.skillName}
                  </CourseTitle>

                  <CourseDesc>
                    {course.description}
                  </CourseDesc>

                </CourseCard>
              ))
            )}

          </Section>

          <Section>

            <SectionTitle>
              Certifications
            </SectionTitle>

            {!profileUser.certifications ||
            profileUser.certifications.length === 0 ? (
              <p>No certifications added</p>
            ) : (
              <CertGrid>

                {profileUser.certifications.map((cert) => (
                  <CertCard key={cert.id}>

                    <CertImage
                      src={cert.image}
                      alt={cert.name}
                    />

                    <CertName>
                      {cert.name}
                    </CertName>

                  </CertCard>
                ))}

              </CertGrid>
            )}

          </Section>

        </MainContent>

      </Dashboard>

    </Container>
  );
}

export default Profile;