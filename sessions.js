// sessions.js

const sessions = {}; // { [chatId]: { type, userId } }

/**
 * Foydalanuvchi admin bilan bog'lanishni so‘radi
 */
function startSessionBetweenUserAndAdmin(userId, adminId) {
  sessions[userId] = { type: 'user_to_admin' };
  sessions[adminId] = { type: 'admin_to_user', userId: userId };
}

/**
 * Sessiyani tozalash
 */
function stopSession(chatId) {
  const session = sessions[chatId];
  if (session && session.userId) {
    delete sessions[session.userId]; // boshqa tomon
  }
  delete sessions[chatId]; // o‘zini
}

/**
 * Sessiyani olish
 */
function getSession(chatId) {
  return sessions[chatId];
}

module.exports = {
  startSessionBetweenUserAndAdmin,
  stopSession,
  getSession,
};
