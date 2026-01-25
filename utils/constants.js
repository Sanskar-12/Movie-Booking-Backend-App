export const USER_ROLE = {
  admin: "ADMIN",
  client: "CLIENT",
  customer: "CUSTOMER",
};

export const USER_STATUS = {
  approved: "APPROVED",
  pending: "PENDING",
  rejected: "REJECTED",
};

export const STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORISED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
};

export const BOOKING_STATUS = {
  cancelled: "CANCELLED",
  successful: "SUCCESSFUL",
  processing: "IN_PROCESS",
  expired: "EXPIRED",
};

export const PAYMENT_STATUS = {
  success: "SUCCESS",
  failed: "FAILED",
  pending: "PENDING",
};
