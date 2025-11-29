import crypto from "crypto";

const generateOTP = (): string => {
  const buffer = crypto.randomBytes(3);
  const otp = buffer.readUIntBE(0, 3) % 1000000;
  return otp.toString().padStart(6, "0");
};

export default generateOTP;
