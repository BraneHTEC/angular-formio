import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../auth.service";
import * as i2 from "@formio/angular";
export class FormioAuthLoginComponent {
    constructor(service) {
        this.service = service;
    }
}
FormioAuthLoginComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthLoginComponent, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormioAuthLoginComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioAuthLoginComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.loginForm\" (submit)=\"service.onLoginSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthLoginComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.loginForm\" (submit)=\"service.onLoginSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvbG9naW4vbG9naW4uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvbG9naW4vbG9naW4uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUsxQyxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQW1CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO0lBQUcsQ0FBQzs7cUhBRHRDLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLG9EQ0xyQyw4RkFDQTsyRkRJYSx3QkFBd0I7a0JBSHBDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9BdXRoTG9naW5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZXJ2aWNlOiBGb3JtaW9BdXRoU2VydmljZSkge31cclxufVxyXG4iLCI8Zm9ybWlvIFtzcmNdPVwic2VydmljZS5sb2dpbkZvcm1cIiAoc3VibWl0KT1cInNlcnZpY2Uub25Mb2dpblN1Ym1pdCgkZXZlbnQpXCI+PC9mb3JtaW8+XHJcbiJdfQ==