import { IDateTimeOperable, ITimezone } from "./IDateTimeOperable";

export class DateTime implements IDateTimeOperable {
    constructor() {
        this.year = 0;
        this.month = 0;
        this.day = 0;
        this.hour = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timezone = {
            hour: 0,
            minutes: 0,
            seconds: 0
        } as ITimezone;
    }
    year: number;
    month: number;
    day: number;
    hour: number;
    minutes: number;
    seconds: number;
    timezone: ITimezone;
    originalValue: string;
    add(operand: IDateTimeOperable): IDateTimeOperable {
        this.year += operand.year;
        this.month += operand.month;
        this.day += operand.day;
        this.hour += operand.hour;
        this.minutes += operand.minutes;
        this.seconds += operand.seconds;
        this.timezone.hour += operand.hour;
        this.timezone.minutes += operand.minutes;
        this.timezone.seconds += operand.seconds;
        return this;
    }
    substract(operand: IDateTimeOperable): IDateTimeOperable {
        this.year -= operand.year;
        this.month -= operand.month;
        this.day -= operand.day;
        this.hour -= operand.hour;
        this.minutes -= operand.minutes;
        this.seconds -= operand.seconds;
        this.timezone.hour -= operand.timezone.hour;
        this.timezone.minutes -= operand.timezone.minutes;
        this.timezone.seconds -= operand.timezone.seconds;        
        return this;    
    }
}