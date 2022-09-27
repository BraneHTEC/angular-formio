import { Component } from '@angular/core';
import { each } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
import * as i3 from "../resource.config";
import * as i4 from "@formio/angular";
import * as i5 from "@formio/angular/grid";
export class FormioResourceIndexComponent {
    constructor(service, route, router, config, cdr, ngZone) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.cdr = cdr;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        this.gridQuery = {};
        this.service.setContext(this.route);
        this.service.formLoaded.then(() => {
            if (this.service &&
                this.config.parents &&
                this.config.parents.length) {
                this.service.loadParents().then((parents) => {
                    each(parents, (parent) => {
                        if (parent && parent.filter) {
                            this.gridQuery['data.' + parent.name + '._id'] =
                                parent.resource._id;
                        }
                    });
                    // Set the source to load the grid.
                    this.gridSrc = this.service.formUrl;
                    this.createText = `New ${this.service.form.title}`;
                });
            }
            else if (this.service.formUrl) {
                this.gridSrc = this.service.formUrl;
                this.createText = `New ${this.service.form.title}`;
            }
            this.cdr.detectChanges();
        });
    }
    onSelect(row) {
        this.ngZone.run(() => {
            this.router.navigate([row._id, 'view'], { relativeTo: this.route });
        });
    }
    onCreateItem() {
        this.ngZone.run(() => {
            this.router.navigate(['new'], { relativeTo: this.route });
        });
    }
}
FormioResourceIndexComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceIndexComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormioResourceConfig }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceIndexComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n", dependencies: [{ kind: "component", type: i4.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "component", type: i5.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormioResourceConfig }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vcmVzb3VyY2Uvc3JjL2luZGV4L2luZGV4LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9pbmRleC9pbmRleC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQyxNQUFNLGVBQWUsQ0FBQztBQUk3RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBSzlCLE1BQU0sT0FBTyw0QkFBNEI7SUFLdkMsWUFDUyxPQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsTUFBNEIsRUFDNUIsR0FBc0IsRUFDdEIsTUFBYztRQUxkLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUM1QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRXZCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDaEMsSUFDRSxJQUFJLENBQUMsT0FBTztnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDMUI7Z0JBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtvQkFDL0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFO3dCQUM1QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFOzRCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztnQ0FDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7eUJBQ3ZCO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUVILG1DQUFtQztvQkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNwRDtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVE7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O3lIQXZEVSw0QkFBNEI7NkdBQTVCLDRCQUE0QixvRENUekMsZ1ZBVUE7MkZERGEsNEJBQTRCO2tCQUh4QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlU2VydmljZSB9IGZyb20gJy4uL3Jlc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUNvbmZpZyB9IGZyb20gJy4uL3Jlc291cmNlLmNvbmZpZyc7XHJcbmltcG9ydCB7IGVhY2ggfSBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL2luZGV4LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvUmVzb3VyY2VJbmRleENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGdyaWRTcmM/OiBzdHJpbmc7XHJcbiAgcHVibGljIGdyaWRRdWVyeTogYW55O1xyXG4gIHB1YmxpYyBjcmVhdGVUZXh0OiBTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1pb1Jlc291cmNlU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgY29uZmlnOiBGb3JtaW9SZXNvdXJjZUNvbmZpZyxcclxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHVibGljIG5nWm9uZTogTmdab25lLFxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdyaWRRdWVyeSA9IHt9O1xyXG4gICAgdGhpcy5zZXJ2aWNlLnNldENvbnRleHQodGhpcy5yb3V0ZSk7XHJcbiAgICB0aGlzLnNlcnZpY2UuZm9ybUxvYWRlZC50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2VydmljZSAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlnLnBhcmVudHMgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZy5wYXJlbnRzLmxlbmd0aFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2UubG9hZFBhcmVudHMoKS50aGVuKChwYXJlbnRzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGVhY2gocGFyZW50cywgKHBhcmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmZpbHRlcikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZ3JpZFF1ZXJ5WydkYXRhLicgKyBwYXJlbnQubmFtZSArICcuX2lkJ10gPVxyXG4gICAgICAgICAgICAgICAgcGFyZW50LnJlc291cmNlLl9pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gU2V0IHRoZSBzb3VyY2UgdG8gbG9hZCB0aGUgZ3JpZC5cclxuICAgICAgICAgIHRoaXMuZ3JpZFNyYyA9IHRoaXMuc2VydmljZS5mb3JtVXJsO1xyXG4gICAgICAgICAgdGhpcy5jcmVhdGVUZXh0ID0gYE5ldyAke3RoaXMuc2VydmljZS5mb3JtLnRpdGxlfWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXJ2aWNlLmZvcm1VcmwpIHtcclxuICAgICAgICB0aGlzLmdyaWRTcmMgPSB0aGlzLnNlcnZpY2UuZm9ybVVybDtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRleHQgPSBgTmV3ICR7dGhpcy5zZXJ2aWNlLmZvcm0udGl0bGV9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdChyb3c6IGFueSkge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3Jvdy5faWQsICd2aWV3J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DcmVhdGVJdGVtKCkge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWyduZXcnXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtaW8tYWxlcnRzIFthbGVydHNdPVwic2VydmljZS5hbGVydHNcIj48L2Zvcm1pby1hbGVydHM+XHJcbjxmb3JtaW8tZ3JpZFxyXG4gIFtzcmNdPVwiZ3JpZFNyY1wiXHJcbiAgW3F1ZXJ5XT1cImdyaWRRdWVyeVwiXHJcbiAgW29uRm9ybV09XCJzZXJ2aWNlLmZvcm1Mb2FkZWRcIlxyXG4gIChyb3dTZWxlY3QpPVwib25TZWxlY3QoJGV2ZW50KVwiXHJcbiAgKGVycm9yKT1cInNlcnZpY2Uub25FcnJvcigkZXZlbnQpXCJcclxuICAoY3JlYXRlSXRlbSk9XCJvbkNyZWF0ZUl0ZW0oKVwiXHJcbiAgW2NyZWF0ZVRleHRdPVwiY3JlYXRlVGV4dFwiXHJcbj48L2Zvcm1pby1ncmlkPlxyXG4iXX0=