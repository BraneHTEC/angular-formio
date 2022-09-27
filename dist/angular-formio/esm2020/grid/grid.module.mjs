import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { FormioGridComponent } from './grid.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormGridHeaderComponent } from './form/FormGridHeader.component';
import { FormGridBodyComponent } from './form/FormGridBody.component';
import { FormGridFooterComponent } from './form/FormGridFooter.component';
import { SubmissionGridHeaderComponent } from './submission/SubmissionGridHeader.component';
import { SubmissionGridBodyComponent } from './submission/SubmissionGridBody.component';
import { SubmissionGridFooterComponent } from './submission/SubmissionGridFooter.component';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
import { GridFooterComponent } from './GridFooterComponent';
import { GridService } from './grid.service';
import { TimeSince } from './form/time-since.pipe';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/pagination";
export class FormioGrid {
}
FormioGrid.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioGrid, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormioGrid.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormioGrid, declarations: [FormioGridComponent,
        FormGridHeaderComponent,
        FormGridBodyComponent,
        FormGridFooterComponent,
        SubmissionGridHeaderComponent,
        SubmissionGridBodyComponent,
        SubmissionGridFooterComponent,
        GridHeaderComponent,
        GridBodyComponent,
        GridFooterComponent,
        TimeSince], imports: [CommonModule,
        FormsModule,
        FormioModule,
        RouterModule, i1.PaginationModule], exports: [FormioGridComponent] });
FormioGrid.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioGrid, providers: [
        FormioAlerts,
        GridService
    ], imports: [CommonModule,
        FormsModule,
        FormioModule,
        RouterModule,
        PaginationModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioGrid, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FormioModule,
                        RouterModule,
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormioGridComponent,
                        FormGridHeaderComponent,
                        FormGridBodyComponent,
                        FormGridFooterComponent,
                        SubmissionGridHeaderComponent,
                        SubmissionGridBodyComponent,
                        SubmissionGridFooterComponent,
                        GridHeaderComponent,
                        GridBodyComponent,
                        GridFooterComponent,
                        TimeSince
                    ],
                    exports: [
                        FormioGridComponent
                    ],
                    providers: [
                        FormioAlerts,
                        GridService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9ncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDNUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDNUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTs7O0FBOEJsRCxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVLGlCQXBCZixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsU0FBUyxhQWpCVCxZQUFZO1FBQ1osV0FBVztRQUNYLFlBQVk7UUFDWixZQUFZLGtDQWlCWixtQkFBbUI7d0dBT2QsVUFBVSxhQUxSO1FBQ1AsWUFBWTtRQUNaLFdBQVc7S0FDZCxZQXpCRyxZQUFZO1FBQ1osV0FBVztRQUNYLFlBQVk7UUFDWixZQUFZO1FBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzJGQXVCckIsVUFBVTtrQkE3QnRCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3FCQUM3QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsbUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjt3QkFDckIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDJCQUEyQjt3QkFDM0IsNkJBQTZCO3dCQUM3QixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsbUJBQW1CO3dCQUNuQixTQUFTO3FCQUNaO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7cUJBQ3RCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7cUJBQ2Q7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvTW9kdWxlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wYWdpbmF0aW9uJztcclxuaW1wb3J0IHsgRm9ybUdyaWRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0vRm9ybUdyaWRIZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUdyaWRCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL0Zvcm1HcmlkQm9keS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtR3JpZEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS9Gb3JtR3JpZEZvb3Rlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uR3JpZEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi9TdWJtaXNzaW9uR3JpZEhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uR3JpZEJvZHlDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25HcmlkRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zdWJtaXNzaW9uL1N1Ym1pc3Npb25HcmlkRm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL0dyaWRIZWFkZXJDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkQm9keUNvbXBvbmVudCB9IGZyb20gJy4vR3JpZEJvZHlDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9HcmlkRm9vdGVyQ29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuL2dyaWQuc2VydmljZSc7XHJcbmltcG9ydCB7IFRpbWVTaW5jZSB9IGZyb20gJy4vZm9ybS90aW1lLXNpbmNlLnBpcGUnXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEZvcm1pb01vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgUGFnaW5hdGlvbk1vZHVsZS5mb3JSb290KClcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBGb3JtaW9HcmlkQ29tcG9uZW50LFxyXG4gICAgICAgIEZvcm1HcmlkSGVhZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEZvcm1HcmlkQm9keUNvbXBvbmVudCxcclxuICAgICAgICBGb3JtR3JpZEZvb3RlckNvbXBvbmVudCxcclxuICAgICAgICBTdWJtaXNzaW9uR3JpZEhlYWRlckNvbXBvbmVudCxcclxuICAgICAgICBTdWJtaXNzaW9uR3JpZEJvZHlDb21wb25lbnQsXHJcbiAgICAgICAgU3VibWlzc2lvbkdyaWRGb290ZXJDb21wb25lbnQsXHJcbiAgICAgICAgR3JpZEhlYWRlckNvbXBvbmVudCxcclxuICAgICAgICBHcmlkQm9keUNvbXBvbmVudCxcclxuICAgICAgICBHcmlkRm9vdGVyQ29tcG9uZW50LFxyXG4gICAgICAgIFRpbWVTaW5jZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBGb3JtaW9HcmlkQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRm9ybWlvQWxlcnRzLFxyXG4gICAgICAgIEdyaWRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9HcmlkIHt9XHJcbiJdfQ==