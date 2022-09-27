import { Component } from '@angular/core';
import { get } from 'lodash';
import { GridBodyComponent } from '../GridBodyComponent';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SubmissionGridBodyComponent extends GridBodyComponent {
    load(formio, query) {
        query = query || {};
        return formio.loadSubmissions({ params: query })
            .then((submissions) => this.setRows(query, submissions));
    }
    /**
     * Render the cell data.
     *
     * @param submission
     * @param header
     * @return any
     */
    view(submission, header) {
        const cellValue = get(submission, header.key);
        if (header.renderCell) {
            return header.renderCell(cellValue, header.component);
        }
        else {
            if (header.component) {
                if (header.component.getView) {
                    return header.component.getView(cellValue);
                }
                return header.component.asString(cellValue);
            }
            else {
                return cellValue.toString();
            }
        }
    }
}
SubmissionGridBodyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionGridBodyComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SubmissionGridBodyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionGridBodyComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <tbody>\r\n    <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\">\r\n      <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionGridBodyComponent, decorators: [{
            type: Component,
            args: [{ template: "<ng-template>\r\n  <tbody>\r\n    <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\">\r\n      <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL3N1Ym1pc3Npb24vU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL3N1Ym1pc3Npb24vU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFRLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBT3pELE1BQU0sT0FBTywyQkFBNEIsU0FBUSxpQkFBaUI7SUFDaEUsSUFBSSxDQUFDLE1BQTRCLEVBQUUsS0FBVztRQUM1QyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwQixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDN0MsSUFBSSxDQUFDLENBQUMsV0FBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBSSxDQUFDLFVBQTRCLEVBQUUsTUFBa0I7UUFDbkQsTUFBTSxTQUFTLEdBQVEsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ3JCLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQzVCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0wsT0FBTyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDN0I7U0FDRjtJQUNILENBQUM7O3dIQTVCVSwyQkFBMkI7NEdBQTNCLDJCQUEyQiwyRUNUeEMsNFBBT0E7MkZERWEsMkJBQTJCO2tCQUh2QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVhY2gsIGdldCB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IEdyaWRCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi4vR3JpZEJvZHlDb21wb25lbnQnO1xyXG5pbXBvcnQge0Zvcm1pb1Byb21pc2VTZXJ2aWNlfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBHcmlkSGVhZGVyIH0gZnJvbSAnLi4vdHlwZXMvZ3JpZC1oZWFkZXInO1xyXG5pbXBvcnQge0Zvcm1pb1N1Ym1pc3Npb259IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9TdWJtaXNzaW9uR3JpZEJvZHkuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdWJtaXNzaW9uR3JpZEJvZHlDb21wb25lbnQgZXh0ZW5kcyBHcmlkQm9keUNvbXBvbmVudCB7XHJcbiAgbG9hZChmb3JtaW86IEZvcm1pb1Byb21pc2VTZXJ2aWNlLCBxdWVyeT86IGFueSkge1xyXG4gICAgcXVlcnkgPSBxdWVyeSB8fCB7fTtcclxuICAgIHJldHVybiBmb3JtaW8ubG9hZFN1Ym1pc3Npb25zKHsgcGFyYW1zOiBxdWVyeSB9KVxyXG4gICAgICAudGhlbigoc3VibWlzc2lvbnM6IGFueSkgPT4gdGhpcy5zZXRSb3dzKHF1ZXJ5LCBzdWJtaXNzaW9ucykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBjZWxsIGRhdGEuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3VibWlzc2lvblxyXG4gICAqIEBwYXJhbSBoZWFkZXJcclxuICAgKiBAcmV0dXJuIGFueVxyXG4gICAqL1xyXG4gIHZpZXcoc3VibWlzc2lvbjogRm9ybWlvU3VibWlzc2lvbiwgaGVhZGVyOiBHcmlkSGVhZGVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNlbGxWYWx1ZTogYW55ID0gZ2V0KHN1Ym1pc3Npb24sIGhlYWRlci5rZXkpO1xyXG4gICAgaWYgKGhlYWRlci5yZW5kZXJDZWxsKSB7XHJcbiAgICAgIHJldHVybiBoZWFkZXIucmVuZGVyQ2VsbChjZWxsVmFsdWUsIGhlYWRlci5jb21wb25lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGhlYWRlci5jb21wb25lbnQpIHtcclxuICAgICAgICBpZiAoaGVhZGVyLmNvbXBvbmVudC5nZXRWaWV3KSB7XHJcbiAgICAgICAgICByZXR1cm4gaGVhZGVyLmNvbXBvbmVudC5nZXRWaWV3KGNlbGxWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZWFkZXIuY29tcG9uZW50LmFzU3RyaW5nKGNlbGxWYWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGNlbGxWYWx1ZS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxuZy10ZW1wbGF0ZT5cclxuICA8dGJvZHk+XHJcbiAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzXCIgKGNsaWNrKT1cIm9uUm93U2VsZWN0KCRldmVudCwgcm93KVwiPlxyXG4gICAgICA8dGQgKm5nRm9yPVwibGV0IHJvd0hlYWRlciBvZiBoZWFkZXIuaGVhZGVyc1wiIFtpbm5lckhUTUxdPVwidmlldyhyb3csIHJvd0hlYWRlcilcIj48L3RkPlxyXG4gICAgPC90cj5cclxuICA8L3Rib2R5PlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=