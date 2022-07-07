import { DateTimeParseError, IDateTimeOperable } from "./IDateTimeOperable";
const regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

export interface DateParseResponse extends IDateTimeOperable{
    error: DateTimeParseError;
}

export class DateTimeParser {
    parse(input: string): DateParseResponse {
        const matches = regex.exec(input);
        if (matches === null) {
            return { error: DateTimeParseError.InvalidDateTimeString } as DateParseResponse;
        }

        let minutes = 0, seconds = 0;
        const minutesSplit = matches[16]?.split(':') ?? undefined;
        if (minutesSplit?.length > 1) minutes = parseInt(minutesSplit[1]);
        const secondsSplit = matches[19]?.split(':') ?? undefined;
        if (secondsSplit?.length > 1) seconds = parseInt(secondsSplit[1]);

        return {
            year: parseInt(matches[1]),
            month: parseInt(matches[4]),
            day: parseInt(matches[7]),
            hour: parseInt(matches[15]),
            minutes: minutes,
            seconds: seconds,
            timezone: {
                hour: parseInt(matches[23]),
                minutes: parseInt(matches[24]),
            },
            originalValue: input
        } as DateParseResponse;
    }
}