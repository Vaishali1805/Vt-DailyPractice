import NodeCache from "node-cache";
const myCache = new NodeCache({stdTTL: 300});       //5 minutes

export default myCache;
