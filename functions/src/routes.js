const router = require("express").Router();

router.get("/b", (req, res) => {
  console.log("hello");
  res.status(200).json({
    data: "okey"
  });
});

module.exports = router;
