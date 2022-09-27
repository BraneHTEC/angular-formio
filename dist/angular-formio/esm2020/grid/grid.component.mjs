import { GridFooterPositions } from './types/grid-footer-positions';
import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { each } from 'lodash';
import { Formio } from 'formiojs';
import FormComponents from './form/index';
import SubmissionComponents from './submission/index';
import { FormioPromiseService } from '@formio/angular';
import { SortType } from './types/grid-header';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "@angular/common";
export class FormioGridComponent {
    constructor(alerts, resolver, ref) {
        this.alerts = alerts;
        this.resolver = resolver;
        this.ref = ref;
        this.footerPosition = GridFooterPositions.bottom;
        this.page = 0;
        this.isLoading = false;
        this.initialized = false;
        this.footerPositions = GridFooterPositions;
        this.select = this.rowSelect = new EventEmitter();
        this.rowAction = new EventEmitter();
        this.createItem = new EventEmitter();
        this.error = new EventEmitter();
        this.isLoading = true;
    }
    createComponent(property, component) {
        const factory = this.resolver.resolveComponentFactory(component);
        const componentRef = property.createComponent(factory);
        return componentRef.instance;
    }
    loadGrid(src) {
        // If no source is provided, then skip.
        if (!src && !this.formio) {
            return;
        }
        // Do not double load.
        if (this.formio && this.src && (src === this.src)) {
            return;
        }
        if (src) {
            this.src = src;
            this.formio = new FormioPromiseService(this.src, { formOnly: true });
        }
        // Load the header.
        this.header.load(this.formio, {}, this.columns)
            .then(() => this.setPage(0))
            .catch(error => this.onError(error));
    }
    ngOnInit() {
        // Create our components.
        const comps = this.components || ((this.gridType === 'form') ? FormComponents : SubmissionComponents);
        this.header = this.createComponent(this.headerElement, comps.header);
        this.header.actionAllowed = this.actionAllowed.bind(this);
        this.header.sort.subscribe(header => this.sortColumn(header));
        this.body = this.createComponent(this.bodyElement, comps.body);
        this.body.header = this.header;
        this.body.actionAllowed = this.actionAllowed.bind(this);
        this.body.rowSelect.subscribe(row => this.rowSelect.emit(row));
        this.body.rowAction.subscribe(action => this.rowAction.emit(action));
        this.footer = this.createComponent(this.footerElement, comps.footer);
        this.footer.header = this.header;
        this.footer.body = this.body;
        this.footer.actionAllowed = this.actionAllowed.bind(this);
        this.footer.createText = this.createText;
        this.footer.size = this.size;
        this.footer.pageChanged.subscribe(page => this.pageChanged(page));
        this.footer.createItem.subscribe(item => this.createItem.emit(item));
    }
    ngOnChanges(changes) {
        if (this.initialized) {
            if ((changes.src && changes.src.currentValue) ||
                (changes.formio && changes.formio.currentValue)) {
                this.loadGrid(changes.src.currentValue);
            }
            if (changes.items && changes.items.currentValue) {
                this.refreshGrid();
            }
        }
        if (this.footer &&
            (changes.createText && changes.createText.currentValue)) {
            this.footer.createText = changes.createText.currentValue;
        }
    }
    ngAfterViewInit() {
        this.alerts.setAlerts([]);
        this.query = this.query || {};
        if (this.refresh) {
            this.refresh.subscribe((query) => this.refreshGrid(query));
        }
        this.loadGrid(this.src);
        this.initialized = true;
        this.ref.detectChanges();
    }
    actionAllowed(action) {
        if (this.isActionAllowed) {
            return this.isActionAllowed(action);
        }
        else {
            return true;
        }
    }
    onError(error) {
        this.isLoading = false;
        this.error.emit(error);
        if (typeof error === 'string' || error.message) {
            this.alerts.setAlert({
                type: 'danger',
                message: error.message || error
            });
        }
    }
    refreshGrid(query) {
        this.alerts.setAlerts([]);
        this.query = query || this.query;
        if (!this.query.hasOwnProperty('limit')) {
            this.query.limit = 10;
        }
        if (!this.query.hasOwnProperty('skip')) {
            this.query.skip = 0;
        }
        this.isLoading = true;
        this.ref.detectChanges();
        Formio.cache = {};
        let loader = null;
        if (this.items) {
            loader = Promise.resolve(this.body.setRows(this.query, this.items));
        }
        else {
            loader = this.body.load(this.formio, this.query);
        }
        return loader.then(info => {
            this.isLoading = false;
            this.initialized = true;
            this.ref.detectChanges();
        }).catch(error => this.onError(error));
    }
    setPage(num = -1) {
        this.page = num !== -1 ? num : this.page;
        if (!this.query.hasOwnProperty('limit')) {
            this.query.limit = 10;
        }
        if (!this.query.hasOwnProperty('skip')) {
            this.query.skip = 0;
        }
        this.query.skip = this.page * this.query.limit;
        this.refreshGrid();
    }
    sortColumn(header) {
        // Reset all other column sorts.
        each(this.header.headers, (col) => {
            if (col.key !== header.key) {
                col.sort = '';
            }
        });
        switch (header.sort) {
            case 'asc':
                header.sort = SortType.DESC;
                this.query.sort = '-' + header.key;
                break;
            case 'desc':
                header.sort = undefined;
                delete this.query.sort;
                break;
            case undefined:
                header.sort = SortType.ASC;
                this.query.sort = header.key;
                break;
        }
        this.refreshGrid();
    }
    pageChanged(page) {
        this.setPage(page.page - 1);
    }
}
FormioGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioGridComponent, deps: [{ token: i1.FormioAlerts }, { token: i0.ComponentFactoryResolver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
FormioGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioGridComponent, selector: "formio-grid", inputs: { footerPosition: "footerPosition", src: "src", items: "items", onForm: "onForm", query: "query", refresh: "refresh", columns: "columns", gridType: "gridType", size: "size", components: "components", formio: "formio", label: "label", createText: "createText", isActionAllowed: "isActionAllowed" }, outputs: { select: "select", rowSelect: "rowSelect", rowAction: "rowAction", createItem: "createItem", error: "error" }, viewQueries: [{ propertyName: "headerElement", first: true, predicate: ["headerTemplate"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "bodyElement", first: true, predicate: ["bodyTemplate"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "footerElement", first: true, predicate: ["footerTemplate"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template #headerTemplate></ng-template>\r\n<ng-template #bodyTemplate></ng-template>\r\n<ng-template #footerTemplate></ng-template>\r\n<div class=\"formio-grid\">\r\n  <formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n  <table class=\"table table-bordered table-striped table-hover\">\r\n    <ng-container *ngIf=\"initialized && [footerPositions.top, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.top, label: label }\">\r\n    </ng-container>\r\n    <ng-container *ngIf=\"initialized\"\r\n      [ngTemplateOutlet]=\"header.template\"></ng-container>\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n    <ng-container *ngIf=\"initialized\" [ngTemplateOutlet]=\"body.template\"></ng-container>\r\n    <ng-container *ngIf=\"initialized && [footerPositions.bottom, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.bottom, label: label }\">\r\n    </ng-container>\r\n  </table>\r\n</div>\r\n", styles: [".formio-grid{position:relative;width:100%}.grid-refresh{height:400px;width:100%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i1.FormioLoaderComponent, selector: "formio-loader", inputs: ["isLoading"] }, { kind: "component", type: i1.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-grid', template: "<ng-template #headerTemplate></ng-template>\r\n<ng-template #bodyTemplate></ng-template>\r\n<ng-template #footerTemplate></ng-template>\r\n<div class=\"formio-grid\">\r\n  <formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n  <table class=\"table table-bordered table-striped table-hover\">\r\n    <ng-container *ngIf=\"initialized && [footerPositions.top, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.top, label: label }\">\r\n    </ng-container>\r\n    <ng-container *ngIf=\"initialized\"\r\n      [ngTemplateOutlet]=\"header.template\"></ng-container>\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n    <ng-container *ngIf=\"initialized\" [ngTemplateOutlet]=\"body.template\"></ng-container>\r\n    <ng-container *ngIf=\"initialized && [footerPositions.bottom, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.bottom, label: label }\">\r\n    </ng-container>\r\n  </table>\r\n</div>\r\n", styles: [".formio-grid{position:relative;width:100%}.grid-refresh{height:400px;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormioAlerts }, { type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerPosition: [{
                type: Input
            }], src: [{
                type: Input
            }], items: [{
                type: Input
            }], onForm: [{
                type: Input
            }], query: [{
                type: Input
            }], refresh: [{
                type: Input
            }], columns: [{
                type: Input
            }], gridType: [{
                type: Input
            }], size: [{
                type: Input
            }], components: [{
                type: Input
            }], formio: [{
                type: Input
            }], label: [{
                type: Input
            }], createText: [{
                type: Input
            }], isActionAllowed: [{
                type: Input
            }], select: [{
                type: Output
            }], rowSelect: [{
                type: Output
            }], rowAction: [{
                type: Output
            }], createItem: [{
                type: Output
            }], error: [{
                type: Output
            }], headerElement: [{
                type: ViewChild,
                args: ['headerTemplate', { read: ViewContainerRef, static: true }]
            }], bodyElement: [{
                type: ViewChild,
                args: ['bodyTemplate', { read: ViewContainerRef, static: true }]
            }], footerElement: [{
                type: ViewChild,
                args: ['footerTemplate', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9ncmlkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL2dyaWQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUdMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQyxPQUFPLGNBQWMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxvQkFBb0IsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVyRCxPQUFPLEVBQWEsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFPekQsTUFBTSxPQUFPLG1CQUFtQjtJQWdDOUIsWUFDUyxNQUFvQixFQUNuQixRQUFrQyxFQUNsQyxHQUFzQjtRQUZ2QixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbEN2QixtQkFBYyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQXVCOUMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFJcEIsb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQztRQU8zQyxJ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TC9CLFNBQVM7K0JBQ0UsYUFBYTswS0FLZCxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0ksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFDOEQsYUFBYTtzQkFBakYsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQUNBLFdBQVc7c0JBQTdFLFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBQ0ksYUFBYTtzQkFBakYsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZEZvb3RlclBvc2l0aW9ucyB9IGZyb20gJy4vdHlwZXMvZ3JpZC1mb290ZXItcG9zaXRpb25zJztcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Rm9ybWlvQWxlcnRzfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQge2VhY2h9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7Rm9ybWlvfSBmcm9tICdmb3JtaW9qcyc7XHJcbmltcG9ydCB7R3JpZEhlYWRlckNvbXBvbmVudH0gZnJvbSAnLi9HcmlkSGVhZGVyQ29tcG9uZW50JztcclxuaW1wb3J0IHtHcmlkQm9keUNvbXBvbmVudH0gZnJvbSAnLi9HcmlkQm9keUNvbXBvbmVudCc7XHJcbmltcG9ydCB7R3JpZEZvb3RlckNvbXBvbmVudH0gZnJvbSAnLi9HcmlkRm9vdGVyQ29tcG9uZW50JztcclxuaW1wb3J0IEZvcm1Db21wb25lbnRzIGZyb20gJy4vZm9ybS9pbmRleCc7XHJcbmltcG9ydCBTdWJtaXNzaW9uQ29tcG9uZW50cyBmcm9tICcuL3N1Ym1pc3Npb24vaW5kZXgnO1xyXG5pbXBvcnQge0Zvcm1pb1Byb21pc2VTZXJ2aWNlfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQge0dyaWRDb2x1bW59IGZyb20gJy4vdHlwZXMvZ3JpZC1jb2x1bW4nO1xyXG5pbXBvcnQge0dyaWRIZWFkZXIsIFNvcnRUeXBlfSBmcm9tICcuL3R5cGVzL2dyaWQtaGVhZGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZm9ybWlvLWdyaWQnLFxyXG4gIHN0eWxlVXJsczogWycuL2dyaWQuY29tcG9uZW50LnNjc3MnXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgZm9vdGVyUG9zaXRpb24gPSBHcmlkRm9vdGVyUG9zaXRpb25zLmJvdHRvbTtcclxuICBASW5wdXQoKSBzcmM/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaXRlbXM/OiBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpIG9uRm9ybT86IFByb21pc2U8YW55PjtcclxuICBASW5wdXQoKSBxdWVyeT86IGFueTtcclxuICBASW5wdXQoKSByZWZyZXNoPzogRXZlbnRFbWl0dGVyPG9iamVjdD47XHJcbiAgQElucHV0KCkgY29sdW1ucz86IEFycmF5PEdyaWRDb2x1bW4+O1xyXG4gIEBJbnB1dCgpIGdyaWRUeXBlPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNpemU/OiBudW1iZXI7XHJcbiAgQElucHV0KCkgY29tcG9uZW50cz86IGFueTtcclxuICBASW5wdXQoKSBmb3JtaW8/OiBGb3JtaW9Qcm9taXNlU2VydmljZTtcclxuICBASW5wdXQoKSBsYWJlbD86IHN0cmluZztcclxuICBASW5wdXQoKSBjcmVhdGVUZXh0OiBTdHJpbmc7XHJcbiAgQElucHV0KCkgaXNBY3Rpb25BbGxvd2VkOiBhbnk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPG9iamVjdD47XHJcbiAgQE91dHB1dCgpIHJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPG9iamVjdD47XHJcbiAgQE91dHB1dCgpIHJvd0FjdGlvbjogRXZlbnRFbWl0dGVyPG9iamVjdD47XHJcbiAgQE91dHB1dCgpIGNyZWF0ZUl0ZW06IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIEBPdXRwdXQoKSBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQFZpZXdDaGlsZCgnaGVhZGVyVGVtcGxhdGUnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgaGVhZGVyRWxlbWVudDogVmlld0NvbnRhaW5lclJlZjtcclxuICBAVmlld0NoaWxkKCdib2R5VGVtcGxhdGUnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgYm9keUVsZW1lbnQ6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZm9vdGVyVGVtcGxhdGUnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgZm9vdGVyRWxlbWVudDogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgcHVibGljIHBhZ2UgPSAwO1xyXG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICBwdWJsaWMgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgaGVhZGVyOiBHcmlkSGVhZGVyQ29tcG9uZW50O1xyXG4gIHB1YmxpYyBib2R5OiBHcmlkQm9keUNvbXBvbmVudDtcclxuICBwdWJsaWMgZm9vdGVyOiBHcmlkRm9vdGVyQ29tcG9uZW50O1xyXG4gIHB1YmxpYyBmb290ZXJQb3NpdGlvbnMgPSBHcmlkRm9vdGVyUG9zaXRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBhbGVydHM6IEZvcm1pb0FsZXJ0cyxcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3QgPSB0aGlzLnJvd1NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMucm93QWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5jcmVhdGVJdGVtID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5lcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNvbXBvbmVudChwcm9wZXJ0eSwgY29tcG9uZW50KSB7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gcHJvcGVydHkuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIGxvYWRHcmlkKHNyYz86IHN0cmluZykge1xyXG4gICAgLy8gSWYgbm8gc291cmNlIGlzIHByb3ZpZGVkLCB0aGVuIHNraXAuXHJcbiAgICBpZiAoIXNyYyAmJiAhdGhpcy5mb3JtaW8pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gRG8gbm90IGRvdWJsZSBsb2FkLlxyXG4gICAgaWYgKHRoaXMuZm9ybWlvICYmIHRoaXMuc3JjICYmIChzcmMgPT09IHRoaXMuc3JjKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNyYykge1xyXG4gICAgICB0aGlzLnNyYyA9IHNyYztcclxuICAgICAgdGhpcy5mb3JtaW8gPSBuZXcgRm9ybWlvUHJvbWlzZVNlcnZpY2UodGhpcy5zcmMsIHsgZm9ybU9ubHk6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9hZCB0aGUgaGVhZGVyLlxyXG4gICAgdGhpcy5oZWFkZXIubG9hZCh0aGlzLmZvcm1pbywge30sIHRoaXMuY29sdW1ucylcclxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zZXRQYWdlKDApKVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5vbkVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIENyZWF0ZSBvdXIgY29tcG9uZW50cy5cclxuICAgIGNvbnN0IGNvbXBzID0gdGhpcy5jb21wb25lbnRzIHx8ICgodGhpcy5ncmlkVHlwZSA9PT0gJ2Zvcm0nKSA/IEZvcm1Db21wb25lbnRzIDogU3VibWlzc2lvbkNvbXBvbmVudHMpO1xyXG5cclxuICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jcmVhdGVDb21wb25lbnQodGhpcy5oZWFkZXJFbGVtZW50LCBjb21wcy5oZWFkZXIpO1xyXG4gICAgdGhpcy5oZWFkZXIuYWN0aW9uQWxsb3dlZCA9IHRoaXMuYWN0aW9uQWxsb3dlZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oZWFkZXIuc29ydC5zdWJzY3JpYmUoaGVhZGVyID0+IHRoaXMuc29ydENvbHVtbihoZWFkZXIpKTtcclxuXHJcbiAgICB0aGlzLmJvZHkgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudCh0aGlzLmJvZHlFbGVtZW50LCBjb21wcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5oZWFkZXIgPSB0aGlzLmhlYWRlcjtcclxuICAgIHRoaXMuYm9keS5hY3Rpb25BbGxvd2VkID0gdGhpcy5hY3Rpb25BbGxvd2VkLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmJvZHkucm93U2VsZWN0LnN1YnNjcmliZShyb3cgPT4gdGhpcy5yb3dTZWxlY3QuZW1pdChyb3cpKTtcclxuICAgIHRoaXMuYm9keS5yb3dBY3Rpb24uc3Vic2NyaWJlKGFjdGlvbiA9PiB0aGlzLnJvd0FjdGlvbi5lbWl0KGFjdGlvbikpO1xyXG5cclxuICAgIHRoaXMuZm9vdGVyID0gdGhpcy5jcmVhdGVDb21wb25lbnQodGhpcy5mb290ZXJFbGVtZW50LCBjb21wcy5mb290ZXIpO1xyXG4gICAgdGhpcy5mb290ZXIuaGVhZGVyID0gdGhpcy5oZWFkZXI7XHJcbiAgICB0aGlzLmZvb3Rlci5ib2R5ID0gdGhpcy5ib2R5O1xyXG4gICAgdGhpcy5mb290ZXIuYWN0aW9uQWxsb3dlZCA9IHRoaXMuYWN0aW9uQWxsb3dlZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5mb290ZXIuY3JlYXRlVGV4dCA9IHRoaXMuY3JlYXRlVGV4dDtcclxuICAgIHRoaXMuZm9vdGVyLnNpemUgPSB0aGlzLnNpemU7XHJcbiAgICB0aGlzLmZvb3Rlci5wYWdlQ2hhbmdlZC5zdWJzY3JpYmUocGFnZSA9PiB0aGlzLnBhZ2VDaGFuZ2VkKHBhZ2UpKTtcclxuICAgIHRoaXMuZm9vdGVyLmNyZWF0ZUl0ZW0uc3Vic2NyaWJlKGl0ZW0gPT4gdGhpcy5jcmVhdGVJdGVtLmVtaXQoaXRlbSkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGNoYW5nZXMuc3JjICYmIGNoYW5nZXMuc3JjLmN1cnJlbnRWYWx1ZSkgfHxcclxuICAgICAgICAoY2hhbmdlcy5mb3JtaW8gJiYgY2hhbmdlcy5mb3JtaW8uY3VycmVudFZhbHVlKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmxvYWRHcmlkKGNoYW5nZXMuc3JjLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFuZ2VzLml0ZW1zICYmIGNoYW5nZXMuaXRlbXMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoR3JpZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9vdGVyICYmXHJcbiAgICAgICAgKGNoYW5nZXMuY3JlYXRlVGV4dCAmJiBjaGFuZ2VzLmNyZWF0ZVRleHQuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICB0aGlzLmZvb3Rlci5jcmVhdGVUZXh0ID0gY2hhbmdlcy5jcmVhdGVUZXh0LmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0cyhbXSk7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcclxuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgocXVlcnk6IG9iamVjdCkgPT4gdGhpcy5yZWZyZXNoR3JpZChxdWVyeSkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkR3JpZCh0aGlzLnNyYyk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIGFjdGlvbkFsbG93ZWQoYWN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5pc0FjdGlvbkFsbG93ZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNBY3Rpb25BbGxvd2VkKGFjdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZXJyb3IuZW1pdChlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyB8fCBlcnJvci5tZXNzYWdlKSB7XHJcbiAgICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0KHtcclxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8IGVycm9yXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVmcmVzaEdyaWQocXVlcnk/OiBhbnkpIHtcclxuICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0cyhbXSk7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnkgfHwgdGhpcy5xdWVyeTtcclxuICAgIGlmICghdGhpcy5xdWVyeS5oYXNPd25Qcm9wZXJ0eSgnbGltaXQnKSkge1xyXG4gICAgICB0aGlzLnF1ZXJ5LmxpbWl0ID0gMTA7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucXVlcnkuaGFzT3duUHJvcGVydHkoJ3NraXAnKSkge1xyXG4gICAgICB0aGlzLnF1ZXJ5LnNraXAgPSAwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgRm9ybWlvLmNhY2hlID0ge307XHJcbiAgICBsZXQgbG9hZGVyID0gbnVsbDtcclxuICAgIGlmICh0aGlzLml0ZW1zKSB7XHJcbiAgICAgIGxvYWRlciA9IFByb21pc2UucmVzb2x2ZSh0aGlzLmJvZHkuc2V0Um93cyh0aGlzLnF1ZXJ5LCB0aGlzLml0ZW1zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2FkZXIgPSB0aGlzLmJvZHkubG9hZCh0aGlzLmZvcm1pbywgdGhpcy5xdWVyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxvYWRlci50aGVuKGluZm8gPT4ge1xyXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5vbkVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBzZXRQYWdlKG51bSA9IC0xKSB7XHJcbiAgICB0aGlzLnBhZ2UgPSBudW0gIT09IC0xID8gbnVtIDogdGhpcy5wYWdlO1xyXG4gICAgaWYgKCF0aGlzLnF1ZXJ5Lmhhc093blByb3BlcnR5KCdsaW1pdCcpKSB7XHJcbiAgICAgIHRoaXMucXVlcnkubGltaXQgPSAxMDtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5xdWVyeS5oYXNPd25Qcm9wZXJ0eSgnc2tpcCcpKSB7XHJcbiAgICAgIHRoaXMucXVlcnkuc2tpcCA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLnF1ZXJ5LnNraXAgPSB0aGlzLnBhZ2UgKiB0aGlzLnF1ZXJ5LmxpbWl0O1xyXG4gICAgdGhpcy5yZWZyZXNoR3JpZCgpO1xyXG4gIH1cclxuXHJcbiAgc29ydENvbHVtbihoZWFkZXI6IEdyaWRIZWFkZXIpIHtcclxuICAgIC8vIFJlc2V0IGFsbCBvdGhlciBjb2x1bW4gc29ydHMuXHJcbiAgICBlYWNoKHRoaXMuaGVhZGVyLmhlYWRlcnMsIChjb2w6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoY29sLmtleSAhPT0gaGVhZGVyLmtleSkge1xyXG4gICAgICAgIGNvbC5zb3J0ID0gJyc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc3dpdGNoIChoZWFkZXIuc29ydCkge1xyXG4gICAgICBjYXNlICdhc2MnOlxyXG4gICAgICAgIGhlYWRlci5zb3J0ID0gU29ydFR5cGUuREVTQztcclxuICAgICAgICB0aGlzLnF1ZXJ5LnNvcnQgPSAnLScgKyBoZWFkZXIua2V5O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICBoZWFkZXIuc29ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBkZWxldGUgdGhpcy5xdWVyeS5zb3J0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIHVuZGVmaW5lZDpcclxuICAgICAgICBoZWFkZXIuc29ydCA9IFNvcnRUeXBlLkFTQztcclxuICAgICAgICB0aGlzLnF1ZXJ5LnNvcnQgPSBoZWFkZXIua2V5O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoR3JpZCgpO1xyXG4gIH1cclxuXHJcbiAgcGFnZUNoYW5nZWQocGFnZTogYW55KSB7XHJcbiAgICB0aGlzLnNldFBhZ2UocGFnZS5wYWdlIC0gMSk7XHJcbiAgfVxyXG59XHJcbiIsIjxuZy10ZW1wbGF0ZSAjaGVhZGVyVGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNib2R5VGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNmb290ZXJUZW1wbGF0ZT48L25nLXRlbXBsYXRlPlxyXG48ZGl2IGNsYXNzPVwiZm9ybWlvLWdyaWRcIj5cclxuICA8Zm9ybWlvLWFsZXJ0cyBbYWxlcnRzXT1cImFsZXJ0c1wiPjwvZm9ybWlvLWFsZXJ0cz5cclxuICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1zdHJpcGVkIHRhYmxlLWhvdmVyXCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW5pdGlhbGl6ZWQgJiYgW2Zvb3RlclBvc2l0aW9ucy50b3AsIGZvb3RlclBvc2l0aW9ucy5ib3RoXS5pbmRleE9mKGZvb3RlclBvc2l0aW9uKSAhPT0gLTFcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXIudGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBwb3NpdGlvbjogZm9vdGVyUG9zaXRpb25zLnRvcCwgbGFiZWw6IGxhYmVsIH1cIj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImluaXRpYWxpemVkXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaGVhZGVyLnRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICA8Zm9ybWlvLWxvYWRlciBbaXNMb2FkaW5nXT1cImlzTG9hZGluZ1wiPjwvZm9ybWlvLWxvYWRlcj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbml0aWFsaXplZFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJvZHkudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbml0aWFsaXplZCAmJiBbZm9vdGVyUG9zaXRpb25zLmJvdHRvbSwgZm9vdGVyUG9zaXRpb25zLmJvdGhdLmluZGV4T2YoZm9vdGVyUG9zaXRpb24pICE9PSAtMVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3Rlci50ZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IHBvc2l0aW9uOiBmb290ZXJQb3NpdGlvbnMuYm90dG9tLCBsYWJlbDogbGFiZWwgfVwiPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC90YWJsZT5cclxuPC9kaXY+XHJcbiJdfQ==