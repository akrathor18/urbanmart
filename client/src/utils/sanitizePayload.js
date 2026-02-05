export const deepSanitizePayload = (value) => {
  // convert empty or null to undefined
  if (value === "" || value === null) {
    return undefined;
  }

  // handle arrays
  if (Array.isArray(value)) {
    return value.map(deepSanitizePayload);
  }

  // handle objects
  if (typeof value === "object" && value !== undefined) {
    const result = {};

    for (const key in value) {
      const sanitized = deepSanitizePayload(value[key]);

      // 👇 KEEP the key, just change the value
      result[key] = sanitized;
    }

    return result;
  }

  // primitives (string, number, boolean)
  return value;
};
