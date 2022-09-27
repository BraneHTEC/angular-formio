import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormManagerIndexComponent } from './index/index.component';
import { FormManagerCreateComponent } from './create/create.component';
import { FormManagerFormComponent } from './form/form.component';
import { FormManagerViewComponent } from './view/view.component';
import { FormManagerEditComponent } from './edit/edit.component';
import { FormManagerDeleteComponent } from './delete/delete.component';
import { SubmissionComponent } from './submission/submission/submission.component';
import { SubmissionEditComponent } from './submission/edit/edit.component';
import { SubmissionDeleteComponent } from './submission/delete/delete.component';
import { SubmissionViewComponent } from './submission/view/view.component';
import { SubmissionIndexComponent } from './submission/index/index.component';
import { FormManagerRoutes } from './form-manager.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { extendRouter } from '@formio/angular';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/modal";
import * as i2 from "ngx-bootstrap/pagination";
export class FormManagerModule {
    static forChild(config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    }
}
FormManagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormManagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, declarations: [FormManagerIndexComponent,
        FormManagerCreateComponent,
        FormManagerFormComponent,
        FormManagerViewComponent,
        FormManagerEditComponent,
        FormManagerDeleteComponent,
        SubmissionComponent,
        SubmissionEditComponent,
        SubmissionDeleteComponent,
        SubmissionViewComponent,
        SubmissionIndexComponent], imports: [CommonModule,
        FormioModule,
        RouterModule,
        FormsModule,
        FormioGrid, i1.ModalModule, i2.PaginationModule] });
FormManagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, imports: [CommonModule,
        FormioModule,
        RouterModule,
        FormsModule,
        FormioGrid,
        ModalModule.forRoot(),
        PaginationModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule,
                        FormsModule,
                        FormioGrid,
                        ModalModule.forRoot(),
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormManagerIndexComponent,
                        FormManagerCreateComponent,
                        FormManagerFormComponent,
                        FormManagerViewComponent,
                        FormManagerEditComponent,
                        FormManagerDeleteComponent,
                        SubmissionComponent,
                        SubmissionEditComponent,
                        SubmissionDeleteComponent,
                        SubmissionViewComponent,
                        SubmissionIndexComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL21hbmFnZXIvc3JjL2Zvcm0tbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUF5Qi9DLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUErQjtRQUM3QyxPQUFPLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUErQjtRQUM1QyxPQUFPLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs4R0FOVSxpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFiMUIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsdUJBQXVCO1FBQ3ZCLHdCQUF3QixhQW5CeEIsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osV0FBVztRQUNYLFVBQVU7K0dBa0JELGlCQUFpQixZQXRCMUIsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTsyRkFnQmpCLGlCQUFpQjtrQkF4QjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixXQUFXLENBQUMsT0FBTyxFQUFFO3dCQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7cUJBQzNCO29CQUNELFlBQVksRUFBRTt3QkFDWix5QkFBeUI7d0JBQ3pCLDBCQUEwQjt3QkFDMUIsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsMEJBQTBCO3dCQUMxQixtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIseUJBQXlCO3dCQUN6Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3QjtxQkFDekI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybWlvTW9kdWxlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvR3JpZCB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhci9ncmlkJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJJbmRleENvbXBvbmVudCB9IGZyb20gJy4vaW5kZXgvaW5kZXguY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Zvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L3ZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9lZGl0L2VkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJEZWxldGVDb21wb25lbnQgfSBmcm9tICcuL2RlbGV0ZS9kZWxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkNvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi9zdWJtaXNzaW9uL3N1Ym1pc3Npb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkVkaXRDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vZWRpdC9lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25EZWxldGVDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uVmlld0NvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi92aWV3L3ZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkluZGV4Q29tcG9uZW50IH0gZnJvbSAnLi9zdWJtaXNzaW9uL2luZGV4L2luZGV4LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyUm91dGVDb25maWcgfSBmcm9tICcuL2Zvcm0tbWFuYWdlci5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlclJvdXRlcyB9IGZyb20gJy4vZm9ybS1tYW5hZ2VyLnJvdXRlcyc7XHJcbmltcG9ydCB7IFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgeyBNb2RhbE1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvbW9kYWwnO1xyXG5pbXBvcnQgeyBleHRlbmRSb3V0ZXIgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1pb01vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybWlvR3JpZCxcclxuICAgIE1vZGFsTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIFBhZ2luYXRpb25Nb2R1bGUuZm9yUm9vdCgpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1NYW5hZ2VySW5kZXhDb21wb25lbnQsXHJcbiAgICBGb3JtTWFuYWdlckNyZWF0ZUNvbXBvbmVudCxcclxuICAgIEZvcm1NYW5hZ2VyRm9ybUNvbXBvbmVudCxcclxuICAgIEZvcm1NYW5hZ2VyVmlld0NvbXBvbmVudCxcclxuICAgIEZvcm1NYW5hZ2VyRWRpdENvbXBvbmVudCxcclxuICAgIEZvcm1NYW5hZ2VyRGVsZXRlQ29tcG9uZW50LFxyXG4gICAgU3VibWlzc2lvbkNvbXBvbmVudCxcclxuICAgIFN1Ym1pc3Npb25FZGl0Q29tcG9uZW50LFxyXG4gICAgU3VibWlzc2lvbkRlbGV0ZUNvbXBvbmVudCxcclxuICAgIFN1Ym1pc3Npb25WaWV3Q29tcG9uZW50LFxyXG4gICAgU3VibWlzc2lvbkluZGV4Q29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybU1hbmFnZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JDaGlsZChjb25maWc/OiBGb3JtTWFuYWdlclJvdXRlQ29uZmlnKTogYW55IHtcclxuICAgIHJldHVybiBleHRlbmRSb3V0ZXIoRm9ybU1hbmFnZXJNb2R1bGUsIGNvbmZpZywgRm9ybU1hbmFnZXJSb3V0ZXMpO1xyXG4gIH1cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBGb3JtTWFuYWdlclJvdXRlQ29uZmlnKTogYW55IHtcclxuICAgIHJldHVybiBleHRlbmRSb3V0ZXIoRm9ybU1hbmFnZXJNb2R1bGUsIGNvbmZpZywgRm9ybU1hbmFnZXJSb3V0ZXMpO1xyXG4gIH1cclxufVxyXG4iXX0=