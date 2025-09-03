const express = require("express");
const router = express.Router();
const axios = require("axios")
const path = require('path')
const fs = require('fs')

router.post("/stream-webhook", async (req, res) => {
  try {
    const event = req.body;

    //event received {
    //   type: 'call.recording_ready',
    //   created_at: '2025-09-03T10:34:56.942000768Z',
    //   call_cid: 'default:8788d613-b4a8-45e6-a75e-49d588014b30',
    //   call_recording: {
    //     filename: 'rec_default_8788d613-b4a8-45e6-a75e-49d588014b30_720p_1756895664781.mp4',
    //     url: 'https://ohio.stream-io-cdn.com/1419784/video/recordings/default_8788d613-b4a8-45e6-a75e-49d588014b30/rec_default_8788d613-b4a8-45e6-a75e-49d588014b30_720p_1756895664781.mp4?Expires=1758105296&Signature=UK5Zl~12ZFTPMOtvmApOF23pLNzt7bfPXFvXDpDtI6DLsq5tALgAQoXR3WCQMldisPd09tBnRmxJ0URhFgyS9-3anwpdCLphhHsfsnR4kLvppXWJf1zUeEoIykEZxUxDT3YeMNsEVwhDHSCaHBrsbPjxRDlUwXXbp1lkiupd5BP62uXoF2usgUbIgUBWNkfmnhi2MfVtyEkE45RX0z6Sz6guZLH3Cg0~rs34iXLPTYyIuTp7VymRWoMzGkgQ6tyVok4SRKRhzJ0TpxzeoSBgMJGL4YEaftRKmKPUnaOwTA-AlWOUIA54RLelgxF7WKUxiK-bJCHbxA~rjGkit9ij7Q__&Key-Pair-Id=APKAIHG36VEWPDULE23Q',
    //     start_time: '2025-09-03T10:34:29.731275836Z',
    //     end_time: '2025-09-03T10:34:50.552835483Z',
    //     session_id: 'fc50b701-969e-4281-b141-cbfd92709fef'
    //   },
    //   egress_id: ''
    // }

    console.log("event received", event)

    if (event.type === "call.recording_ready") {
      const { url, filename, start_time, end_time } = event.call_recording;

      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // File path to save
      const filePath = path.join(uploadDir, filename);

      // Download and save file
      const response = await axios.get(url, { responseType: "stream" });
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      console.log("File saved:", filePath);




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


router.get("/url", async (req, res) => {
  try {
    const { url, filename } = req.body;

    console.log("req.body", req.body)

    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }


    // File path to save
    const filePath = path.join(uploadDir, filename);

    // Download and save file
    const response = await axios.get(url, { responseType: "stream" });
    console.log("response i got", response)
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("File saved:", filePath);


  } catch (error) {
    console.error("error in get url:", error);
    return res.status(500).json({ message: "Failed to get" })
  }
})

module.exports = router;
