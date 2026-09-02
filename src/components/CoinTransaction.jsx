export const processTransaction = (request) => {
  const users = JSON.parse(localStorage.getItem("vskill_users")) || [];

  const senderIndex = users.findIndex(u => u.id === request.senderId);
  const receiverIndex = users.findIndex(u => u.id === request.receiverId);

  if (senderIndex === -1 || receiverIndex === -1) return;

  const sender = users[senderIndex];
  const receiver = users[receiverIndex];

  const coins = Number(request.coins || 0);

  // Prevent duplicate transaction
  if (request.status === "Approved" && request.transactionDone) return;

  // Deduct from learner
  sender.coins = (sender.coins || 0) - coins;

  // Add to teacher
  receiver.coins = (receiver.coins || 0) + coins;

  // Update users
  users[senderIndex] = sender;
  users[receiverIndex] = receiver;

  localStorage.setItem("vskill_users", JSON.stringify(users));

  // Update current logged user if needed
  const current = JSON.parse(localStorage.getItem("vskill_current_user"));
  if (current?.id === sender.id || current?.id === receiver.id) {
    const updatedUser = users.find(u => u.id === current.id);
    localStorage.setItem("vskill_current_user", JSON.stringify(updatedUser));
  }

    // ================= SAVE TRANSACTION =================

  const transactions =
    JSON.parse(localStorage.getItem("vskill_transactions")) || [];

  transactions.push({
    id: "txn_" + Date.now(),

    skillId: request.skillId,
    skillName: request.skillName,

    senderId: sender.id,
    senderName: sender.name,

    receiverId: receiver.id,
    receiverName: receiver.name,

    coins,

    status: "Completed",

    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(
    "vskill_transactions",
    JSON.stringify(transactions)
  );

  return true;
};