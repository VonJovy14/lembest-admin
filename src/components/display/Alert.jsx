import Swal from "sweetalert2";

export const confirmDialog = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  icon = "warning",
  showCancelButton = true,
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
  confirmButtonText = "Yes, delete it!",
  denyButtonText = "Dont save",
  showDenyButton = false,
}) => {
  return await Swal.fire({
    title,
    text,
    icon,
    showDenyButton,
    confirmButtonText,
    denyButtonText,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
  });
};

export const autoCloseAlert = async ({
  title = "Success!",
  text = "Your data has been save.",
  timer = 1500,
  icon = "success",
}) => {
  const result = await Swal.fire({
    title,
    text,
    timer,
    icon,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  return result;
};
