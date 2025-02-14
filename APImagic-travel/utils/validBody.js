export const validBody = (
    attributes, 
    body, 
    skipFields = [],
  ) => {
    let isValidBody = true;
    Object.entries(attributes).forEach(([key, value,]) => {
      if (skipFields.includes(key)) return;
  
      if (!value?.allowNull && !body[key]) {
        isValidBody = false;
      } else {
        isValidBody = true;
      }
    });
  
    return isValidBody;
  }