import React from "react";
interface IDynamicGaugeSVGProps {
  colorCode: string;
  value: number;
}
const GaugeComponent7 = (props: IDynamicGaugeSVGProps) => {
  const { colorCode, value } = props;
  return (
    <svg
    width="100%"
      height="200"
      viewBox="0 0 201 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0273 128.584C8.08787 129.864 3.82738 127.713 2.84616 123.688C-0.195753 111.213 -0.806287 98.2663 1.04806 85.5598C1.64621 81.461 5.68532 78.9182 9.7277 79.8218C13.7701 80.7253 16.2796 84.7337 15.7358 88.84C14.402 98.9106 14.8844 109.14 17.16 119.04C18.0879 123.077 15.9667 127.304 12.0273 128.584Z"
        fill={`${value >= 1 ? colorCode : "black"}`}
        fill-opacity={`${value >= 1 ? "0.9" : "0.1"}`}
      />
      <path
        d="M166.9 36.1206C169.896 33.2601 174.668 33.3531 177.296 36.5548C185.443 46.4806 191.603 57.884 195.438 70.1394C196.675 74.0925 194.136 78.1344 190.101 79.0716C186.067 80.0088 182.068 77.4835 180.779 73.5471C177.618 63.8929 172.75 54.8827 166.41 46.9459C163.824 43.7097 163.905 38.9811 166.9 36.1206Z"
        fill={`${value >= 2 ? colorCode : "black"}`}
        fill-opacity={`${value >= 2 ? "0.9" : "0.1"}`}
      />
      <path
        d="M190.232 79.6413C194.272 78.7297 198.317 81.2645 198.923 85.362C200.803 98.0648 200.218 111.012 197.201 123.494C196.228 127.52 191.972 129.68 188.03 128.408C184.088 127.136 181.958 122.913 182.878 118.875C185.134 108.97 185.596 98.7395 184.242 88.6716C183.69 84.5664 186.191 80.553 190.232 79.6413Z"
        fill={`${value >= 3 ? colorCode : "black"}`}
        fill-opacity={`${value >= 3 ? "0.9" : "0.1"}`}
      />
      <path
        d="M9.83135 79.3635C5.79361 78.4394 3.24208 74.4058 4.46612 70.4486C8.26081 58.1809 14.3836 46.7576 22.4986 36.8056C25.1162 33.5954 29.8878 33.4869 32.8929 36.3377C35.8979 39.1885 35.9935 43.9167 33.4186 47.1613C27.1037 55.1186 22.2659 64.1445 19.1357 73.8088C17.8594 77.7494 13.8691 80.2876 9.83135 79.3635Z"
        fill={`${value >= 4 ? colorCode : "black"}`}
        fill-opacity={`${value >= 4 ? "0.9" : "0.1"}`}
      />
      <path
        d="M33.1073 36.1125C30.1118 33.2516 29.9849 28.4804 33.0622 25.7077C42.6022 17.1121 53.7099 10.4336 65.7756 6.03884C69.6676 4.62124 73.8221 6.97085 74.9441 10.9581C76.0661 14.9454 73.7277 19.056 69.8548 20.525C60.3565 24.1277 51.58 29.4046 43.9436 36.1041C40.8299 38.8358 36.1027 38.9734 33.1073 36.1125Z"
        fill={`${value >= 5 ? colorCode : "black"}`}
        fill-opacity={`${value >= 5 ? "0.9" : "0.1"}`}
      />
      <path
        d="M75.4858 11.0884C74.3433 7.10694 76.6413 2.92367 80.6972 2.08268C93.2708 -0.524487 106.231 -0.68542 118.865 1.60871C122.941 2.34873 125.342 6.47364 124.298 10.4822C123.255 14.4908 119.162 16.8598 115.077 16.1738C105.059 14.4913 94.819 14.6185 84.8456 16.5492C80.779 17.3364 76.6283 15.0698 75.4858 11.0884Z"
        fill={`${value >= 6 ? colorCode : "black"}`}
        fill-opacity={`${value >= 6 ? "0.9" : "0.1"}`}
      />
      <path
        d="M124.668 10.8499C125.773 6.85779 129.917 4.49012 133.815 5.89077C145.9 10.233 157.036 16.863 166.614 25.417C169.703 28.1763 169.597 32.948 166.614 35.8219C163.631 38.6958 158.903 38.5788 155.778 35.8606C148.112 29.1945 139.313 23.9559 129.799 20.3946C125.92 18.9424 123.563 14.842 124.668 10.8499Z"
        fill={`${value === 7 ? colorCode : "black"}`}
        fill-opacity={`${value === 8 ? "0.9" : "0.1"}`}
      />
    </svg>
  );
};

export default GaugeComponent7;
