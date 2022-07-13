declare module "@salesforce/apex/ts_RegisterController.checkuser" {
  export default function checkuser(param: {email: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_RegisterController.createuser" {
  export default function createuser(param: {contwrapdata: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_RegisterController.forgotpassword" {
  export default function forgotpassword(param: {usernameval: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_RegisterController.getcrdata" {
  export default function getcrdata(param: {userid: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_RegisterController.changepass" {
  export default function changepass(param: {newPassword: any, verifyNewPassword: any, oldpassword: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_RegisterController.resetpass" {
  export default function resetpass(param: {newPassword: any, usrid: any}): Promise<any>;
}
