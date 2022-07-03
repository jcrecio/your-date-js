export const dtFactory = {
    create: () => {
        return {
        } as IDateTimeOperable
    }
};

export interface IDateTimeOperable {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
    hour: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
    timezone: ITimezone;
    // add(operand: IDateOperable): IDateOperable;
    // substract(operand: IDateOperable): IDateOperable;
}

export interface ITimezone {
    hour: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
}

export enum DateTimeParseError {
    InvalidDateTimeString = undefined
}