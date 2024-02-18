export function formatToCurrency(amount: number, currency: "USD" | "NGN") {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}