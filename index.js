const HolderChargeEventHandler = (event) => {
    let value = event.target.value;
    let batteryValue = new Uint8Array(value.buffer.slice(-1))[0];
    if (value.buffer.byteLength == 7) {
        return batteryValue;
    } else {
        return -1;
    }
}
export default HolderChargeEventHandler;