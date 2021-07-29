import root from './root';
import messageRoutesV1 from './v1/messages';
import messageRoutesV2 from './v2/messages';

export default root;
export const routesV1 = [
  messageRoutesV1,
];

export const routesV2 = [
  messageRoutesV2,
];