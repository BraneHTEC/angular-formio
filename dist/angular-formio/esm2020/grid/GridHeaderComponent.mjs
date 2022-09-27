import { Output, EventEmitter, ViewChild, TemplateRef, Input, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class GridHeaderComponent {
    constructor() {
        this.headers = [];
        this.sort = new EventEmitter();
    }
    get numHeaders() {
        return this.headers.length;
    }
    load(formio, query, columns) {
        return Promise.resolve([]);
    }
}
GridHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GridHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: GridHeaderComponent, selector: "ng-component", inputs: { actionAllowed: "actionAllowed" }, outputs: { sort: "sort" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GridHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { actionAllowed: [{
                type: Input
            }], sort: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEhlYWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL0dyaWRIZWFkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU8vRixNQUFNLE9BQU8sbUJBQW1CO0lBSzlCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLENBQUMsTUFBNEIsRUFBRSxLQUFXLEVBQUUsT0FBb0I7UUFDbEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dIQWhCVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixxS0FHbkIsV0FBVyw4REFMWixFQUFFOzJGQUVELG1CQUFtQjtrQkFIL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsRUFBRTtpQkFDYjswRUFFVSxhQUFhO3NCQUFyQixLQUFLO2dCQUNJLElBQUk7c0JBQWIsTUFBTTtnQkFDaUMsUUFBUTtzQkFBL0MsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIElucHV0LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtGb3JtaW9Qcm9taXNlU2VydmljZX0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHtHcmlkSGVhZGVyfSBmcm9tICcuL3R5cGVzL2dyaWQtaGVhZGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlOiAnJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZEhlYWRlckNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgYWN0aW9uQWxsb3dlZDogYW55O1xyXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8R3JpZEhlYWRlcj47XHJcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIHB1YmxpYyBoZWFkZXJzOiBBcnJheTxHcmlkSGVhZGVyPjtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaGVhZGVycyA9IFtdO1xyXG4gICAgdGhpcy5zb3J0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG51bUhlYWRlcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oZWFkZXJzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGxvYWQoZm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZSwgcXVlcnk/OiBhbnksIGNvbHVtbnM/OiBBcnJheTxhbnk+KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xyXG4gIH1cclxufVxyXG4iXX0=