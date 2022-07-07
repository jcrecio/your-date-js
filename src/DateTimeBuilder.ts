import { DateTime } from "./DateTime";
import { IDateTimeOperable, ITimezone } from "./IDateTimeOperable";

export class DateTimeBuilder {
    private dateUnderCreation: IDateTimeOperable;
    /**
     *
     */
    constructor() {
        this.dateUnderCreation = new DateTime();
    }
    public build(): IDateTimeOperable {
        const result = this.dateUnderCreation;
        this.dateUnderCreation = new DateTime();
        return result;
    }
    public setYear(year: number){
        this.dateUnderCreation.year = year;
        return this;
    }
    public setMonth(month: number){
        this.dateUnderCreation.month = month;
        return this;
    }
    public setDay(day: number){
        this.dateUnderCreation.day = day;
        return this;
    }
    public setHour(hour: number){
        this.dateUnderCreation.hour = hour;
        return this;
    }
    public setMinutes(minutes: number){
        this.dateUnderCreation.minutes = minutes;
        return this;
    }
    public setSeconds(seconds: number){
        this.dateUnderCreation.seconds = seconds;
        return this;
    }
    public setTimezoneHour(hour: number){
        this.dateUnderCreation.timezone.hour = hour;
        return this;
    }
    public setTimezoneMinutes(minutes: number){
        this.dateUnderCreation.timezone.minutes = minutes;
        return this;
    }
    public setTimezoneSeconds(seconds: number){
        this.dateUnderCreation.timezone.seconds = seconds;
        return this;
    }
    public setTimezone(timezone: ITimezone){
        this.dateUnderCreation.timezone = timezone;
        return this;
    }
}