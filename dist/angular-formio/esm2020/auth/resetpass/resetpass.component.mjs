import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../auth.service";
import * as i2 from "@formio/angular";
export class FormioResetPassComponent {
    constructor(service) {
        this.service = service;
    }
}
FormioResetPassComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResetPassComponent, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormioResetPassComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResetPassComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.resetPassForm\" (submit)=\"service.onResetPassSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResetPassComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.resetPassForm\" (submit)=\"service.onResetPassSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRwYXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2F1dGgvc3JjL3Jlc2V0cGFzcy9yZXNldHBhc3MuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvcmVzZXRwYXNzL3Jlc2V0cGFzcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzFDLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7SUFBRyxDQUFDOztxSEFEdEMsd0JBQXdCO3lHQUF4Qix3QkFBd0Isb0RDTHJDLHNHQUNBOzJGRElhLHdCQUF3QjtrQkFIcEMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtaW9BdXRoU2VydmljZSB9IGZyb20gJy4uL2F1dGguc2VydmljZSc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXNldHBhc3MuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNldFBhc3NDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZXJ2aWNlOiBGb3JtaW9BdXRoU2VydmljZSkge31cclxufVxyXG4iLCI8Zm9ybWlvIFtzcmNdPVwic2VydmljZS5yZXNldFBhc3NGb3JtXCIgKHN1Ym1pdCk9XCJzZXJ2aWNlLm9uUmVzZXRQYXNzU3VibWl0KCRldmVudClcIj48L2Zvcm1pbz5cclxuIl19