import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@formio/angular";
export class SubmissionViewComponent {
    constructor(service) {
        this.service = service;
    }
}
SubmissionViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionViewComponent, deps: [{ token: i1.FormManagerService }], target: i0.ɵɵFactoryTarget.Component });
SubmissionViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  [readOnly]=\"true\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  [readOnly]=\"true\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL3ZpZXcvdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL3ZpZXcvdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTTFDLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBSSxDQUFDOztvSEFEeEMsdUJBQXVCO3dHQUF2Qix1QkFBdUIsb0RDTnBDLG1QQU9BOzJGRERhLHVCQUF1QjtrQkFIbkMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9mb3JtLW1hbmFnZXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlldy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFN1Ym1pc3Npb25WaWV3Q29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VydmljZTogRm9ybU1hbmFnZXJTZXJ2aWNlKSB7IH1cclxufVxyXG4iLCI8Zm9ybWlvXHJcbiAgW3JlbmRlcmVyXT1cInNlcnZpY2UuY29uZmlnLnJlbmRlcmVyXCJcclxuICBbc3JjXT1cInNlcnZpY2UuZm9ybWlvLnN1Ym1pc3Npb25VcmxcIlxyXG4gIFtyZWFkT25seV09XCJ0cnVlXCJcclxuICAoZm9ybUxvYWQpPVwic2VydmljZS5zZXRGb3JtKCRldmVudClcIlxyXG4gIChzdWJtaXNzaW9uTG9hZCk9XCJzZXJ2aWNlLnN1Ym1pc3Npb25Mb2FkZWQoJGV2ZW50KVwiXHJcbj48L2Zvcm1pbz5cclxuIl19