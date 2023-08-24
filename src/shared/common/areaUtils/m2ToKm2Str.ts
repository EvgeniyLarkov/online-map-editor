import { getAreaKm2 } from './getAreaKm2';
import { mToKm2 } from './mToKm2';

export function m2ToKm2Str(m: number) {
	return getAreaKm2(mToKm2(m));
}
