// backend/src/routes/api.ts

import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";
import vendorController from "../controllers/vendor.controller";
import reportDocumentController from "../controllers/reportDocument.Controller";
import adminController from "../controllers/admin.controller";

const router = express.Router();

// AUTH
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);

// VENDOR
router.post(
  "/vendor",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  vendorController.create
);
router.get("/vendor", vendorController.findAll);
router.get("/vendor/:id", vendorController.findOne);
router.put(
  "/vendor/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  vendorController.update
);
router.delete(
  "/vendor/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  vendorController.remove
);

// ADMIN USER
router.get(
  "/admin/users",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  adminController.getAllUsers
);
router.delete(
  "/admin/users/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  adminController.removeUser
);
router.get(
  "/admin/users/pending",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  adminController.getUserPending
);
router.put(
  "/admin/users/:id/assign-role",
  [authMiddleware, aclMiddleware([ROLES.ADMINISTRATOR])],
  adminController.assignRole
);

// REPORT DOCUMENTS
router.post(
  "/report-documents",
  [authMiddleware, aclMiddleware([ROLES.VENDOR])],
  reportDocumentController.create
);
router.get(
  "/report-documents",
  authMiddleware,
  reportDocumentController.findAll
);
router.get(
  "/report-documents/:id",
  authMiddleware,
  reportDocumentController.findOne
);
router.put(
  "/report-documents/:id",
  [authMiddleware, aclMiddleware([ROLES.VENDOR])],
  reportDocumentController.update
);
router.delete(
  "/report-documents/:id",
  [authMiddleware, aclMiddleware([ROLES.VENDOR, ROLES.ADMINISTRATOR])],
  reportDocumentController.remove
);

// APPROVE - HANYA PIC GUDANG & DIREKSI
router.put(
  "/report-documents/:id/approve",
  [
    authMiddleware,
    aclMiddleware([ROLES.PICGUDANG, ROLES.DIREKSIPEKERJAAN]),
  ],
  reportDocumentController.approve
);

export default router;