import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {FaTimes,FaArrowLeft,} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

/* ================= Overlay ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(6px);
  z-index: 1000;
`;

/* ================= Drawer ================= */

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #4e1632, #31094f);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  box-shadow: -10px 0 40px rgba(0,0,0,0.45);
  overflow: hidden;
`;

/* ================= Header ================= */

const Header = styled.div`
  min-height: 72px;
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: rgba(255,255,255,0.06);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(255,255,255,0.12);
    transform: scale(1.04);
  }
`;

/* ================= Search ================= */

const SearchWrapper = styled.div`
  padding: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem;
  border: none;
  outline: none;
  border-radius: 16px;
  background: rgba(255,255,255,0.05);
  color: white;
  font-size: 0.95rem;
  box-sizing: border-box;
  transition: 0.2s;
  &::placeholder {
    color: rgba(255,255,255,0.45);
  }
  &:focus {
    background: rgba(255,255,255,0.08);
    box-shadow: 0 0 0 3px rgba(108,99,255,0.25);
  }
`;

/* ================= User List ================= */

const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: rgba(108,99,255,0.18);
    transform: translateY(-2px);
  }
`;

const Avatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #6c467e,
    #2c062a
  );

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.97rem;
`;

const UserStatus = styled.div`
  color: rgba(255,255,255,0.5);
  font-size: 0.82rem;
  margin-top: 3px;
`;

/* ================= Chat Area ================= */

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/* ================= Messages ================= */

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.mine ? "flex-end" : "flex-start"};
`;

const MessageBubble = styled.div`
  max-width: 78%;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  background: ${(props) =>
    props.mine
      ? "linear-gradient(135deg,#6C63FF,#8f44fd)"
      : "rgba(255,255,255,0.08)"};
  color: white;
  font-size: 0.93rem;
  line-height: 1.4;
  word-break: break-word;
  box-shadow: ${(props) =>
    props.mine
      ? "0 8px 20px rgba(108,99,255,0.28)"
      : "none"};
`;

/* ================= Bottom ================= */

const BottomBar = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  color: white;
  font-size: 0.95rem;
  &::placeholder {
    color: rgba(255,255,255,0.45);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(108,99,255,0.2);
  }
`;

const SendButton = styled.button`
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    #6a1da0,
    #241e22
  );

  color: white;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:
    0 8px 20px rgba(0,0,0,0.35),
    inset 0 1px 1px rgba(255,255,255,0.06);
  transition: all 0.22s ease;
  &:hover {
    transform: translateY(-2px) scale(1.04);
    background: linear-gradient(
      135deg,
      #1c1c27,
      #2e2e44
    );
  }
  &:active {
    transform: scale(0.96);
  }
`;


function Chat({ onClose, initialUser = null }) {

  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const {currentUser} = useAppContext();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= LOAD CHATS ================= */

  const [messages, setMessages] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("vskill_chats")
      ) || {}
    );
  });

  /* ================= SAVE CHATS ================= */

  useEffect(() => {
    localStorage.setItem(
      "vskill_chats",
      JSON.stringify(messages)
    );
  }, [messages]);

  /* ================= REFRESH CHATS ================= */

useEffect(() => {

  const storedChats =
    JSON.parse(
      localStorage.getItem("vskill_chats")
    ) || {};

  setMessages(storedChats);

}, [currentUser]);

  /* ================= LOAD CONNECTED USERS ================= */

  useEffect(() => {

  if (!currentUser) return;

  const allRequests =
    JSON.parse(
      localStorage.getItem("vskill_requests")
    ) || [];

  const approvedRequests =
    allRequests.filter(
      (req) => req.status === "Approved"
    );

  const connectedUsers = [];

  approvedRequests.forEach((req) => {

    if (req.senderId === currentUser.id) {

      connectedUsers.push({
        id: req.receiverId,
        name: req.receiverName,
        skill: req.skillName,
        status: "Connected",
      });

    }

    if (req.receiverId === currentUser.id) {

      connectedUsers.push({
        id: req.senderId,
        name: req.senderName,
        skill: req.skillName,
        status: "Connected",
      });

    }

  });

  /* ===== LOAD SAVED CHAT CONTACTS ===== */

  const savedContacts =
    JSON.parse(
      localStorage.getItem("vskill_chat_contacts")
    ) || [];

  const myContacts = savedContacts.filter(
    (contact) =>
      String(contact.currentUserId) ===
      String(currentUser.id)
  );

  const allUsers = [
    ...connectedUsers,
    ...myContacts,
  ];

  /* ===== REMOVE DUPLICATES ===== */

  const uniqueUsers =
    allUsers.filter(
      (user, index, self) =>
        index ===
        self.findIndex(
          (u) => String(u.id) === String(user.id)
        )
    );

  setUsers(uniqueUsers);

}, [currentUser]);

  const filteredUsers = users.filter((user) =>
  user.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  /* ================= CONVERSATION KEY ================= */

  const getConversationKey = (user1, user2) => {

  if (!user1 || !user2) return "";

  return [String(user1), String(user2)]
    .sort()
    .join("_");

};

  /* ================= SEND MESSAGE ================= */

  const handleSend = () => {

    if (
      !message.trim() ||
      !selectedUser
    ) return;

    const conversationKey =
      getConversationKey(
        currentUser.id,
        selectedUser.id
      );

    const newMessage = {
      id: Date.now(),
      text: message,
      senderId: String(currentUser.id),
      createdAt: new Date().toISOString(),
    };

    /* ===== SAVE CHAT CONTACT ===== */

/* ===== SAVE CHAT CONTACTS FOR BOTH USERS ===== */

const existingContacts =
  JSON.parse(
    localStorage.getItem("vskill_chat_contacts")
  ) || [];

/* ===== USER -> TEACHER ===== */

const senderAlreadyExists =
  existingContacts.some(
    (u) =>
      String(u.currentUserId) ===
        String(currentUser.id) &&
      String(u.id) ===
        String(selectedUser.id)
  );

if (!senderAlreadyExists) {

  existingContacts.push({
    currentUserId: currentUser.id,
    id: selectedUser.id,
    name: selectedUser.name,
    status: selectedUser.status || "Connected",
  });

}

/* ===== TEACHER -> USER ===== */

const receiverAlreadyExists =
  existingContacts.some(
    (u) =>
      String(u.currentUserId) ===
        String(selectedUser.id) &&
      String(u.id) ===
        String(currentUser.id)
  );

if (!receiverAlreadyExists) {

  existingContacts.push({
    currentUserId: selectedUser.id,
    id: currentUser.id,
    name: currentUser.name,
    status: "Connected",
  });

}

localStorage.setItem(
  "vskill_chat_contacts",
  JSON.stringify(existingContacts)
);

    setMessages((prev) => ({

      ...prev,

      [conversationKey]: [

        ...(prev[conversationKey] || []),

        newMessage,

      ],

    }));

    setMessage("");

  };

  return (
    <>
      <Overlay onClick={onClose} />
      <Drawer>

        {/* ================= USER LIST SCREEN ================= */}

        {!selectedUser ? (
          <>
            <Header>
              <HeaderTitle>Messages</HeaderTitle>

              <IconButton onClick={onClose}>
                <FaTimes />
              </IconButton>
            </Header>

            <SearchWrapper>
              <SearchInput
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            />
            </SearchWrapper>

            <UserList>
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  onClick={() =>
                  setSelectedUser(user)
                 }
                >
                  <Avatar>
                    {user.name.charAt(0)}
                  </Avatar>

                  <UserInfo>
                    <UserName>
                      {user.name}
                    </UserName>

                    <UserStatus>
                      {user.status}
                    </UserStatus>
                  </UserInfo>
                </UserCard>
              ))}
            </UserList>
          </>
        ) : (

          /* ================= CHAT SCREEN ================= */

          <ChatArea>

            <Header>
              <HeaderLeft>

                <IconButton
                  onClick={() =>
                    setSelectedUser(null)
                  }
                >
                  <FaArrowLeft />
                </IconButton>

                <Avatar
                  style={{
                    width: "42px",
                    height: "42px",
                    fontSize: "0.9rem",
                  }}
                >
                  {selectedUser.name.charAt(0)}
                </Avatar>

                <div>
                  <HeaderTitle>
                    {selectedUser.name}
                  </HeaderTitle>

                  <UserStatus>
                    {selectedUser.status}
                  </UserStatus>
                </div>

              </HeaderLeft>

              <IconButton onClick={onClose}>
                <FaTimes />
              </IconButton>
            </Header>

            <MessagesContainer>
  {(
    messages[
      getConversationKey(
        currentUser?.id,
        selectedUser?.id
      )
    ] || []
  ).length === 0 ? (

    <div
      style={{
        margin: "auto",
        color: "rgba(255,255,255,0.45)",
        textAlign: "center",
        fontSize: "0.95rem",
      }}
    >
      Start your conversation ✨
    </div>

  ) : (

    (
      messages[
        getConversationKey(
          currentUser?.id,
          selectedUser?.id
        )
      ] || []
    ).map((msg) => (

      <MessageRow
        key={msg.id}
        mine={
          String(msg.senderId) === String(currentUser?.id)
        }
      >
        <MessageBubble
          mine={
            String(msg.senderId) === String(currentUser?.id)
          }
        >
          {msg.text}
        </MessageBubble>
      </MessageRow>

    ))
  )}
</MessagesContainer>

            <BottomBar>
              <MessageInput
                placeholder={`Message ${selectedUser.name}...`}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />

              <SendButton onClick={handleSend}>
                <IoSend />
              </SendButton>
            </BottomBar>

          </ChatArea>
        )}
      </Drawer>
    </>
  );
}

export default Chat;