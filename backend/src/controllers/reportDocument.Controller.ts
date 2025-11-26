// backend/src/controllers/reportDocument.Controller.ts

import { Response } from "express";
import response from "../utils/response";
import UserModel from "../models/user.model";
import {
  ReportDocumentModel,
  ReportDocumentDAO,
} from "../models/reportDocument.model";
import VendorModel from "../models/vendor.model";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import {
  ROLES,
  STATUSREPORTDOCUMENT,
  TYPEEREPORTDOCUMENT,
} from "../utils/constant";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await ReportDocumentDAO.validate(req.body);

      const user = await UserModel.findById(req.user?.id);

      if (!user?.vendorId) {
        return response.unauthorized(res, "unauthorized");
      }

      const vendorData = await VendorModel.findById(user.vendorId);

      if (!vendorData) {
        return response.error(res, null, "Vendor Data not found");
      }

      const payload = {
        ...req.body,
        vendorSnapshot: {
          vendorRefId: vendorData._id,
          companyName: vendorData.companyName,
          picName: vendorData.picName,
        },
        createdBy: user.id,
        status: STATUSREPORTDOCUMENT.PENDING,
      };

      const result = await ReportDocumentModel.create(payload);
      response.success(res, result, "Success create a report document");
    } catch (error) {
      response.error(res, error, "failed create a report document");
    }
  },
  
  async findAll(req: IReqUser, res: Response) {
    const {
      page = 1,
      limit = 10,
      search,
      type,
      status,
    } = req.query as unknown as IPaginationQuery & {
      type?: string;
      status?: string;
    };

    try {
      const user = req.user;
      let query: any = {};

      if (user?.role === ROLES.VENDOR) {
        query.createdBy = user.id;
      } else if (user?.role === ROLES.PICGUDANG) {
        query.type = TYPEEREPORTDOCUMENT.BAPB;
      } else if (user?.role === ROLES.DIREKSIPEKERJAAN) {
        query.type = TYPEEREPORTDOCUMENT.BAPP;
      }

      if (search) {
        query.$or = [
          {
            contractNumber: { $regex: search, $options: "i" },
          },
          {
            "vendorSnapshot.companyName": { $regex: search, $options: "i" },
          },
        ];
      }

      if (type) {
        query.type = type;
      }

      if (status) {
        query.status = status;
      }

      const result = await ReportDocumentModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("createdBy", "fullname email")
        .exec();

      const count = await ReportDocumentModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          totalPages: Math.ceil(count / limit),
          current: page,
        },
        "Success find all report document"
      );
    } catch (error) {
      response.error(res, error, "failed find all report document");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await ReportDocumentModel.findById(id)
        .populate("createdBy", "fullname email")
        .populate("approvalInfo.approvedBy", "fullname email");

      if (!result) {
        return response.error(res, null, "Report Document not found");
      }

      if (
        req.user?.role === ROLES.VENDOR &&
        result.createdBy._id.toString() !== req.user.id?.toString()
      ) {
        return response.unauthorized(res, "unauthorized");
      }

      response.success(res, result, "Success find one report document");
    } catch (error) {
      response.error(res, error, "failed find one report document");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user;

      const doc = await ReportDocumentModel.findById(id);

      if (!doc) {
        return response.error(res, null, "Report Document not found");
      }

      if (doc.createdBy.toString() !== user?.id?.toString()) {
        return response.unauthorized(res, "unauthorized");
      }

      if (doc.status !== STATUSREPORTDOCUMENT.PENDING) {
        return response.error(res, null, "Report Document already approved");
      }

      delete req.body.status;
      delete req.body.vendorSnapshot;
      delete req.body.approvalInfo;

      const result = await ReportDocumentModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      response.success(res, result, "Success update report document");
    } catch (error) {
      response.error(res, error, "failed update report document");
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const doc = await ReportDocumentModel.findById(id);

      if (doc && doc.status === STATUSREPORTDOCUMENT.APPROVED) {
        return response.error(res, null, "Report Document already approved");
      }

      const result = await ReportDocumentModel.findByIdAndDelete(id);

      response.success(res, result, "Success delete report document");
    } catch (error) {
      response.error(res, error, "failed delete report document");
    }
  },

  async approve(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(req.user?.id);
      const { isApproved } = req.body;

      const doc = await ReportDocumentModel.findById(id);

      if (!doc) {
        return response.error(res, null, "Report Document not found");
      }

      // --- LOGIKA APPROVAL (4 ROLE) ---
      if (
        doc.type === TYPEEREPORTDOCUMENT.BAPB &&
        user?.role !== ROLES.PICGUDANG
      ) {
        return response.error(
          res,
          null,
          "Hanya PIC Gudang yang boleh menyetujui BAPB"
        );
      }

      if (
        doc.type === TYPEEREPORTDOCUMENT.BAPP &&
        user?.role !== ROLES.DIREKSIPEKERJAAN
      ) {
        return response.error(
          res,
          null,
          "Hanya Direksi Pekerjaan yang boleh menyetujui BAPP"
        );
      }
      // ----------------------------------

      const approver = await UserModel.findById(user?.id);

      if (!approver) {
        return response.error(res, null, "User not found");
      }

      if (isApproved) {
        doc.status = STATUSREPORTDOCUMENT.APPROVED;
        doc.approvalInfo = {
          approvedBy: approver?.id,
          approvedByName: approver?.fullname,
          approvedAt: new Date(),
          isSigned: true,
          digitalSignature: `SIG-${Date.now()}-${approver?.id}`,
        };
      } else {
        doc.status = STATUSREPORTDOCUMENT.REJECTED;
      }

      await doc.save();

      response.success(res, doc, "Success approve report document");
    } catch (error) {
      response.error(res, error, "failed approve report document");
    }
  },
};