import Swal from 'sweetalert2';

export const WarningToast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  icon: 'warning',
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
