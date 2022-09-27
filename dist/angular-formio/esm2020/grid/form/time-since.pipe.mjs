import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class TimeSince {
    transform(date) {
        const elapsed = (new Date().getTime() - new Date(date).getTime()) / 1000;
        let interval;
        if (interval >= 1) {
            return interval + ' year' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 2592000);
        if (interval >= 1) {
            return interval + ' month' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 86400);
        if (interval >= 1) {
            return interval + ' day' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 3600);
        if (interval >= 1) {
            return interval + ' hour' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 60);
        if (interval >= 1) {
            return interval + ' minute' + (interval > 1 ? 's' : '');
        }
        return Math.floor(elapsed) + ' second' + (elapsed > 1 ? 's' : '');
    }
}
TimeSince.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: TimeSince, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TimeSince.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: TimeSince, name: "timeSince" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: TimeSince, decorators: [{
            type: Pipe,
            args: [{
                    name: 'timeSince'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zaW5jZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vZ3JpZC9zcmMvZm9ybS90aW1lLXNpbmNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BELE1BQU0sT0FBTyxTQUFTO0lBQ3BCLFNBQVMsQ0FBQyxJQUFVO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6RSxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLFFBQVEsR0FBRyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBQztZQUNoQixPQUFPLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLFFBQVEsR0FBRyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLFFBQVEsR0FBRyxTQUFTLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7c0dBeEJVLFNBQVM7b0dBQVQsU0FBUzsyRkFBVCxTQUFTO2tCQUhyQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAndGltZVNpbmNlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZVNpbmNlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZWxhcHNlZCA9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKSkgLyAxMDAwO1xyXG4gICAgbGV0IGludGVydmFsO1xyXG4gICAgaWYgKGludGVydmFsID49IDEpIHtcclxuICAgICAgcmV0dXJuIGludGVydmFsICsgJyB5ZWFyJyArIChpbnRlcnZhbCA+IDEgPyAncycgOiAnJyk7XHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3IoZWxhcHNlZCAvIDI1OTIwMDApO1xyXG4gICAgaWYgKGludGVydmFsID49IDEpe1xyXG4gICAgICByZXR1cm4gaW50ZXJ2YWwgKyAnIG1vbnRoJyArIChpbnRlcnZhbCA+IDEgPyAncycgOiAnJyk7XHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3IoZWxhcHNlZCAvIDg2NDAwKTtcclxuICAgIGlmIChpbnRlcnZhbCA+PSAxKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcnZhbCArICcgZGF5JyArIChpbnRlcnZhbCA+IDEgPyAncycgOiAnJyk7XHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3IoZWxhcHNlZCAvIDM2MDApO1xyXG4gICAgaWYgKGludGVydmFsID49IDEpIHtcclxuICAgICAgcmV0dXJuIGludGVydmFsICsgJyBob3VyJyArIChpbnRlcnZhbCA+IDEgPyAncycgOiAnJyk7XHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbCA9IE1hdGguZmxvb3IoZWxhcHNlZCAvIDYwKTtcclxuICAgIGlmIChpbnRlcnZhbCA+PSAxKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcnZhbCArICcgbWludXRlJyArIChpbnRlcnZhbCA+IDEgPyAncycgOiAnJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihlbGFwc2VkKSArICcgc2Vjb25kJyArIChlbGFwc2VkID4gMSA/ICdzJyA6ICcnKTtcclxuICB9XHJcbn0iXX0=