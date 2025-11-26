// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import * as Yup from "yup";

import UserModel from "../models/user.model";
import VendorModel from "../models/vendor.model"; // Import Vendor Model
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import response from "../utils/response";
import { IReqUser } from "../utils/interfaces";
import { ROLES, STATUSVENDOR } from "../utils/constant";

type TRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;        // Tambahan: Role
  companyName?: string; // Tambahan: Nama Perusahaan (Khusus Vendor)
};

type TLogin = {
  identifier: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  fullname: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters long")
    .test(
      "at-least-one-uppercase-letter",
      "Password must contain at least one uppercase letter",
      (value) => {
        if (!value) return false;
        const regex = /(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test(
      "at-least-one-number",
      "Password must contain at least one number",
      (value) => {
        if (!value) return false;
        const regex = /(?=.*\d)/;
        return regex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password does not match"),
  role: Yup.string().optional(), // Validasi Role (Opsional karena default di Model ada)
  companyName: Yup.string().when('role', {
    is: (val: string) => val === ROLES.VENDOR,
    then: (schema) => schema.required("Company Name is required for Vendor"),
    otherwise: (schema) => schema.optional()
  })
});

export default {
  async register(req: Request, res: Response) {
    // 1. Ambil data tambahan role dan companyName
    const { fullname, username, email, password, confirmPassword, role, companyName } =
      req.body as TRegister;

    try {
      // 2. Validasi Input
      await registerValidateSchema.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
        role,
        companyName
      });

      // Cek apakah username/email sudah ada (Mencegah duplikat)
      const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return response.error(res, null, "Email or Username already exists");
      }

      // 3. Siapkan Payload User Dasar
      const userPayload: any = {
        fullname,
        username,
        email,
        password,
      };

      // 4. Logika Penanganan Role
      // Jika role dikirim dari frontend, gunakan itu. Jika tidak, biarkan default model (PENDINGAPPROVAL).
      if (role) {
        // Pastikan role yang dikirim valid sesuai Enum ROLES
        const validRoles = Object.values(ROLES);
        if (validRoles.includes(role as any)) {
          userPayload.role = role;
        }
      }

      // 5. Logika Khusus VENDOR
      // Jika User mendaftar sebagai Vendor, kita harus buat data Vendor-nya juga
      if (role === ROLES.VENDOR && companyName) {
        // Buat Data Vendor Baru
        const newVendor = await VendorModel.create({
          companyName: companyName,
          companyAddress: "Alamat belum diisi (Update Profil)", // Default address
          picName: fullname, // PIC disamakan dengan nama pendaftar
          status: STATUSVENDOR.ACTIVE // Atau INACTIVE jika butuh approval admin dulu
        });

        // Link-kan ID Vendor ke User
        userPayload.vendorId = newVendor._id;
      }

      // 6. Simpan User ke Database
      const result = await UserModel.create(userPayload);

      response.success(res, result, "Success register user");
    } catch (error) {
      const err = error as Error;
      response.error(res, err, "failed register user");
    }
  },

  async login(req: Request, res: Response) {
    /**
     * #swagger.requestBody = {
     * required: true,
     * schema: {$ref: "#/components/schemas/LoginRequest"}
     * }
     */
    const { identifier, password } = req.body as TLogin;

    try {
      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      }).populate('vendorId'); // Populate data vendor jika ada (Opsional, berguna untuk frontend)

      if (!userByIdentifier)
        return response.unauthorized(res, "User not found");

      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword)
        return response.unauthorized(res, "User not found");

      // Generate Token
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
        // Kita bisa masukkan ID vendor ke token juga jika perlu
        vendorId: userByIdentifier.vendorId ? (userByIdentifier.vendorId as any)._id : undefined
      });

      // Kembalikan Data Lengkap ke Frontend (Token + Info User)
      const responseData = {
        token,
        user: {
          id: userByIdentifier._id,
          fullname: userByIdentifier.fullname,
          email: userByIdentifier.email,
          role: userByIdentifier.role,
          // Kirim nama perusahaan jika dia vendor (untuk frontend dashboard)
          companyName: userByIdentifier.vendorId ? (userByIdentifier.vendorId as any).companyName : undefined
        }
      };

      response.success(res, responseData, "Success login user");
    } catch (error) {
      const err = error as Error;
      response.error(res, err, "failed login user");
    }
  },

  async me(req: IReqUser, res: Response) {
    /**
     * #swagger.secuirty = [{
     * "bearerAuth": []
     * }]
     */
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id).populate('vendorId');

      response.success(res, result, "Success get user profile");
    } catch (error) {
      const err = error as Error;
      response.error(res, err, "failed get user profile");
    }
  },
};