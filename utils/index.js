export const requiredFields = {
  name: "Name is required",
  description: "Description is required",
  casts: "Casts is required",
  trailerUrl: "Trailer URL is required",
  lang: "Language is required",
  releaseDate: "Release date is required",
  director: "Director is required",
  releaseStatus: "Release status is required",
};

export const requiredFieldsForTheatre = {
  name: "Name is required",
  city: "City is required",
  pincode: "Pincode is required",
};

export const requiredFieldsForUser = {
  name: "Name is required",
  email: "Email is required",
  password: "Password is required",
};

export const requiredFieldsForUserSignIn = {
  email: "Email is required",
  password: "Password is required",
};

export const requiredFieldsForResetPassword = {
  oldPassword: "Old Password is required",
  newPassword: "New Password is required",
};

export const requiredFieldsForCreateBooking = {
  theatreId: "Theatre Id is required",
  movieId: "Movie Id is required",
  timing: "Movie Timing is required",
  noOfSeats: "No of Seats is required",
};
