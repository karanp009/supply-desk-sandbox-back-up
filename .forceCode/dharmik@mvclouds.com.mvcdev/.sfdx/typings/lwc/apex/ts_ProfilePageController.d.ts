declare module "@salesforce/apex/ts_ProfilePageController.saveData" {
  export default function saveData(param: {usr: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_ProfilePageController.getData" {
  export default function getData(): Promise<any>;
}
declare module "@salesforce/apex/ts_ProfilePageController.getDocsData" {
  export default function getDocsData(): Promise<any>;
}
declare module "@salesforce/apex/ts_ProfilePageController.fetchContact" {
  export default function fetchContact(): Promise<any>;
}
declare module "@salesforce/apex/ts_ProfilePageController.saveFile" {
  export default function saveFile(param: {userId: any, fileId: any, base64Data: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_ProfilePageController.deleteFile" {
  export default function deleteFile(param: {userId: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_ProfilePageController.saveCV" {
  export default function saveCV(param: {parentId: any, fileName: any, base64Data: any}): Promise<any>;
}
