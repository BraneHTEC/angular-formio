import { FormManagerIndexComponent } from './index/index.component';
import { FormManagerCreateComponent } from './create/create.component';
import { FormManagerFormComponent } from './form/form.component';
import { FormManagerViewComponent } from './view/view.component';
import { FormManagerEditComponent } from './edit/edit.component';
import { FormManagerDeleteComponent } from './delete/delete.component';
import { SubmissionEditComponent } from './submission/edit/edit.component';
import { SubmissionDeleteComponent } from './submission/delete/delete.component';
import { SubmissionViewComponent } from './submission/view/view.component';
import { SubmissionIndexComponent } from './submission/index/index.component';
import { SubmissionComponent } from './submission/submission/submission.component';
export function FormManagerRoutes(config) {
    return [
        {
            path: '',
            component: config && config.formIndex ? config.formIndex : FormManagerIndexComponent
        },
        {
            path: 'create',
            component: config && config.formCreate ? config.formCreate : FormManagerCreateComponent
        },
        {
            path: ':id',
            component: config && config.form ? config.form : FormManagerFormComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config && config.formView ? config.formView : FormManagerViewComponent
                },
                {
                    path: 'edit',
                    component: config && config.formEdit ? config.formEdit : FormManagerEditComponent
                },
                {
                    path: 'delete',
                    component: config && config.formDelete ? config.formDelete : FormManagerDeleteComponent
                },
                {
                    path: 'submission',
                    component: config && config.submissionIndex ? config.submissionIndex : SubmissionIndexComponent
                },
                {
                    path: 'submission/:id',
                    component: config && config.submission ? config.submission : SubmissionComponent,
                    children: [
                        {
                            path: '',
                            redirectTo: 'view',
                            pathMatch: 'full'
                        },
                        {
                            path: 'view',
                            component: config && config.submissionView ? config.submissionView : SubmissionViewComponent
                        },
                        {
                            path: 'edit',
                            component: config && config.submissionEdit ? config.submissionEdit : SubmissionEditComponent
                        },
                        {
                            path: 'delete',
                            component: config && config.submissionDelete ? config.submissionDelete : SubmissionDeleteComponent
                        }
                    ]
                }
            ]
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tYW5hZ2VyLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL21hbmFnZXIvc3JjL2Zvcm0tbWFuYWdlci5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDakYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFbkYsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQStCO0lBQy9ELE9BQU87UUFDTDtZQUNFLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7U0FDckY7UUFDRDtZQUNFLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQywwQkFBMEI7U0FDeEY7UUFDRDtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7WUFDekUsUUFBUSxFQUFFO2dCQUNSO29CQUNFLElBQUksRUFBRSxFQUFFO29CQUNSLFVBQVUsRUFBRSxNQUFNO29CQUNsQixTQUFTLEVBQUUsTUFBTTtpQkFDbEI7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7aUJBQ2xGO2dCQUNEO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO2lCQUNsRjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsUUFBUTtvQkFDZCxTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtpQkFDeEY7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO2lCQUNoRztnQkFDRDtvQkFDRSxJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtvQkFDaEYsUUFBUSxFQUFFO3dCQUNSOzRCQUNFLElBQUksRUFBRSxFQUFFOzRCQUNSLFVBQVUsRUFBRSxNQUFNOzRCQUNsQixTQUFTLEVBQUUsTUFBTTt5QkFDbEI7d0JBQ0Q7NEJBQ0UsSUFBSSxFQUFFLE1BQU07NEJBQ1osU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7eUJBQzdGO3dCQUNEOzRCQUNFLElBQUksRUFBRSxNQUFNOzRCQUNaLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO3lCQUM3Rjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyx5QkFBeUI7eUJBQ25HO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJJbmRleENvbXBvbmVudCB9IGZyb20gJy4vaW5kZXgvaW5kZXguY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Zvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L3ZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9lZGl0L2VkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJEZWxldGVDb21wb25lbnQgfSBmcm9tICcuL2RlbGV0ZS9kZWxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkVkaXRDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vZWRpdC9lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25EZWxldGVDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uVmlld0NvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi92aWV3L3ZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkluZGV4Q29tcG9uZW50IH0gZnJvbSAnLi9zdWJtaXNzaW9uL2luZGV4L2luZGV4LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25Db21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vc3VibWlzc2lvbi9zdWJtaXNzaW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyUm91dGVDb25maWcgfSBmcm9tICcuL2Zvcm0tbWFuYWdlci5jb25maWcnO1xyXG5leHBvcnQgZnVuY3Rpb24gRm9ybU1hbmFnZXJSb3V0ZXMoY29uZmlnPzogRm9ybU1hbmFnZXJSb3V0ZUNvbmZpZyk6IFJvdXRlcyB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtcclxuICAgICAgcGF0aDogJycsXHJcbiAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5mb3JtSW5kZXggPyBjb25maWcuZm9ybUluZGV4IDogRm9ybU1hbmFnZXJJbmRleENvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcGF0aDogJ2NyZWF0ZScsXHJcbiAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5mb3JtQ3JlYXRlID8gY29uZmlnLmZvcm1DcmVhdGUgOiBGb3JtTWFuYWdlckNyZWF0ZUNvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcGF0aDogJzppZCcsXHJcbiAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5mb3JtID8gY29uZmlnLmZvcm0gOiBGb3JtTWFuYWdlckZvcm1Db21wb25lbnQsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICByZWRpcmVjdFRvOiAndmlldycsXHJcbiAgICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJ3ZpZXcnLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLmZvcm1WaWV3ID8gY29uZmlnLmZvcm1WaWV3IDogRm9ybU1hbmFnZXJWaWV3Q29tcG9uZW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYXRoOiAnZWRpdCcsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IGNvbmZpZyAmJiBjb25maWcuZm9ybUVkaXQgPyBjb25maWcuZm9ybUVkaXQgOiBGb3JtTWFuYWdlckVkaXRDb21wb25lbnRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhdGg6ICdkZWxldGUnLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLmZvcm1EZWxldGUgPyBjb25maWcuZm9ybURlbGV0ZSA6IEZvcm1NYW5hZ2VyRGVsZXRlQ29tcG9uZW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYXRoOiAnc3VibWlzc2lvbicsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IGNvbmZpZyAmJiBjb25maWcuc3VibWlzc2lvbkluZGV4ID8gY29uZmlnLnN1Ym1pc3Npb25JbmRleCA6IFN1Ym1pc3Npb25JbmRleENvbXBvbmVudFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJ3N1Ym1pc3Npb24vOmlkJyxcclxuICAgICAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5zdWJtaXNzaW9uID8gY29uZmlnLnN1Ym1pc3Npb24gOiBTdWJtaXNzaW9uQ29tcG9uZW50LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgICAgICAgIHJlZGlyZWN0VG86ICd2aWV3JyxcclxuICAgICAgICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcGF0aDogJ3ZpZXcnLFxyXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5zdWJtaXNzaW9uVmlldyA/IGNvbmZpZy5zdWJtaXNzaW9uVmlldyA6IFN1Ym1pc3Npb25WaWV3Q29tcG9uZW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBwYXRoOiAnZWRpdCcsXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLnN1Ym1pc3Npb25FZGl0ID8gY29uZmlnLnN1Ym1pc3Npb25FZGl0IDogU3VibWlzc2lvbkVkaXRDb21wb25lbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHBhdGg6ICdkZWxldGUnLFxyXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5zdWJtaXNzaW9uRGVsZXRlID8gY29uZmlnLnN1Ym1pc3Npb25EZWxldGUgOiBTdWJtaXNzaW9uRGVsZXRlQ29tcG9uZW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdO1xyXG59XHJcbiJdfQ==