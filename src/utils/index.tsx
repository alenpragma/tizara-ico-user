import Swal from 'sweetalert2';

export const copyToClipboard = (textToCopy: any) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Copied',
        showConfirmButton: false,
        timer: 1000,
        heightAuto: false, // Disable automatic height adjustment
        customClass: {
          popup: 'small-swal-popup', // Custom class to modify the height
        },
      });

      // ('Text copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};

export const sliceHash = (address: any) => {
  const firstSix = address.slice(0, 6);
  const lastSix = address.slice(-6);
  const result = `${firstSix}...${lastSix}`;
  return result;
};
