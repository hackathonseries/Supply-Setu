const DeliveryLog = require('../models/DeliveryLog');

exports.createInitialLog = async (req, res) => {
  try {
    const { surplusPostId } = req.body;

    const newLog = new DeliveryLog({
      surplusPost: surplusPostId,
      updates: [{ status: 'Booked', note: 'Booking confirmed by supplier' }]
    });

    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addDeliveryUpdate = async (req, res) => {
  try {
    const { surplusPostId } = req.params;
    const { status, note } = req.body;

    const log = await DeliveryLog.findOne({ surplusPost: surplusPostId });
    if (!log) return res.status(404).json({ error: "Delivery log not found" });

    log.updates.push({ status, note });
    await log.save();

    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeliveryLog = async (req, res) => {
  try {
    const { surplusPostId } = req.params;
    const log = await DeliveryLog.findOne({ surplusPost: surplusPostId }).populate('surplusPost');

    if (!log) return res.status(404).json({ error: "No delivery log found" });

    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};