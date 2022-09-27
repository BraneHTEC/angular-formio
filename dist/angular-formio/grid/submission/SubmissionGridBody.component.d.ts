import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '@formio/angular';
import { GridHeader } from '../types/grid-header';
import { FormioSubmission } from '@formio/angular';
import * as i0 from "@angular/core";
export declare class SubmissionGridBodyComponent extends GridBodyComponent {
    load(formio: FormioPromiseService, query?: any): Promise<any[]>;
    /**
     * Render the cell data.
     *
     * @param submission
     * @param header
     * @return any
     */
    view(submission: FormioSubmission, header: GridHeader): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubmissionGridBodyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubmissionGridBodyComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=SubmissionGridBody.component.d.ts.map