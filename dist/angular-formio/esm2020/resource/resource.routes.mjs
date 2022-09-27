import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view/view.component';
import { FormioResourceEditComponent } from './edit/edit.component';
import { FormioResourceDeleteComponent } from './delete/delete.component';
import { FormioResourceCreateComponent } from './create/create.component';
import { FormioResourceIndexComponent } from './index/index.component';
export function FormioResourceRoutes(config) {
    return [
        {
            path: '',
            component: config && config.index ? config.index : FormioResourceIndexComponent
        },
        {
            path: 'new',
            component: config && config.create ? config.create : FormioResourceCreateComponent
        },
        {
            path: ':id',
            component: config && config.resource ? config.resource : FormioResourceComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config && config.view ? config.view : FormioResourceViewComponent
                },
                {
                    path: 'edit',
                    component: config && config.edit ? config.edit : FormioResourceEditComponent
                },
                {
                    path: 'delete',
                    component: config && config.delete ? config.delete : FormioResourceDeleteComponent
                }
            ]
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vcmVzb3VyY2Uvc3JjL3Jlc291cmNlLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RSxNQUFNLFVBQVUsb0JBQW9CLENBQUMsTUFBa0M7SUFDckUsT0FBTztRQUNMO1lBQ0UsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtTQUNoRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLEtBQUs7WUFDWCxTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtTQUNuRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLEtBQUs7WUFDWCxTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtZQUNoRixRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFNBQVMsRUFBRSxNQUFNO2lCQUNsQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtpQkFDN0U7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywyQkFBMkI7aUJBQzdFO2dCQUNEO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsNkJBQTZCO2lCQUNuRjthQUNGO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2VkaXQvZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZURlbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUluZGV4Q29tcG9uZW50IH0gZnJvbSAnLi9pbmRleC9pbmRleC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZVJvdXRlQ29uZmlnIH0gZnJvbSAnLi9yZXNvdXJjZS5jb25maWcnO1xyXG5leHBvcnQgZnVuY3Rpb24gRm9ybWlvUmVzb3VyY2VSb3V0ZXMoY29uZmlnPzogRm9ybWlvUmVzb3VyY2VSb3V0ZUNvbmZpZyk6IFJvdXRlcyB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtcclxuICAgICAgcGF0aDogJycsXHJcbiAgICAgIGNvbXBvbmVudDogY29uZmlnICYmIGNvbmZpZy5pbmRleCA/IGNvbmZpZy5pbmRleCA6IEZvcm1pb1Jlc291cmNlSW5kZXhDb21wb25lbnRcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHBhdGg6ICduZXcnLFxyXG4gICAgICBjb21wb25lbnQ6IGNvbmZpZyAmJiBjb25maWcuY3JlYXRlID8gY29uZmlnLmNyZWF0ZSA6IEZvcm1pb1Jlc291cmNlQ3JlYXRlQ29tcG9uZW50XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwYXRoOiAnOmlkJyxcclxuICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLnJlc291cmNlID8gY29uZmlnLnJlc291cmNlIDogRm9ybWlvUmVzb3VyY2VDb21wb25lbnQsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICByZWRpcmVjdFRvOiAndmlldycsXHJcbiAgICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJ3ZpZXcnLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLnZpZXcgPyBjb25maWcudmlldyA6IEZvcm1pb1Jlc291cmNlVmlld0NvbXBvbmVudFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJ2VkaXQnLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLmVkaXQgPyBjb25maWcuZWRpdCA6IEZvcm1pb1Jlc291cmNlRWRpdENvbXBvbmVudFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IGNvbmZpZyAmJiBjb25maWcuZGVsZXRlID8gY29uZmlnLmRlbGV0ZSA6IEZvcm1pb1Jlc291cmNlRGVsZXRlQ29tcG9uZW50XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXTtcclxufVxyXG4iXX0=