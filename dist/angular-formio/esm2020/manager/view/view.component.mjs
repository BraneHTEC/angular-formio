import { Component, EventEmitter } from '@angular/core';
import { Formio } from 'formiojs';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "../form-manager.config";
import * as i4 from "@formio/angular/auth";
import * as i5 from "@angular/common";
import * as i6 from "@formio/angular";
export class FormManagerViewComponent {
    constructor(service, router, route, config, auth) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.auth = auth;
        this.onSuccess = new EventEmitter();
        this.onError = new EventEmitter();
        this.renderOptions = {
            saveDraft: this.config.saveDraft
        };
        this.submission = { data: {} };
    }
    ngOnInit() {
        this.service.formio = new Formio(this.service.formio.formUrl);
    }
    onSubmit(submission) {
        this.submission.data = submission.data;
        this.submission.state = 'complete';
        this.service.formio.saveSubmission(this.submission).then(saved => {
            this.onSuccess.emit();
            this.router.navigate(['../', 'submission', saved._id], { relativeTo: this.route });
        }).catch((err) => this.onError.emit(err));
    }
}
FormManagerViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerViewComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormManagerConfig }, { token: i4.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormManagerViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerViewComponent, selector: "ng-component", ngImport: i0, template: "<formio *ngIf=\"service.form\"\r\n  [renderer]=\"config.renderer\"\r\n  [renderOptions]=\"renderOptions\"\r\n  [url]=\"service.formio.formUrl\"\r\n  [form]=\"service.form\"\r\n  [submission]=\"submission\"\r\n  [success]=\"onSuccess\"\r\n  [error]=\"onError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio *ngIf=\"service.form\"\r\n  [renderer]=\"config.renderer\"\r\n  [renderOptions]=\"renderOptions\"\r\n  [url]=\"service.formio.formUrl\"\r\n  [form]=\"service.form\"\r\n  [submission]=\"submission\"\r\n  [success]=\"onSuccess\"\r\n  [error]=\"onError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormManagerConfig }, { type: i4.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy92aWV3L3ZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvdmlldy92aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7O0FBS2xDLE1BQU0sT0FBTyx3QkFBd0I7SUFLbkMsWUFDUyxPQUEyQixFQUMzQixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsTUFBeUIsRUFDekIsSUFBdUI7UUFKdkIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBUHpCLGNBQVMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxZQUFPLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFReEQsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1NBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFFBQVEsQ0FBQyxVQUFlO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7cUhBN0JVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLG9EQ1ZyQywwVEFVQTsyRkRBYSx3QkFBd0I7a0JBSHBDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybS1tYW5hZ2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhTZXJ2aWNlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyL2F1dGgnO1xyXG5pbXBvcnQgeyBGb3JtaW8gfSBmcm9tICdmb3JtaW9qcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlldy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1NYW5hZ2VyVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIHN1Ym1pc3Npb246IGFueTtcclxuICBwdWJsaWMgcmVuZGVyT3B0aW9uczogYW55O1xyXG4gIHB1YmxpYyBvblN1Y2Nlc3M6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyBvbkVycm9yOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBGb3JtTWFuYWdlclNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHVibGljIGNvbmZpZzogRm9ybU1hbmFnZXJDb25maWcsXHJcbiAgICBwdWJsaWMgYXV0aDogRm9ybWlvQXV0aFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMucmVuZGVyT3B0aW9ucyA9IHtcclxuICAgICAgc2F2ZURyYWZ0OiB0aGlzLmNvbmZpZy5zYXZlRHJhZnRcclxuICAgIH07XHJcbiAgICB0aGlzLnN1Ym1pc3Npb24gPSB7ZGF0YToge319O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlcnZpY2UuZm9ybWlvID0gbmV3IEZvcm1pbyh0aGlzLnNlcnZpY2UuZm9ybWlvLmZvcm1VcmwpO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoc3VibWlzc2lvbjogYW55KSB7XHJcbiAgICB0aGlzLnN1Ym1pc3Npb24uZGF0YSA9IHN1Ym1pc3Npb24uZGF0YTtcclxuICAgIHRoaXMuc3VibWlzc2lvbi5zdGF0ZSA9ICdjb21wbGV0ZSc7XHJcbiAgICB0aGlzLnNlcnZpY2UuZm9ybWlvLnNhdmVTdWJtaXNzaW9uKHRoaXMuc3VibWlzc2lvbikudGhlbihzYXZlZCA9PiB7XHJcbiAgICAgIHRoaXMub25TdWNjZXNzLmVtaXQoKTtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCAnc3VibWlzc2lvbicsIHNhdmVkLl9pZF0sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB0aGlzLm9uRXJyb3IuZW1pdChlcnIpKTtcclxuICB9XHJcbn1cclxuIiwiPGZvcm1pbyAqbmdJZj1cInNlcnZpY2UuZm9ybVwiXHJcbiAgW3JlbmRlcmVyXT1cImNvbmZpZy5yZW5kZXJlclwiXHJcbiAgW3JlbmRlck9wdGlvbnNdPVwicmVuZGVyT3B0aW9uc1wiXHJcbiAgW3VybF09XCJzZXJ2aWNlLmZvcm1pby5mb3JtVXJsXCJcclxuICBbZm9ybV09XCJzZXJ2aWNlLmZvcm1cIlxyXG4gIFtzdWJtaXNzaW9uXT1cInN1Ym1pc3Npb25cIlxyXG4gIFtzdWNjZXNzXT1cIm9uU3VjY2Vzc1wiXHJcbiAgW2Vycm9yXT1cIm9uRXJyb3JcIlxyXG4gIChzdWJtaXQpPVwib25TdWJtaXQoJGV2ZW50KVwiXHJcbj48L2Zvcm1pbz5cclxuIl19