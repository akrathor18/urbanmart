// Validation schemas and helper functions
export const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
  confirmPassword: (password) => ({
    required: "Please confirm your password",
    validate: (value) => value === password || "Passwords do not match",
  }),
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "First name can only contain letters and spaces",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Last name can only contain letters and spaces",
    },
  },
  phone: {
    required: "phone is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Please enter a valid 10-digit Indian mobile number",
    },
  },
  address: {
    required: "Address is required",
    minLength: {
      value: 10,
      message: "Address must be at least 10 characters long",
    },
  },
  city: {
    required: "City is required",
    minLength: {
      value: 2,
      message: "City name must be at least 2 characters",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "City name can only contain letters and spaces",
    },
  },
  state: {
    required: "State is required",
    minLength: {
      value: 2,
      message: "State name must be at least 2 characters",
    },
  },
  zipCode: {
    required: "PIN Code is required",
    pattern: {
      value: /^[1-9][0-9]{5}$/,
      message: "Please enter a valid 6-digit PIN code",
    },
  },
};
