import mongoose, { Model, ObjectId } from "mongoose";
import * as Yup from "yup";
import { STATUSREPORTDOCUMENT, TYPEEREPORTDOCUMENT } from "../utils/constant";

const Schema = mongoose.Schema;

export interface TVendorSnapshot {
  vendorRefId: mongoose.Types.ObjectId;
  companyName: string;
  picName: string;
}

export interface TApprovalInfo {
  approvedBy?: mongoose.Types.ObjectId;
  approvedByName: string;
  approvedAt: Date;
  digitalSignature: string;
  isSigned: boolean;
}

export interface IReportDocument extends Document {
  type: TYPEEREPORTDOCUMENT.BAPB | TYPEEREPORTDOCUMENT.BAPP;
  contractNumber: string;
  paymentNominal: number;
  description: string;
  vendorSnapshot: TVendorSnapshot;
  status: STATUSREPORTDOCUMENT;
  approvalInfo?: TApprovalInfo;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const ReportDocumentDAO = Yup.object({
  type: Yup.string()
    .oneOf([TYPEEREPORTDOCUMENT.BAPB, TYPEEREPORTDOCUMENT.BAPP])
    .required(),
  contractNumber: Yup.string().required(),
  paymentNominal: Yup.number().min(1).required(),
  description: Yup.string().required(),
});

const VendorSnapshotSchema = new Schema<TVendorSnapshot>(
  {
    vendorRefId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Vendor",
    },
    companyName: {
      type: Schema.Types.String,
      required: true,
    },
    picName: {
      type: Schema.Types.String,
    },
  },
  { _id: false }
);

const ApprovalInfoSchema = new Schema<TApprovalInfo>(
  {
    approvedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    approvedByName: {
      type: Schema.Types.String,
    },
    approvedAt: {
      type: Schema.Types.Date,
    },
    digitalSignature: {
      type: Schema.Types.String,
    },
    isSigned: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { _id: false }
);

const ReportDocumentSchema = new Schema<IReportDocument>(
  {
    type: {
      type: Schema.Types.String,
      enum: Object.values(TYPEEREPORTDOCUMENT),
      required: true,
    },
    contractNumber: {
      type: Schema.Types.String,
      required: true,
    },
    paymentNominal: {
      type: Schema.Types.Number,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    vendorSnapshot: {
      type: VendorSnapshotSchema,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: Object.values(STATUSREPORTDOCUMENT),
      default: STATUSREPORTDOCUMENT.PENDING,
    },
    approvalInfo: {
      type: ApprovalInfoSchema,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const ReportDocumentModel: Model<IReportDocument> =
  mongoose.model<IReportDocument>("ReportDocument", ReportDocumentSchema);
