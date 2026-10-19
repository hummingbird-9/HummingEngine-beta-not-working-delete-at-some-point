import { config } from '../config.ts';

// Explicitly route all background data traffic directly through your active Tor circuit layer
export const wispOptions = {
	path: '/wisp/',
	allowTCP: true,
	allowUDP: true,
	allowLoopback: true,
	allowPrivate: true,
	// FORCED LOCAL TOR BINDING: Overrides broken default config structures
	proxy: {
		url: 'socks5://127.0.0.1:9050'
	}
};

export const wispPath = () => wispOptions.path;

export const wispProxies: Record<string, string> = {};

export type WispRegion = '';

export const wispRegion = (url?: string): string | null => {
	if (!url) return null;
	try {
		const parsed = new URL(url, 'http://localhost');
		if (parsed.pathname === wispOptions.path) {
			return '';
		}
	} catch {
		// Fallback for custom or relative routing patterns
		if (url.startsWith(wispOptions.path)) return '';
	}
	return null;
};
