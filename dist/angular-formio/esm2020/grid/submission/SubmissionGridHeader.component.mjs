import { Component } from '@angular/core';
import { Utils, Components } from 'formiojs';
import { GridHeaderComponent } from '../GridHeaderComponent';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SubmissionGridHeaderComponent extends GridHeaderComponent {
    load(formio, query, columns) {
        query = query || {};
        return formio.loadForm({ params: query }).then((form) => {
            this.headers = [];
            this.formComponents = new Map();
            this.setComponents(form.components);
            columns ? columns.forEach(column => {
                this.setHeader(this.getHeaderForColumn(column, this.formComponents.get(column.path)));
            }) : this.setComponentsHeaders(this.formComponents);
            return this.headers;
        });
    }
    setHeader(header) {
        this.headers.push(header);
    }
    getHeaderForColumn(column, component, sort) {
        return {
            label: column.label,
            key: column.path,
            sort: sort,
            component: component ? Components.create(component, null, null, true) : undefined,
            renderCell: column ? column.renderCell : undefined
        };
    }
    getHeaderForComponent(component, path, sort) {
        return {
            label: component.label,
            key: path,
            sort: sort,
            component: component ? Components.create(component, null, null, true) : undefined,
        };
    }
    // Set headers from components in case if columns are not provided
    setComponentsHeaders(components, sort) {
        components.forEach((component, path) => {
            if (component.input &&
                (!component.hasOwnProperty('tableView') || component.tableView)) {
                this.setHeader(this.getHeaderForComponent(component, path, sort));
            }
        });
    }
    // Map components
    setComponents(components) {
        Utils.eachComponent(components, (component, newPath) => {
            this.formComponents.set(`data.${newPath}`, component);
        });
    }
}
SubmissionGridHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionGridHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SubmissionGridHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionGridHeaderComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let header of headers\">\r\n        <a (click)=\"sort.emit(header)\">\r\n          {{ header.label }}&nbsp;<span [ngClass]=\"{'glyphicon-triangle-top': (header.sort === 'asc'), 'glyphicon-triangle-bottom': (header.sort === 'desc')}\" class=\"glyphicon\" *ngIf=\"header.sort\"></span>\r\n        </a>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionGridHeaderComponent, decorators: [{
            type: Component,
            args: [{ template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let header of headers\">\r\n        <a (click)=\"sort.emit(header)\">\r\n          {{ header.label }}&nbsp;<span [ngClass]=\"{'glyphicon-triangle-top': (header.sort === 'asc'), 'glyphicon-triangle-bottom': (header.sort === 'desc')}\" class=\"glyphicon\" *ngIf=\"header.sort\"></span>\r\n        </a>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VibWlzc2lvbkdyaWRIZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vZ3JpZC9zcmMvc3VibWlzc2lvbi9TdWJtaXNzaW9uR3JpZEhlYWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9zdWJtaXNzaW9uL1N1Ym1pc3Npb25HcmlkSGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQTBCLE1BQU0sVUFBVSxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7QUFTM0QsTUFBTSxPQUFPLDZCQUE4QixTQUFRLG1CQUFtQjtJQUtwRSxJQUFJLENBQUMsTUFBNEIsRUFBRSxLQUFXLEVBQUUsT0FBMkI7UUFDekUsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBZ0IsRUFBRSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQW1DLENBQUM7WUFDakUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUV0RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWtCO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFrQixFQUFFLFNBQW1DLEVBQUUsSUFBZTtRQUN6RixPQUFPO1lBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNoQixJQUFJLEVBQUUsSUFBSTtZQUNWLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFzQixDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ3RHLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxTQUFrQyxFQUFFLElBQVksRUFBRSxJQUFlO1FBQ3JGLE9BQU87WUFDTCxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7WUFDdEIsR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFzQixDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ3ZHLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0VBQWtFO0lBQ2xFLG9CQUFvQixDQUFDLFVBQWdELEVBQUUsSUFBZTtRQUNwRixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3JDLElBQ0UsU0FBUyxDQUFDLEtBQUs7Z0JBQ2YsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUMvRDtnQkFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbkU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsYUFBYSxDQUFDLFVBQVU7UUFDdEIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFrQyxFQUFFLE9BQWUsRUFBRSxFQUFFO1lBQ3RGLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsT0FBTyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzswSEExRFUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsMkVDWDFDLDBhQVdBOzJGREFhLDZCQUE2QjtrQkFIekMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1V0aWxzLCBDb21wb25lbnRzLCBFeHRlbmRlZENvbXBvbmVudFNjaGVtYX0gZnJvbSAnZm9ybWlvanMnO1xyXG5pbXBvcnQge0dyaWRIZWFkZXJDb21wb25lbnR9IGZyb20gJy4uL0dyaWRIZWFkZXJDb21wb25lbnQnO1xyXG5pbXBvcnQge0Zvcm1pb1Byb21pc2VTZXJ2aWNlfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQge0NvbXBvbmVudEluc3RhbmNlLCBGb3JtaW9Gb3JtfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQge0dyaWRDb2x1bW59IGZyb20gJy4uL3R5cGVzL2dyaWQtY29sdW1uJztcclxuaW1wb3J0IHtHcmlkSGVhZGVyLCBTb3J0VHlwZX0gZnJvbSAnLi4vdHlwZXMvZ3JpZC1oZWFkZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL1N1Ym1pc3Npb25HcmlkSGVhZGVyLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3VibWlzc2lvbkdyaWRIZWFkZXJDb21wb25lbnQgZXh0ZW5kcyBHcmlkSGVhZGVyQ29tcG9uZW50IHtcclxuXHJcbiAgLy8gTWFwIHN0cnVjdHVyZSB3aGVyZSB0aGUga2V5IGlzIHRoZSBwYXRoIGFuZCB0aGUgdmFsdWUgaXMgdGhlIGNvbXBvbmVudFxyXG4gIGZvcm1Db21wb25lbnRzOiBNYXA8c3RyaW5nLCBFeHRlbmRlZENvbXBvbmVudFNjaGVtYT47XHJcblxyXG4gIGxvYWQoZm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZSwgcXVlcnk/OiBhbnksIGNvbHVtbnM/OiBBcnJheTxHcmlkQ29sdW1uPikge1xyXG4gICAgcXVlcnkgPSBxdWVyeSB8fCB7fTtcclxuICAgIHJldHVybiBmb3JtaW8ubG9hZEZvcm0oe3BhcmFtczogcXVlcnl9KS50aGVuKChmb3JtOiBGb3JtaW9Gb3JtKSA9PiB7XHJcbiAgICAgIHRoaXMuaGVhZGVycyA9IFtdO1xyXG4gICAgICB0aGlzLmZvcm1Db21wb25lbnRzID0gbmV3IE1hcDxzdHJpbmcsIEV4dGVuZGVkQ29tcG9uZW50U2NoZW1hPigpO1xyXG4gICAgICB0aGlzLnNldENvbXBvbmVudHMoZm9ybS5jb21wb25lbnRzKTtcclxuICAgICAgY29sdW1ucyA/IGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXRIZWFkZXIodGhpcy5nZXRIZWFkZXJGb3JDb2x1bW4oY29sdW1uLCB0aGlzLmZvcm1Db21wb25lbnRzLmdldChjb2x1bW4ucGF0aCkpKTtcclxuICAgICAgICB9KSA6IHRoaXMuc2V0Q29tcG9uZW50c0hlYWRlcnModGhpcy5mb3JtQ29tcG9uZW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5oZWFkZXJzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRIZWFkZXIoaGVhZGVyOiBHcmlkSGVhZGVyKSB7XHJcbiAgICB0aGlzLmhlYWRlcnMucHVzaChoZWFkZXIpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SGVhZGVyRm9yQ29sdW1uKGNvbHVtbjogR3JpZENvbHVtbiwgY29tcG9uZW50PzogRXh0ZW5kZWRDb21wb25lbnRTY2hlbWEsIHNvcnQ/OiBTb3J0VHlwZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGFiZWw6IGNvbHVtbi5sYWJlbCxcclxuICAgICAga2V5OiBjb2x1bW4ucGF0aCxcclxuICAgICAgc29ydDogc29ydCxcclxuICAgICAgY29tcG9uZW50OiBjb21wb25lbnQgPyBDb21wb25lbnRzLmNyZWF0ZShjb21wb25lbnQsIG51bGwsIG51bGwsIHRydWUpIGFzIENvbXBvbmVudEluc3RhbmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICByZW5kZXJDZWxsOiBjb2x1bW4gPyBjb2x1bW4ucmVuZGVyQ2VsbCA6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldEhlYWRlckZvckNvbXBvbmVudChjb21wb25lbnQ6IEV4dGVuZGVkQ29tcG9uZW50U2NoZW1hLCBwYXRoOiBzdHJpbmcsIHNvcnQ/OiBTb3J0VHlwZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGFiZWw6IGNvbXBvbmVudC5sYWJlbCxcclxuICAgICAga2V5OiBwYXRoLFxyXG4gICAgICBzb3J0OiBzb3J0LFxyXG4gICAgICBjb21wb25lbnQ6IGNvbXBvbmVudCA/IENvbXBvbmVudHMuY3JlYXRlKGNvbXBvbmVudCwgbnVsbCwgbnVsbCwgdHJ1ZSkgYXMgQ29tcG9uZW50SW5zdGFuY2UgOiB1bmRlZmluZWQsXHJcbiAgICB9O1xyXG4gIH1cclxuICAvLyBTZXQgaGVhZGVycyBmcm9tIGNvbXBvbmVudHMgaW4gY2FzZSBpZiBjb2x1bW5zIGFyZSBub3QgcHJvdmlkZWRcclxuICBzZXRDb21wb25lbnRzSGVhZGVycyhjb21wb25lbnRzOiBNYXA8c3RyaW5nLCBFeHRlbmRlZENvbXBvbmVudFNjaGVtYT4sIHNvcnQ/OiBTb3J0VHlwZSkge1xyXG4gICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQsIHBhdGgpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvbXBvbmVudC5pbnB1dCAmJlxyXG4gICAgICAgICghY29tcG9uZW50Lmhhc093blByb3BlcnR5KCd0YWJsZVZpZXcnKSB8fCBjb21wb25lbnQudGFibGVWaWV3KVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnNldEhlYWRlcih0aGlzLmdldEhlYWRlckZvckNvbXBvbmVudChjb21wb25lbnQsIHBhdGgsIHNvcnQpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBNYXAgY29tcG9uZW50c1xyXG4gIHNldENvbXBvbmVudHMoY29tcG9uZW50cykge1xyXG4gICAgVXRpbHMuZWFjaENvbXBvbmVudChjb21wb25lbnRzLCAoY29tcG9uZW50OiBFeHRlbmRlZENvbXBvbmVudFNjaGVtYSwgbmV3UGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbXBvbmVudHMuc2V0KGBkYXRhLiR7bmV3UGF0aH1gLCBjb21wb25lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCI8bmctdGVtcGxhdGU+XHJcbiAgPHRoZWFkPlxyXG4gICAgPHRyPlxyXG4gICAgICA8dGggKm5nRm9yPVwibGV0IGhlYWRlciBvZiBoZWFkZXJzXCI+XHJcbiAgICAgICAgPGEgKGNsaWNrKT1cInNvcnQuZW1pdChoZWFkZXIpXCI+XHJcbiAgICAgICAgICB7eyBoZWFkZXIubGFiZWwgfX0mbmJzcDs8c3BhbiBbbmdDbGFzc109XCJ7J2dseXBoaWNvbi10cmlhbmdsZS10b3AnOiAoaGVhZGVyLnNvcnQgPT09ICdhc2MnKSwgJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nOiAoaGVhZGVyLnNvcnQgPT09ICdkZXNjJyl9XCIgY2xhc3M9XCJnbHlwaGljb25cIiAqbmdJZj1cImhlYWRlci5zb3J0XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC90aD5cclxuICAgIDwvdHI+XHJcbiAgPC90aGVhZD5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19