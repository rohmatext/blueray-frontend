export function formatCurrency(price: number | string): string | null {
    if (!price) return null;

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(Number(price));
}
