import mongoose from "mongoose";
import * as yup from "yup";
import { STATUSVENDOR } from "../utils/constant";

const Schema = mongoose.Schema;

export const vendorDAO = yup.object({
  companyName: yup.string().required(),
  companyAddress: yup.string().required(),
  picName: yup.string().required(),
  status: yup
    .string()
    .oneOf([STATUSVENDOR.ACTIVE, STATUSVENDOR.INACTIVE])
    .required(),
});

export type Vendor = yup.InferType<typeof vendorDAO>;

const VendorSchema = new Schema<Vendor>(
  {
    companyName: {
      type: Schema.Types.String,
      required: true,
    },
    companyAddress: {
      type: Schema.Types.String,
      required: true,
    },
    picName: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: [STATUSVENDOR.ACTIVE, STATUSVENDOR.INACTIVE],
      default: STATUSVENDOR.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const VendorModel = mongoose.model("Vendor", VendorSchema);

export default VendorModel;
