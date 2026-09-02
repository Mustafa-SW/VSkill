import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { processTransaction } from "./CoinTransaction";

/* ---------- Overlay ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(4px);
  z-index: 500;
`;

/* ---------- Side Panel ---------- */
const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 380px;

  background: linear-gradient(135deg, #ffffff, #f3f0ff);
  box-shadow: -10px 0 30px rgba(0,0,0,0.2);

  padding: 1.5rem;

  display: flex;
  flex-direction: column;

  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

/* ---------- Header ---------- */
const Title = styled.h2`
  margin-bottom: 1rem;
  color: #4b0082;
`;

/* ---------- Tabs ---------- */
const Toggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.6rem;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  cursor: pointer;

  background: ${({ active }) =>
    active ? "linear-gradient(135deg, #4b0082, #6C63FF)" : "#eee"};

  color: ${({ active }) => (active ? "white" : "#333")};

  transition: all 0.2s ease;
`;

/* ---------- Request List ---------- */
const List = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(75, 0, 130, 0.3);
    border-radius: 10px;
  }
`;

/* ---------- Card ---------- */
const Card = styled.div`
  background: rgba(255,255,255,0.85);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
`;

/* ---------- Status ---------- */
const Status = styled.span`
  font-weight: 600;
  color: ${({ status }) =>
    status === "Approved" ? "green" :
    status === "Denied" ? "red" : "#ff9800"};
`;

/* ---------- Buttons ---------- */
const ActionButtons = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 8px;
`;

const Btn = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
`;

const ApproveBtn = styled(Btn)`
  background: #4CAF50;
  color: white;
`;

const DenyBtn = styled(Btn)`
  background: #f44336;
  color: white;
`;

/* ---------- Component ---------- */

function RequestSection({ onClose }) {
  const { currentUser } = useAppContext();
  const [tab, setTab] = useState("sent");
  const [requests, setRequests] = useState([]);

  const panelRef = useRef(null);

  /* Load requests */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vskill_requests")) || [];
    setRequests(data);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  /* Update status */
  const updateStatus = (id, status) => {
  const updated = requests.map(r => {
    if (r.id === id) {
      const updatedReq = { ...r, status };

      // 💰 Process coins ONLY on approval
      if (status === "Approved" && !r.transactionDone) {
        const success = processTransaction(updatedReq);

        if (success) {
          updatedReq.transactionDone = true;
        }
      }

      return updatedReq;
    }
    return r;
  });

  setRequests(updated);
  localStorage.setItem("vskill_requests", JSON.stringify(updated));
};

  /* Filter + sort */
  const filtered = requests
    .filter(r =>
      tab === "sent"
        ? r.senderId === currentUser.id
        : r.receiverId === currentUser.id
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Overlay>
      <Panel ref={panelRef}>
        <Title>Requests</Title>

        <Toggle>
          <Tab active={tab==="sent"} onClick={()=>setTab("sent")}>
            Sent
          </Tab>
          <Tab active={tab==="received"} onClick={()=>setTab("received")}>
            Received
          </Tab>
        </Toggle>

        <List>
          {filtered.length === 0 && <p>No requests yet</p>}

          {filtered.map(req => (
            <Card key={req.id}>
              <p><strong>Skill:</strong> {req.skillName}</p>

              {tab === "sent" ? (
                <p><strong>To:</strong> {req.receiverName}</p>
              ) : (
                <p><strong>From:</strong> {req.senderName}</p>
              )}

              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                {new Date(req.createdAt).toLocaleString()}
              </p>

              <p>Status: <Status status={req.status}>{req.status}</Status></p>

              {tab === "received" && req.status === "Pending" && (
                <ActionButtons>
                  <ApproveBtn onClick={() => updateStatus(req.id, "Approved")}>
                    Approve
                  </ApproveBtn>
                  <DenyBtn onClick={() => updateStatus(req.id, "Denied")}>
                    Deny
                  </DenyBtn>
                </ActionButtons>
              )}
            </Card>
          ))}
        </List>
      </Panel>
    </Overlay>
  );
}

export default RequestSection;