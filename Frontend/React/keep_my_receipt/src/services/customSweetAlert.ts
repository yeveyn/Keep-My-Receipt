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

export const ConfirmSwal = (title: string) =>
  Swal.fire({
    title: title,
    icon: 'warning',
    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '확인', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
    reverseButtons: false, // 버튼 순서 거꾸로
  });
