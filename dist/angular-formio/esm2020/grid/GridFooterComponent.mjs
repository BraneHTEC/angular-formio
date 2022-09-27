import { GridFooterPositions } from './types/grid-footer-positions';
import { Input, Output, ViewChild, TemplateRef, EventEmitter, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class GridFooterComponent {
    constructor() {
        this.footerPositions = GridFooterPositions;
        this.pageChanged = new EventEmitter();
        this.createItem = new EventEmitter();
    }
}
GridFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GridFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: GridFooterComponent, selector: "ng-component", inputs: { header: "header", body: "body", createText: "createText", size: "size", actionAllowed: "actionAllowed" }, outputs: { pageChanged: "pageChanged", createItem: "createItem" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GridFooterComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { header: [{
                type: Input
            }], body: [{
                type: Input
            }], createText: [{
                type: Input
            }], size: [{
                type: Input
            }], actionAllowed: [{
                type: Input
            }], pageChanged: [{
                type: Output
            }], createItem: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEZvb3RlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL0dyaWRGb290ZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU8vRixNQUFNLE9BQU8sbUJBQW1CO0lBWTlCO1FBRk8sb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQztRQUczQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7O2dIQWZVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLHFSQVFuQixXQUFXLDhEQVZaLEVBQUU7MkZBRUQsbUJBQW1CO2tCQUgvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO2lCQUNiOzBFQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDSSxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ2lDLFFBQVE7c0JBQS9DLFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyaWRGb290ZXJQb3NpdGlvbnMgfSBmcm9tICcuL3R5cGVzL2dyaWQtZm9vdGVyLXBvc2l0aW9ucyc7XHJcbmltcG9ydCB7IElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIEV2ZW50RW1pdHRlciwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyaWRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL0dyaWRIZWFkZXJDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkQm9keUNvbXBvbmVudCB9IGZyb20gJy4vR3JpZEJvZHlDb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGU6ICcnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkRm9vdGVyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBoZWFkZXI6IEdyaWRIZWFkZXJDb21wb25lbnQ7XHJcbiAgQElucHV0KCkgYm9keTogR3JpZEJvZHlDb21wb25lbnQ7XHJcbiAgQElucHV0KCkgY3JlYXRlVGV4dDogU3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcclxuICBASW5wdXQoKSBhY3Rpb25BbGxvd2VkOiBhbnk7XHJcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PjtcclxuICBAT3V0cHV0KCkgY3JlYXRlSXRlbTogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwdWJsaWMgZm9vdGVyUG9zaXRpb25zID0gR3JpZEZvb3RlclBvc2l0aW9ucztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnBhZ2VDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5jcmVhdGVJdGVtID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIH1cclxufVxyXG4iXX0=