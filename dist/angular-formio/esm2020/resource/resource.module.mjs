import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormioModule } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view/view.component';
import { FormioResourceEditComponent } from './edit/edit.component';
import { FormioResourceDeleteComponent } from './delete/delete.component';
import { FormioResourceCreateComponent } from './create/create.component';
import { FormioResourceIndexComponent } from './index/index.component';
import { FormioResourceRoutes } from './resource.routes';
import { extendRouter } from '@formio/angular';
import * as i0 from "@angular/core";
export class FormioResource {
    static forChild(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
}
FormioResource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormioResource.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, declarations: [FormioResourceComponent,
        FormioResourceCreateComponent,
        FormioResourceIndexComponent,
        FormioResourceViewComponent,
        FormioResourceEditComponent,
        FormioResourceDeleteComponent], imports: [CommonModule,
        FormioModule,
        FormioGrid,
        RouterModule] });
FormioResource.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, providers: [
        FormioAlerts
    ], imports: [CommonModule,
        FormioModule,
        FormioGrid,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        FormioGrid,
                        RouterModule
                    ],
                    declarations: [
                        FormioResourceComponent,
                        FormioResourceCreateComponent,
                        FormioResourceIndexComponent,
                        FormioResourceViewComponent,
                        FormioResourceEditComponent,
                        FormioResourceDeleteComponent
                    ],
                    providers: [
                        FormioAlerts
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vcmVzb3VyY2Uvc3JjL3Jlc291cmNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQXFCL0MsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFrQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBa0M7UUFDL0MsT0FBTyxZQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OzJHQU5VLGNBQWM7NEdBQWQsY0FBYyxpQkFYdkIsdUJBQXVCO1FBQ3ZCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiw2QkFBNkIsYUFYN0IsWUFBWTtRQUNaLFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWTs0R0FjSCxjQUFjLGFBSmQ7UUFDVCxZQUFZO0tBQ2IsWUFmQyxZQUFZO1FBQ1osWUFBWTtRQUNaLFVBQVU7UUFDVixZQUFZOzJGQWNILGNBQWM7a0JBbkIxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLDJCQUEyQjt3QkFDM0IsNkJBQTZCO3FCQUM5QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsWUFBWTtxQkFDYjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1pb01vZHVsZSB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCB7IEZvcm1pb0FsZXJ0cyB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCB7IEZvcm1pb0dyaWQgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXIvZ3JpZCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2VkaXQvZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZURlbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUluZGV4Q29tcG9uZW50IH0gZnJvbSAnLi9pbmRleC9pbmRleC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZVJvdXRlQ29uZmlnIH0gZnJvbSAnLi9yZXNvdXJjZS5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZVJvdXRlcyB9IGZyb20gJy4vcmVzb3VyY2Uucm91dGVzJztcclxuaW1wb3J0IHsgZXh0ZW5kUm91dGVyIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybWlvTW9kdWxlLFxyXG4gICAgRm9ybWlvR3JpZCxcclxuICAgIFJvdXRlck1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGb3JtaW9SZXNvdXJjZUNvbXBvbmVudCxcclxuICAgIEZvcm1pb1Jlc291cmNlQ3JlYXRlQ29tcG9uZW50LFxyXG4gICAgRm9ybWlvUmVzb3VyY2VJbmRleENvbXBvbmVudCxcclxuICAgIEZvcm1pb1Jlc291cmNlVmlld0NvbXBvbmVudCxcclxuICAgIEZvcm1pb1Jlc291cmNlRWRpdENvbXBvbmVudCxcclxuICAgIEZvcm1pb1Jlc291cmNlRGVsZXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEZvcm1pb0FsZXJ0c1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb1Jlc291cmNlIHtcclxuICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnPzogRm9ybWlvUmVzb3VyY2VSb3V0ZUNvbmZpZyk6IGFueSB7XHJcbiAgICByZXR1cm4gZXh0ZW5kUm91dGVyKEZvcm1pb1Jlc291cmNlLCBjb25maWcsIEZvcm1pb1Jlc291cmNlUm91dGVzKTtcclxuICB9XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogRm9ybWlvUmVzb3VyY2VSb3V0ZUNvbmZpZyk6IGFueSB7XHJcbiAgICByZXR1cm4gZXh0ZW5kUm91dGVyKEZvcm1pb1Jlc291cmNlLCBjb25maWcsIEZvcm1pb1Jlc291cmNlUm91dGVzKTtcclxuICB9XHJcbn1cclxuIl19