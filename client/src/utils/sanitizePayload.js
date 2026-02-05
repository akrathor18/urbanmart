export const deepSanitizePayload = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepSanitizePayload);
  }

  if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (value === "" || value === null) return [key, null];
        return [key, deepSanitizePayload(undefined)];
      })
    );
  }

  return obj;
};
