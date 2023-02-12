/**
 * DataBit interface
 * This interface is used to abstract the way a bit is stored in a chunk and is automatically
 * created by each DataStorage provider.
 */
export interface DataBit {
  setBit(bitValue: boolean);
  getBit(): boolean;
}
