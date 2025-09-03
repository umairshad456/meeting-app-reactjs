const express = require("express");
const router = express.Router();

router.post("/stream-webhook", async (req, res) => {
  try {
      const event = req.body;
      
      console.log("event received",event)

    if (event.type === "call.recording_ready") {
      const { call_cid, recording } = event;

      console.log("Recording ready for call:", call_cid);
      console.log("Recording URL:", recording.url); // This is your video file

      // TODO: Save this URL in your DB so participants can access later
    }

    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).send("Webhook failed");
  }
});

module.exports = router;
