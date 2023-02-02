import { Application } from "express";
import userRoute from "./user.route";
import groupRoute from "./group.route";
// import groupMemberRoute from "./groupMember.route";
import messageRoute from "./message.route";

const route = (app: Application) => {
  app.use("/user", userRoute);
  app.use("/group", groupRoute);
  // app.use("/group-member", groupMemberRoute);
  app.use("/messages", messageRoute);
};

export default route;
