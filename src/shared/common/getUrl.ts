import { apiVersion, serverHost, serverPort } from 'shared/api/config';

export function getUrl(route: string) {
	return `http://${serverHost}:${serverPort}/api/${apiVersion}/${route}`;
}
