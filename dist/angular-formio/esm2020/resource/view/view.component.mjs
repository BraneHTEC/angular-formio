import { Component } from '@angular/core';
import { Formio } from 'formiojs';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "../resource.config";
import * as i3 from "@formio/angular";
export class FormioResourceViewComponent {
    constructor(service, config) {
        this.service = service;
        this.config = config;
        this.submission = { data: {} };
    }
    ngOnDestroy() {
        Formio.clearCache();
    }
}
FormioResourceViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceViewComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i3.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.FormioResourceConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9yZXNvdXJjZS9zcmMvdmlldy92aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy92aWV3L3ZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7OztBQUtoQyxNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLFlBQ1MsT0FBOEIsRUFDOUIsTUFBNEI7UUFENUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFFOUIsZUFBVSxHQUFHLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBRDVCLENBQUM7SUFHSixXQUFXO1FBQ1QsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O3dIQVRVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLG9EQ1J4QyxpS0FNQTsyRkRFYSwyQkFBMkI7a0JBSHZDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi4vcmVzb3VyY2UuY29uZmlnJztcclxuaW1wb3J0IHtGb3JtaW99IGZyb20gJ2Zvcm1pb2pzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvUmVzb3VyY2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1pb1Jlc291cmNlU2VydmljZSxcclxuICAgIHB1YmxpYyBjb25maWc6IEZvcm1pb1Jlc291cmNlQ29uZmlnXHJcbiAgKSB7fVxyXG4gIHB1YmxpYyBzdWJtaXNzaW9uID0ge2RhdGE6IHt9fTtcclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBGb3JtaW8uY2xlYXJDYWNoZSgpO1xyXG4gIH1cclxufVxyXG4iLCI8Zm9ybWlvXHJcbiAgW2Zvcm1dPVwic2VydmljZS5mb3JtXCJcclxuICBbc3VibWlzc2lvbl09XCJzZXJ2aWNlLnJlc291cmNlXCJcclxuICBbaGlkZUNvbXBvbmVudHNdPVwiY29uZmlnLnBhcmVudHNcIlxyXG4gIFtyZWFkT25seV09XCJ0cnVlXCJcclxuPjwvZm9ybWlvPlxyXG4iXX0=