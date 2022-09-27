import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular/grid";
export class SubmissionIndexComponent {
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    onSelect(row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    }
}
SubmissionIndexComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionIndexComponent, deps: [{ token: i1.FormManagerService }, { token: i2.ActivatedRoute }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
SubmissionIndexComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid>\r\n", dependencies: [{ kind: "component", type: i3.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.ActivatedRoute }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvc3VibWlzc2lvbi9pbmRleC9pbmRleC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2luZGV4L2luZGV4LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBTzFDLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDUyxPQUEyQixFQUMzQixLQUFxQixFQUNyQixNQUFjO1FBRmQsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNwQixDQUFDO0lBRUosUUFBUSxDQUFDLEdBQVE7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7cUhBVFUsd0JBQXdCO3lHQUF4Qix3QkFBd0Isb0RDUHJDLDhGQUNBOzJGRE1hLHdCQUF3QjtrQkFIcEMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZm9ybS1tYW5hZ2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL2luZGV4LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3VibWlzc2lvbkluZGV4Q29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBGb3JtTWFuYWdlclNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBvblNlbGVjdChyb3c6IGFueSkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3Jvdy5faWQsICd2aWV3J10sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtaW8tZ3JpZCBbZm9ybWlvXT1cInNlcnZpY2UuZm9ybWlvXCIgKHJvd1NlbGVjdCk9XCJvblNlbGVjdCgkZXZlbnQpXCI+PC9mb3JtaW8tZ3JpZD5cclxuIl19