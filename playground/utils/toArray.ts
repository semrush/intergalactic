import type { ControlValue } from '../types/Controls';

const toArray = (input: ControlValue | ControlValue[]) => (Array.isArray(input) ? input : [input]);

export default toArray;
