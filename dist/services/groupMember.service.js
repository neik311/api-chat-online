"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupMemberService = void 0;
const groupMember_model_1 = require("../models/groupMember.model");
const createGroupMemberService = async (newGroupMember) => {
    await groupMember_model_1.groupMemberModel.create(newGroupMember);
    return {
        statusCode: "200",
        message: "create success",
    };
};
exports.createGroupMemberService = createGroupMemberService;
//# sourceMappingURL=groupMember.service.js.map