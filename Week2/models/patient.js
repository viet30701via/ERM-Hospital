"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Patient"] = "patient";
    Role["Doctor"] = "doctor";
})(Role || (exports.Role = Role = {}));
var PatientStatus;
(function (PatientStatus) {
    PatientStatus["Active"] = "active";
    PatientStatus["Inactive"] = "inactive";
})(PatientStatus || (exports.PatientStatus = PatientStatus = {}));
