import { Component, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
import * as i3 from "../resource.config";
import * as i4 from "@angular/common";
import * as i5 from "@formio/angular";
export class FormioResourceCreateComponent {
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.onError = new EventEmitter();
        this.onSuccess = new EventEmitter();
    }
    ngOnInit() {
        this.service.setContext(this.route);
    }
    onSubmit(submission) {
        this.service
            .save(submission)
            .then(() => {
            this.router.navigate(['../', this.service.resource._id, 'view'], {
                relativeTo: this.route
            });
        })
            .catch((err) => this.onError.emit(err));
    }
}
FormioResourceCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceCreateComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceCreateComponent, selector: "ng-component", ngImport: i0, template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.FormioComponent, selector: "formio" }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceCreateComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormioResourceConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBU2hFLE1BQU0sT0FBTyw2QkFBNkI7SUFHeEMsWUFDUyxPQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsTUFBNEI7UUFINUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBRW5DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxVQUFlO1FBQ3RCLElBQUksQ0FBQyxPQUFPO2FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMvRCxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDdkIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OzBIQTFCVSw2QkFBNkI7OEdBQTdCLDZCQUE2QixvRENUMUMscWNBYUE7MkZESmEsNkJBQTZCO2tCQUp6QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi4vcmVzb3VyY2UuY29uZmlnJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHN0eWxlVXJsczogWycuL2NyZWF0ZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jcmVhdGUuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZUNyZWF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIHB1YmxpYyBvblN1Y2Nlc3M6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1pb1Jlc291cmNlU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgY29uZmlnOiBGb3JtaW9SZXNvdXJjZUNvbmZpZ1xyXG4gICkge1xyXG4gICAgdGhpcy5vbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5vblN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VydmljZS5zZXRDb250ZXh0KHRoaXMucm91dGUpO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoc3VibWlzc2lvbjogYW55KSB7XHJcbiAgICB0aGlzLnNlcnZpY2VcclxuICAgICAgLnNhdmUoc3VibWlzc2lvbilcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgdGhpcy5zZXJ2aWNlLnJlc291cmNlLl9pZCwgJ3ZpZXcnXSwge1xyXG4gICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB0aGlzLm9uRXJyb3IuZW1pdChlcnIpKTtcclxuICB9XHJcbn1cclxuIiwiPGgzICpuZ0lmPVwic2VydmljZS5mb3JtXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjA7XCI+XHJcbiAgPGEgcm91dGVyTGluaz1cIi4uL1wiIGNsYXNzPVwiYmFjay1idXR0b25cIj5cclxuICAgIDxlbSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdCBnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tbGVmdFwiPjwvZW0+XHJcbiAgPC9hPiB8IE5ldyB7eyBzZXJ2aWNlLmZvcm0udGl0bGUgfX1cclxuPC9oMz5cclxuPGZvcm1pb1xyXG4gIFtmb3JtXT1cInNlcnZpY2UuZm9ybVwiXHJcbiAgW3N1Ym1pc3Npb25dPVwic2VydmljZS5yZXNvdXJjZVwiXHJcbiAgW3JlZnJlc2hdPVwic2VydmljZS5yZWZyZXNoXCJcclxuICBbZXJyb3JdPVwib25FcnJvclwiXHJcbiAgW3N1Y2Nlc3NdPVwib25TdWNjZXNzXCJcclxuICAoc3VibWl0KT1cIm9uU3VibWl0KCRldmVudClcIlxyXG4+PC9mb3JtaW8+XHJcbiJdfQ==