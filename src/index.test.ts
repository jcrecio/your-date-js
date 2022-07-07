import { describe, it, expect } from 'vitest';
import _ from 'lodash';
import { DateTimeParser } from './DateTimeParser';
import { DateTimeParseError } from './IDateTimeOperable';
import { DateTimeBuilder } from './DateTimeBuilder';

describe('your-date-js tests', () => {
    describe('parsing', ()=> {
        const parser = new DateTimeParser();
        describe('invalid strings parse to undefined', ()=> {
            [null, undefined, '', '  ', 'invalid string', '1995-09-03T16:55:99',
            '1995-14-14T16:55:00', '2020-99-99T16:55:00'].forEach(() => {
                it ('should parse invalid string to invalid date', () => {
                    const parsedDate = parser.parse('');
                    expect(parsedDate.error).toBe(DateTimeParseError.InvalidDateTimeString);
                });
            })
        });

        it ('should parse yyyy to date with only year', () => {
            const input = '2012';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(2012);
            expect(parsedDate.originalValue).toBe('2012');
        });
        it ('should parse yyyy-mm to date with year and month', () => {
            const input = '2014-05';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(2014);
            expect(parsedDate.month).toBe(5);
            expect(parsedDate.originalValue).toBe(input);
        });
        it ('should parse yyyy-mm-dd to date with year, month and day', () => {
            const input = '1995-09-03';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.originalValue).toBe(input);
        });
        it ('should parse yyyy-mm-ddTHH to date with year, month, day', () => {
            const input = '1995-09-03';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.originalValue).toBe(input);
        });
        it ('should parse yyyy-mm-ddTHH to date with year, month, day and hour', () => {
            const input = '1995-09-03T16';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.originalValue).toBe(input);
        });
        it ('should parse yyyy-mm-ddTHH:MM to date with year, month, day, hour and minutes', () => {
            const input = '1995-09-03T16:55';
            const parsedDate = parser.parse(input);
            expect(parsedDate.year).toBe(1995);
            expect(parsedDate.month).toBe(9);
            expect(parsedDate.day).toBe(3);
            expect(parsedDate.hour).toBe(16);
            expect(parsedDate.minutes).toBe(55);
            expect(parsedDate.originalValue).toBe(input);
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
            expect(parsedDate.originalValue).toBe(input);
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
            expect(parsedDate.originalValue).toBe(input);
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
            expect(parsedDate.originalValue).toBe(input);
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
            expect(parsedDate.originalValue).toBe(input);
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
            expect(parsedDate.originalValue).toBe(input);
        });
    });
    describe('add date objects', () => {
        _.range(-10,10,1).map((r: number) => {
            it(`adds ${r} years to an empty date`, () => {
                const dateTimeBuilder = new DateTimeBuilder();

                const date1 = dateTimeBuilder.setYear(r).build();
                const date2 = dateTimeBuilder.build();
                
                expect(date1.add(date2).year).toBe(r);
            });
        });
        _.range(-10,10,1).map((r: number) => {
            it(`adds ${r} months to an empty date`, () => {
                const dateTimeBuilder = new DateTimeBuilder();

                const date1 = dateTimeBuilder.setMonth(r).build();
                const date2 = dateTimeBuilder.build();
                
                expect(date1.add(date2).month).toBe(r);
            });
        });
        _.range(-10,10,1).map((r: number) => {
            it(`adds ${r} days to an empty date`, () => {
                const dateTimeBuilder = new DateTimeBuilder();

                const date1 = dateTimeBuilder.setDay(r).build();
                const date2 = dateTimeBuilder.build();
                
                expect(date1.add(date2).day).toBe(r);
            });
        });
        _.range(-10,10,1).map((r: number) => {
            it(`adds ${r} hours to an empty date`, () => {
                const dateTimeBuilder = new DateTimeBuilder();

                const date1 = dateTimeBuilder.setHour(r).build();
                const date2 = dateTimeBuilder.build();
                
                expect(date1.add(date2).hour).toBe(r);
            });
        });
        _.range(-10,10,1).map((r: number) => {
            it(`adds ${r} minutes to an empty date`, () => {
                const dateTimeBuilder = new DateTimeBuilder();

                const date1 = dateTimeBuilder.setMinutes(r).build();
                const date2 = dateTimeBuilder.build();
                
                expect(date1.add(date2).minutes).toBe(r);
            });
        });
        
        _.range(-10,10,1).map((r: number) => {
            it(`adds ${r} seconds to an empty date`, () => {
                const dateTimeBuilder = new DateTimeBuilder();

                const date1 = dateTimeBuilder.setSeconds(r).build();
                const date2 = dateTimeBuilder.build();
                
                expect(date1.add(date2).seconds).toBe(r);
            });
        });
    });
    describe('substract date objects', () => {
        _.range(-10,-9,1).map((r: number) => {
            it('should substract', () => {
                const dateTimeBuilder = new DateTimeBuilder();
                const date1 = dateTimeBuilder
                    .setYear(r*2)
                    .setMonth(r*4)
                    .setDay(r*6)
                    .setHour(r+2)
                    .setMinutes(r+3)
                    .setSeconds(r+4)
                    .build();
                const date2 = dateTimeBuilder
                    .setYear(r)
                    .setMonth(r*2)
                    .setDay(r*3)
                    .setHour(r+1)
                    .setMinutes(r+2)
                    .setSeconds(r+3).build();

                const actual = date1.substract(date2);
                expect(actual.year).toBe(r);
                expect(actual.month).toBe(r*2);
                expect(actual.day).toBe(r*3);
                expect(actual.hour).toBe(1);
                expect(actual.minutes).toBe(1);
                expect(actual.seconds).toBe(1);
            });
        });
    });
});