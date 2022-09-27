import { Component, EventEmitter } from '@angular/core';
import { Formio } from 'formiojs';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
import * as i3 from "../resource.config";
import * as i4 from "@formio/angular";
export class FormioResourceEditComponent {
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.triggerError = new EventEmitter();
        this.submission = { data: {} };
    }
    onSubmit(submission) {
        const edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit)
            .then(() => {
            this.router.navigate(['../', 'view'], { relativeTo: this.route });
        })
            .catch((err) => this.triggerError.emit(err));
    }
    ngOnDestroy() {
        Formio.clearCache();
    }
}
FormioResourceEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceEditComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i4.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormioResourceConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9yZXNvdXJjZS9zcmMvZWRpdC9lZGl0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9lZGl0L2VkaXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7O0FBS2xDLE1BQU0sT0FBTywyQkFBMkI7SUFHdEMsWUFDUyxPQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsTUFBNEI7UUFINUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBTjlCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsZUFBVSxHQUFHLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBTTVCLENBQUM7SUFFSixRQUFRLENBQUMsVUFBZTtRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7d0hBdEJVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLG9EQ1R4QyxnS0FNQTsyRkRHYSwyQkFBMkI7a0JBSHZDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi4vcmVzb3VyY2UuY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvIH0gZnJvbSAnZm9ybWlvanMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL2VkaXQuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyB0cmlnZ2VyRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyBzdWJtaXNzaW9uID0ge2RhdGE6IHt9fTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBGb3JtaW9SZXNvdXJjZVNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHVibGljIGNvbmZpZzogRm9ybWlvUmVzb3VyY2VDb25maWdcclxuICApIHt9XHJcblxyXG4gIG9uU3VibWl0KHN1Ym1pc3Npb246IGFueSkge1xyXG4gICAgY29uc3QgZWRpdCA9IHRoaXMuc2VydmljZS5yZXNvdXJjZTtcclxuICAgIGVkaXQuZGF0YSA9IHN1Ym1pc3Npb24uZGF0YTtcclxuICAgIHRoaXMuc2VydmljZS5zYXZlKGVkaXQpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsICd2aWV3J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHRoaXMudHJpZ2dlckVycm9yLmVtaXQoZXJyKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIEZvcm1pby5jbGVhckNhY2hlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtaW9cclxuICBbZm9ybV09XCJzZXJ2aWNlLmZvcm1cIlxyXG4gIFtzdWJtaXNzaW9uXT1cInNlcnZpY2UucmVzb3VyY2VcIlxyXG4gIFtlcnJvcl09XCJ0cmlnZ2VyRXJyb3JcIlxyXG4gIChzdWJtaXQpPVwib25TdWJtaXQoJGV2ZW50KVwiXHJcbj48L2Zvcm1pbz5cclxuIl19