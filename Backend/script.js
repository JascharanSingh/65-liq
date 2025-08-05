import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const email = "admin@example.com";
    const plainPassword = "securepassword";

    await Admin.deleteMany({ email }); 

    const admin = new Admin({ email, password: plainPassword }); 
    await admin.save();

    console.log(`✅ Admin created:
📧 Email: ${email}
🔑 Password: ${plainPassword}`);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  } finally {
    process.exit();
  }
};

createAdmin();