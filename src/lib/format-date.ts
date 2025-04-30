export type DateInput = string | Date | number;

export function formatDate(input: DateInput, format: 'shortDate' | 'shortDateTime' = 'shortDate', locale: string = 'id-ID'): string {
    const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input;

    const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
        shortDate: {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        },
        shortDateTime: {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        },
    };

    return new Intl.DateTimeFormat(locale, optionsMap[format]).format(date);
}
