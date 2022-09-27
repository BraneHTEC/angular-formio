import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular";
export class SubmissionEditComponent {
    constructor(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    onSubmit(submission) {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
}
SubmissionEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionEditComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
SubmissionEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  (submit)=\"onSubmit($event)\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i3.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  (submit)=\"onSubmit($event)\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2VkaXQvZWRpdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2VkaXQvZWRpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQU8xQyxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQ1MsT0FBMkIsRUFDM0IsTUFBYyxFQUNkLEtBQXFCO1FBRnJCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUMxQixDQUFDO0lBRUwsUUFBUSxDQUFDLFVBQVU7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDOztvSEFUVSx1QkFBdUI7d0dBQXZCLHVCQUF1QixvRENQcEMsNlBBT0E7MkZEQWEsdUJBQXVCO2tCQUhuQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2Zvcm0tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vZWRpdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFN1Ym1pc3Npb25FZGl0Q29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBGb3JtTWFuYWdlclNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcbiAgKSB7IH1cclxuXHJcbiAgb25TdWJtaXQoc3VibWlzc2lvbikge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8uLi8nXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcclxuICB9XHJcbn1cclxuIiwiPGZvcm1pb1xyXG4gIFtyZW5kZXJlcl09XCJzZXJ2aWNlLmNvbmZpZy5yZW5kZXJlclwiXHJcbiAgW3NyY109XCJzZXJ2aWNlLmZvcm1pby5zdWJtaXNzaW9uVXJsXCJcclxuICAoc3VibWl0KT1cIm9uU3VibWl0KCRldmVudClcIlxyXG4gIChmb3JtTG9hZCk9XCJzZXJ2aWNlLnNldEZvcm0oJGV2ZW50KVwiXHJcbiAgKHN1Ym1pc3Npb25Mb2FkKT1cInNlcnZpY2Uuc3VibWlzc2lvbkxvYWRlZCgkZXZlbnQpXCJcclxuPjwvZm9ybWlvPlxyXG4iXX0=