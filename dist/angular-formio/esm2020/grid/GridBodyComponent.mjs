import { Input, Output, EventEmitter, ViewChild, TemplateRef, Component } from '@angular/core';
import { each, clone } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "./grid.service";
export class GridBodyComponent {
    constructor(service) {
        this.service = service;
        this.firstItem = 0;
        this.lastItem = 0;
        this.skip = 0;
        this.limit = 0;
        this.total = 0;
        this.rowSelect = new EventEmitter();
        this.rowAction = new EventEmitter();
        this.loading = true;
    }
    load(formio, query) {
        return formio.loadForm(query);
    }
    onRowSelect(event, row) {
        event.preventDefault();
        this.rowSelect.emit(row);
    }
    onRowAction(event, row, action) {
        event.preventDefault();
        this.rowAction.emit({ row, action });
    }
    /**
     * Set the rows for this Grid body.
     *
     * @param query
     * @param items
     * @return any
     */
    setRows(query, items) {
        this.rows = [];
        if (typeof items !== 'object') {
            this.firstItem = 0;
            this.lastItem = 0;
            this.total = 0;
            this.skip = 0;
            this.loading = false;
            this.service.setRows(this.rows);
            return this.rows;
        }
        this.firstItem = query.skip + 1;
        this.lastItem = this.firstItem + items.length - 1;
        if (this.lastItem === 0) {
            this.firstItem = 0;
        }
        this.total = items.serverCount;
        this.limit = query.limit;
        this.skip = Math.floor(items.skip / query.limit) + 1;
        this.loading = false;
        each(items, (item) => {
            this.rows.push(clone(item));
        });
        this.service.setRows(this.rows);
        return this.rows;
    }
}
GridBodyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GridBodyComponent, deps: [{ token: i1.GridService }], target: i0.ɵɵFactoryTarget.Component });
GridBodyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: GridBodyComponent, selector: "ng-component", inputs: { header: "header", actionAllowed: "actionAllowed" }, outputs: { rowSelect: "rowSelect", rowAction: "rowAction" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: GridBodyComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i1.GridService }]; }, propDecorators: { header: [{
                type: Input
            }], actionAllowed: [{
                type: Input
            }], rowSelect: [{
                type: Output
            }], rowAction: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEJvZHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9HcmlkQm9keUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7OztBQVFyQyxNQUFNLE9BQU8saUJBQWlCO0lBYTVCLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFMaEMsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFVBQUssR0FBRyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsTUFBNEIsRUFBRSxLQUFXO1FBQzVDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHO1FBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTTtRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsT0FBTyxDQUFDLEtBQVUsRUFBRSxLQUFVO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7OEdBckVVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHlOQUtqQixXQUFXLDhEQVBaLEVBQUU7MkZBRUQsaUJBQWlCO2tCQUg3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO2lCQUNiO2tHQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNJLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csU0FBUztzQkFBbEIsTUFBTTtnQkFDaUMsUUFBUTtzQkFBL0MsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZWFjaCwgY2xvbmUgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBHcmlkSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9HcmlkSGVhZGVyQ29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuL2dyaWQuc2VydmljZSc7XHJcbmltcG9ydCB7Rm9ybWlvUHJvbWlzZVNlcnZpY2V9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRCb2R5Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBoZWFkZXI6IEdyaWRIZWFkZXJDb21wb25lbnQ7XHJcbiAgQElucHV0KCkgYWN0aW9uQWxsb3dlZDogYW55O1xyXG4gIEBPdXRwdXQoKSByb3dTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIEBPdXRwdXQoKSByb3dBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBwdWJsaWMgcm93czogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgbG9hZGluZzogQm9vbGVhbjtcclxuICBwdWJsaWMgZmlyc3RJdGVtID0gMDtcclxuICBwdWJsaWMgbGFzdEl0ZW0gPSAwO1xyXG4gIHB1YmxpYyBza2lwID0gMDtcclxuICBwdWJsaWMgbGltaXQgPSAwO1xyXG4gIHB1YmxpYyB0b3RhbCA9IDA7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHNlcnZpY2U6IEdyaWRTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnJvd1NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMucm93QWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGxvYWQoZm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZSwgcXVlcnk/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIGZvcm1pby5sb2FkRm9ybShxdWVyeSk7XHJcbiAgfVxyXG5cclxuICBvblJvd1NlbGVjdChldmVudCwgcm93KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5yb3dTZWxlY3QuZW1pdChyb3cpO1xyXG4gIH1cclxuXHJcbiAgb25Sb3dBY3Rpb24oZXZlbnQsIHJvdywgYWN0aW9uKSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5yb3dBY3Rpb24uZW1pdCh7IHJvdywgYWN0aW9uIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSByb3dzIGZvciB0aGlzIEdyaWQgYm9keS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBxdWVyeVxyXG4gICAqIEBwYXJhbSBpdGVtc1xyXG4gICAqIEByZXR1cm4gYW55XHJcbiAgICovXHJcbiAgc2V0Um93cyhxdWVyeTogYW55LCBpdGVtczogYW55KSB7XHJcbiAgICB0aGlzLnJvd3MgPSBbXTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGl0ZW1zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmZpcnN0SXRlbSA9IDA7XHJcbiAgICAgIHRoaXMubGFzdEl0ZW0gPSAwO1xyXG4gICAgICB0aGlzLnRvdGFsID0gMDtcclxuICAgICAgdGhpcy5za2lwID0gMDtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2VydmljZS5zZXRSb3dzKHRoaXMucm93cyk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpcy5yb3dzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlyc3RJdGVtID0gcXVlcnkuc2tpcCArIDE7XHJcbiAgICB0aGlzLmxhc3RJdGVtID0gdGhpcy5maXJzdEl0ZW0gKyBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgaWYgKHRoaXMubGFzdEl0ZW0gPT09IDApIHtcclxuICAgICAgdGhpcy5maXJzdEl0ZW0gPSAwO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b3RhbCA9IGl0ZW1zLnNlcnZlckNvdW50O1xyXG4gICAgdGhpcy5saW1pdCA9IHF1ZXJ5LmxpbWl0O1xyXG4gICAgdGhpcy5za2lwID0gTWF0aC5mbG9vcihpdGVtcy5za2lwIC8gcXVlcnkubGltaXQpICsgMTtcclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgZWFjaChpdGVtcywgKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnJvd3MucHVzaChjbG9uZShpdGVtKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VydmljZS5zZXRSb3dzKHRoaXMucm93cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm93cztcclxuICB9XHJcbn1cclxuIl19