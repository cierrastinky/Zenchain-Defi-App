export function formatBalance(balance: number): string {
    return balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }) + ' ZTC';
}

export function formatAddress(address: string): string {
    if (address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
}

export function formatHash(hash: string): string {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}