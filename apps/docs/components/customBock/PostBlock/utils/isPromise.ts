export default function isPromise(object: Promise<object>) {
  return object && typeof object.then === "function";
}
