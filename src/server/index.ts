import { createServer } from 'node:http';
import { Socket } from 'node:net';
import { wispurr } from 'wispurr';
import { config, serverPort, serverUrl } from '../config.ts';
import { entryPointFile } from '../constants.ts';
import { createSiteHandler } from './handler.ts';
import {
	wispPath,
	wispOptions,
	wispProxies,
	wispRegion,
	type WispRegion,
} from './wisp.ts';

const wisps = new Map<string, wispurr>([
	['', new wispurr(wispOptions)],
	...(Object.keys(wispProxies) as WispRegion[]).map(
		(region) =>
			[
				region,
				new wispurr({ ...wispOptions, proxy: wispProxies[region] }),
			] as const
	),
]);

// AUTOMATIC BACKGROUND RETRY TUNNEL MANAGER:
// Continuously attempts to safely mount proxy threads without crashing Node
(async () => {
	let enginePrimed = false;
	let attempts = 0;
	
	console.log('[Wispurr]: Background networking daemon initialization begun.');
	
	while (!enginePrimed && attempts < 30) {
		attempts++;
		try {
			// Attempting worker instantiation loop across background proxies
			await Promise.all([...wisps.values()].map((wisp) => wisp.start(1)));
			enginePrimed = true;
			console.log('[Wispurr]: Network engine successfully primed and handling circuit pathways!');
		} catch (err) {
			console.log(`[Wispurr Loop]: Waiting for stable Tor consensus circuits... (Attempt ${attempts}/30)`);
			// Delay for 4 seconds before re-probing the network loopbacks
			await new Promise((resolve) => setTimeout(resolve, 4000));
		}
	}
	
	if (!enginePrimed) {
		console.error('[Wispurr Error]: Background tunnel manager timed out. Manual redeploy recommended.');
	}
})();

const server = createServer(createSiteHandler()).on(
	'upgrade',
	(req, socket, head) => {
		const region = wispRegion(req.url);
		const targetWisp = region !== null ? wisps.get(region) : null;
		
		// Safety check: ensure our proxy thread has successfully initialized before routing frames
		if (socket instanceof Socket && region !== null && targetWisp && targetWisp.isRunning) {
			req.url = wispPath();
			targetWisp.route(req, socket, head);
		} else {
			console.warn('[Proxy Warning]: Data frames dropped - background network circuit stabilizing.');
			socket.destroy();
		}
	}
);

let shuttingDown = false;
const stopServer = async () => {
	if (shuttingDown) return;
	shuttingDown = true;
	await Promise.all([...wisps.values()].map((wisp) => wisp.stop()));
	server.closeAllConnections();
	server.close();
};

process.once('SIGTERM', () => void stopServer());
process.once('SIGINT', () => void stopServer());
process.once('exit', () => {
	for (const wisp of wisps.values()) if (wisp.isRunning) wisp.kill();
});

// Clean server listener binding directly to the port
server.listen(serverPort, () => {
	process.send?.({ type: 'ready' });
	console.log(`HummingEngine is successfully listening on port ${serverPort}.`);
	console.log(
		'When hosting with a reverse proxy please ensure you are using NGINX only.\nCaddy and Apache have security risks due to wispurr and loopbacks. Please configure them correctly.\nNGINX is recommended and used for production. Ports are whitelisted and security is maintained with NGINX only.'
	);
	if (config.disguiseFiles)
		console.log(
			`disguiseFiles is enabled. The site root now serves the entry point (views/dist/${entryPointFile}), which unlocks the page loader.`
		);
});
