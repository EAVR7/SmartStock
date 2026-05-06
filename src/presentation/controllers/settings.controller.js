const userRepository = require("../../data/repositories/user.repository");

async function getSettings(req, res) {
  const user = await userRepository.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ settings: user.settings || {} });
}

async function updateSettings(req, res) {
  const settings = req.body || {};
  const user = await userRepository.updateSettings(req.user.id, settings);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ settings: user.settings || {} });
}

module.exports = {
  getSettings,
  updateSettings,
};
