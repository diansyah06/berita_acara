// backend/src/controllers/admin.controller.ts

import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import VendorModel from "../models/vendor.model";
import response from "../utils/response";
import { ROLES } from "../utils/constant";

const assignRoleSchema = Yup.object({
  role: Yup.string()
    .required()
    .oneOf([
      ROLES.ADMINISTRATOR,
      ROLES.VENDOR,
      ROLES.DIREKSIPEKERJAAN,
      ROLES.PICGUDANG,
    ]),
  vendorId: Yup.string().when("role", {
    is: (val: string) => val === ROLES.VENDOR,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.nullable(),
  }),
});

export default {
  async getAllUsers(req: IReqUser, res: Response) {
    try {
      const result = await UserModel.find()
        .sort({ createdAt: -1 })
        .populate("vendorId");

      response.success(res, result, "Success get all users");
    } catch (error) {
      response.error(res, error, "failed get all users");
    }
  },

  async getUserPending(req: IReqUser, res: Response) {
    try {
      const result = await UserModel.find({
        role: ROLES.PENDINGAPPROVAL,
      });
      response.success(res, result, "Success get user pending approval");
    } catch (error) {
      response.error(res, error, "failed get user pending approval");
    }
  },

  async assignRole(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const { role, vendorId } = req.body;

      await assignRoleSchema.validate(req.body);

      if (role === ROLES.VENDOR) {
        const vendorExist = await VendorModel.findById(vendorId);
        if (!vendorExist) {
          return response.error(res, null, "Vendor data not found");
        }
      }

      const updatePayload = {
        role: role,
        vendorId: role === ROLES.VENDOR ? vendorId : null,
        isActive: true,
      };

      const result = await UserModel.findByIdAndUpdate(id, updatePayload, {
        new: true,
      });

      if (!result) {
        return response.error(res, null, "User not found");
      }

      response.success(res, result, "Success assign role user");
    } catch (error) {
      response.error(res, error, "failed assign role user");
    }
  },

  async removeUser(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const userToDelete = await UserModel.findById(id);
      if (!userToDelete) {
        return response.error(res, null, "User tidak ditemukan");
      }

      // PROTEKSI: Jangan hapus diri sendiri
      if (userToDelete._id.toString() === req.user?.id?.toString()) {
        return response.error(
          res,
          null,
          "Anda sedang login. Tidak bisa menghapus akun sendiri!"
        );
      }

      // PROTEKSI SUPER ADMIN
      const PROTECTED_EMAILS = ["admin@kantor.com", "admin@system.com"];
      if (PROTECTED_EMAILS.includes(userToDelete.email)) {
        return response.error(
          res,
          null,
          "AKSES DITOLAK: Akun Super Administrator ini dilindungi!"
        );
      }

      await UserModel.findByIdAndDelete(id);

      if (userToDelete.role === ROLES.VENDOR && userToDelete.vendorId) {
        await VendorModel.findByIdAndDelete(userToDelete.vendorId);
      }

      response.success(res, null, "Berhasil menghapus user");
    } catch (error) {
      response.error(res, error, "Gagal menghapus user");
    }
  },
};