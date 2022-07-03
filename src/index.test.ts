import { describe, it, expect } from 'vitest';
import { DateTimeParser } from './DateTimeParser';
import { DateTimeParseError } from './IDateTimeOperable';

describe('your-date-js tests', () => {
    describe('parsing', ()=> {
        const parser = new DateTimeParser();
        describe('invalid strings parse to undefined', ()=> {
            [null, undefined, '', '  ', 'invalid string'].forEach(() => {
                it ('should parse invalid string to invalid date', () => {
                    const parsedDate = parser.parse('');
                    expect(parsedDate).toBe(DateTimeParseError.InvalidDateTimeString);
                });
            })
        });

        it ('should parse yyyy to date with only year', () => {
            const input = '2012';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(2012);
        });
        it ('should parse yyyy-mm to date with year and month', () => {
            const input = '2014-05';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(2014);
            expect(parsedDate.month).toBe(5);
        });
        it ('should parse yyyy-mm-dd to date with year, month and day', () => {
            const input = '1995-09-03';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
        });
        it ('should parse yyyy-mm-ddTHH to date with year, month, day', () => {
            const input = '1995-09-03';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
        });
        it ('should parse yyyy-mm-ddTHH to date with year, month, day and hour', () => {
            const input = '1995-09-03T16';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
        });
        it ('should parse yyyy-mm-ddTHH:MM to date with year, month, day, hour and minutes', () => {
            const input = '1995-09-03T16:55';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
        });
        it ('should parse yyyy-mm-ddTHH:MM:SS to date with year, month, day, hour, minutes and seconds', 
            () => {
            const input = '1995-09-03T16:55:33';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
            expect(parsedDate.seconds).toBe(33);
        });
        it (`should parse yyyy-mm-ddTHH:MM:SS+0h to date with year, month, day, hour, minutes and seconds
            and timezone with hour`, 
            () => {
            const input = '1995-09-03T16:55:33+03';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
            expect(parsedDate.seconds).toBe(33);
            expect(parsedDate.timezone.hour).toBe(3);
        });
        it (`should parse yyyy-mm-ddTHH:MM:SS+hh to date with year, month, day, hour, minutes and seconds
        and timezone with hour`, 
            () => {
            const input = '1995-09-03T16:55:33+14';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
            expect(parsedDate.seconds).toBe(33);
            expect(parsedDate.timezone.hour).toBe(14);
        });
        it (`should parse yyyy-mm-ddTHH:MM:SS+hh:mm to date with year, month, day, hour, minutes and seconds
        and timezone with hour and minutes`, 
            () => {
            const input = '1995-09-03T16:55:33+14:27';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
            expect(parsedDate.seconds).toBe(33);
            expect(parsedDate.timezone.hour).toBe(14);
            expect(parsedDate.timezone.minutes).toBe(27);
        });
        it (`should parse yyyy-mm-ddTHH:MM:SS-0h:mm to date with year, month, day, hour, minutes and seconds
        and timezone with hour and minutes`, 
            () => {
            const input = '1995-09-03T16:55:33-08';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
            expect(parsedDate.seconds).toBe(33);
            expect(parsedDate.timezone.hour).toBe(8);
        });
    });
});