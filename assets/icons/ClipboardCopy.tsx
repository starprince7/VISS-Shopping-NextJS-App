import React, { FC } from 'react';

interface IClipboardCopyprops {
  className?: string
}
const ClipboardCopy: FC<IClipboardCopyprops> = (props) => (
  <svg
    {...props}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3C5 3.79565 5.31607 4.55871 5.87868 5.12132C6.44129 5.68393 7.20435 6 8 6H10C10.7956 6 11.5587 5.68393 12.1213 5.12132C12.6839 4.55871 13 3.79565 13 3C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V11H10.414L11.707 9.707C11.8892 9.5184 11.99 9.2658 11.9877 9.0036C11.9854 8.7414 11.8802 8.49059 11.6948 8.30518C11.5094 8.11977 11.2586 8.0146 10.9964 8.01233C10.7342 8.01005 10.4816 8.11084 10.293 8.293L7.293 11.293C7.10553 11.4805 7.00021 11.7348 7.00021 12C7.00021 12.2652 7.10553 12.5195 7.293 12.707L10.293 15.707C10.4816 15.8892 10.7342 15.99 10.9964 15.9877C11.2586 15.9854 11.5094 15.8802 11.6948 15.6948C11.8802 15.5094 11.9854 15.2586 11.9877 14.9964C11.99 14.7342 11.8892 14.4816 11.707 14.293L10.414 13H15V16C15 16.5304 14.7893 17.0391 14.4142 17.4142C14.0391 17.7893 13.5304 18 13 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V5ZM15 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13H15V11Z"
      fill="#9C9C9C"
    />
  </svg>
);
ClipboardCopy.defaultProps = {
  className: '',
};
export default ClipboardCopy;
