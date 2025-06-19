

export function convertToSerializableObject(leanDocument){


    for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];

    if (value && typeof value === 'object' && value.toJSON && value.toString) {
      leanDocument[key] = value.toString();
    }
  }

    return leanDocument;
}