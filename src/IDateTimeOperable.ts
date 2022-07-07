export interface IDateTimeOperable {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
    hour: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
    timezone: ITimezone;
    originalValue: string | undefined;

    add(operand: IDateTimeOperable): IDateTimeOperable;
    substract(operand: IDateTimeOperable): IDateTimeOperable;
}

export interface ITimezone {
    hour: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
}

export enum DateTimeParseError {
    InvalidDateTimeString = undefined
}