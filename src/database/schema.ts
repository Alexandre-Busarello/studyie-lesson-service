import mongoose from"mongoose";
// const aws = require("aws-sdk");
// const fs = require("fs");
// const path = require("path");
// const { promisify } = require("util");

// const s3 = new aws.S3();

const LessonSchema = new mongoose.Schema({
  name: String,
  thumbUrl: String,
  videoUrl: String,
  description: String,
  contentsType: [{
    name: { type: String, trim: true }
  }],
  tutorExternalId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContentTypeSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserPreferenceSchema = new mongoose.Schema({
  externalId: String,
  preferences: [{
    preferenceName: { type: String, trim: true },
    priority: { type: Number }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// PostSchema.pre("save", function() {
//   if (!this.url) {
//     this.url = `${process.env.APP_URL}/files/${this.key}`;
//   }
// });

// PostSchema.pre("remove", function() {
//   if (process.env.STORAGE_TYPE === "s3") {
//     return s3
//       .deleteObject({
//         Bucket: "uploadexample2",
//         Key: this.key
//       })
//       .promise();
//   } else {
//     return promisify(fs.unlink)(
//       path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
//     );
//   }
// });

export const Lesson = mongoose.model("Lesson", LessonSchema);
export const ContentType = mongoose.model("ContentType", ContentTypeSchema);
export const UserPreference = mongoose.model("UserPreference", UserPreferenceSchema);
