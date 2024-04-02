import { FC, SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export const MenuClose: FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 13.653l-5.993 5.993a1.133 1.133 0 01-.826.354c-.315 0-.59-.118-.827-.354A1.133 1.133 0 014 18.819c0-.315.118-.59.354-.826L10.347 12 4.354 6.007A1.133 1.133 0 014 5.181c0-.315.118-.59.354-.827.236-.236.512-.354.827-.354.315 0 .59.118.826.354L12 10.347l5.993-5.993c.236-.236.511-.354.826-.354.315 0 .59.118.827.354.236.236.354.512.354.827 0 .315-.118.59-.354.826L13.653 12l5.993 5.993c.236.236.354.511.354.826 0 .315-.118.59-.354.827a1.133 1.133 0 01-.827.354c-.315 0-.59-.118-.826-.354L12 13.653z"
      ></path>
    </svg>
  );
};