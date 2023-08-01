const Kaksh = require("../models/kakshModel");
const Errorhandler = require("../utils/errorhandler.js");
const catchAsyncError = require("../middleWare/catchAsyncError.js");
const sendEmail = require("../utils/Email");
const sheetAdd = require("../utils/sheetsAdd");
const cloudinery = require("cloudinary");

exports.createKaksh = catchAsyncError(async (req, res, next) => {
  const { name, email, place, phone, audioFile, file } = req.body;

  console.log(name, email, place, phone);

  if (!name || !email) {
    next(new Errorhandler("Data not found", 403));
  }
  let kaksh = {};
  const subject = "Email from Kaksh";
  const html = `<h3>Email from ${email}</h3>
                  <h4>Name : ${name}</h4>
                  `;

  if (file) {
    console.log("okey");
    const myCloud = await cloudinery.v2.uploader.upload(audioFile, {
      resource_type: "auto",
      folder: "kakshaudio",
    });

    const myCloudfile = await cloudinery.v2.uploader.upload(file, {
      resource_type: "auto",
      folder: "kakshfile",
    });

    kaksh = await Kaksh.create({
      name,
      email,
      phone,
      place,
      fileUrl: myCloudfile.secure_url,
      audioUrl: myCloud.secure_url,
    });
    try {
      await sendEmail({ subject, html });
      sheetAdd({ name, email, phone, place, fileUrl: myCloudfile.secure_url,  audioUrl: myCloud.secure_url});
      
    } catch (error) {
      console.log(error);
      next(new Errorhandler(error.massage, 500));
    }
  } else {
    kaksh = await Kaksh.create({ name, email, phone, place });
    try {
      await sendEmail({ subject, html });
      sheetAdd({ name, email, phone, place });
    } catch (error) {
      console.log(error);
      next(new Errorhandler(error.massage, 500));
    }
  }

  res.status(201).json({
    success: true,
    message: "Data Submit successfully",
    kaksh,
  });
});
