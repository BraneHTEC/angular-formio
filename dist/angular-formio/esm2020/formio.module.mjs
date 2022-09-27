import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { ParseHtmlContentPipe } from './components/alerts/parse-html-content.pipe';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';
import { FormioBaseComponent } from './FormioBaseComponent';
import * as i0 from "@angular/core";
export class FormioModule {
}
FormioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, declarations: [FormioComponent,
        FormioBaseComponent,
        FormBuilderComponent,
        FormioLoaderComponent,
        FormioAlertsComponent,
        ParseHtmlContentPipe], imports: [CommonModule], exports: [FormioComponent,
        FormBuilderComponent,
        FormioLoaderComponent,
        FormioAlertsComponent] });
FormioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, providers: [
        FormioAlerts,
        CustomTagsService
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormioComponent,
                        FormioBaseComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent,
                        ParseHtmlContentPipe
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        FormioComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent
                    ],
                    providers: [
                        FormioAlerts,
                        CustomTagsService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3NyYy9mb3JtaW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBeUI1RCxNQUFNLE9BQU8sWUFBWTs7eUdBQVosWUFBWTswR0FBWixZQUFZLGlCQXJCakIsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixvQkFBb0IsYUFHcEIsWUFBWSxhQUdaLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLHFCQUFxQjswR0FPaEIsWUFBWSxhQUxWO1FBQ1AsWUFBWTtRQUNaLGlCQUFpQjtLQUNwQixZQVhHLFlBQVk7MkZBYVAsWUFBWTtrQkF2QnhCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixvQkFBb0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIscUJBQXFCO3dCQUNyQixxQkFBcUI7cUJBQ3hCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGlCQUFpQjtxQkFDcEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3JtaW9Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWlvL2Zvcm1pby5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtYnVpbGRlci9mb3JtYnVpbGRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9BbGVydHMgfSBmcm9tICcuL2NvbXBvbmVudHMvYWxlcnRzL2Zvcm1pby5hbGVydHMnO1xyXG5pbXBvcnQgeyBQYXJzZUh0bWxDb250ZW50UGlwZSB9IGZyb20gJy4vY29tcG9uZW50cy9hbGVydHMvcGFyc2UtaHRtbC1jb250ZW50LnBpcGUnO1xyXG5pbXBvcnQgeyBGb3JtaW9BbGVydHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWxlcnRzL2Zvcm1pby5hbGVydHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybWlvTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRlci9mb3JtaW8ubG9hZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEN1c3RvbVRhZ3NTZXJ2aWNlIH0gZnJvbSAnLi9jdXN0b20tY29tcG9uZW50L2N1c3RvbS10YWdzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtaW9CYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9Gb3JtaW9CYXNlQ29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBGb3JtaW9Db21wb25lbnQsXHJcbiAgICAgICAgRm9ybWlvQmFzZUNvbXBvbmVudCxcclxuICAgICAgICBGb3JtQnVpbGRlckNvbXBvbmVudCxcclxuICAgICAgICBGb3JtaW9Mb2FkZXJDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybWlvQWxlcnRzQ29tcG9uZW50LFxyXG4gICAgICAgIFBhcnNlSHRtbENvbnRlbnRQaXBlXHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBGb3JtaW9Db21wb25lbnQsXHJcbiAgICAgICAgRm9ybUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybWlvTG9hZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEZvcm1pb0FsZXJ0c0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEZvcm1pb0FsZXJ0cyxcclxuICAgICAgICBDdXN0b21UYWdzU2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvTW9kdWxlIHt9XHJcbiJdfQ==