const baseClass = "h-5 w-5";

const Icon = ({ children, className = "", strokeWidth = 1.8, viewBox = "0 0 24 24" }) => (
  <svg
    aria-hidden="true"
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${baseClass} ${className}`.trim()}
  >
    {children}
  </svg>
);

export const BagIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M7 9h10l-.8 9.5a2 2 0 0 1-2 1.8H9.8a2 2 0 0 1-2-1.8L7 9Z" />
    <path d="M9.5 9V7.8a2.5 2.5 0 1 1 5 0V9" />
    <path d="M9.5 12.5a2.5 2.5 0 0 0 5 0" />
  </Icon>
);

export const MinusIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 12h14" />
  </Icon>
);

export const PlusIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

export const TrashIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 7h16" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  </Icon>
);

export const CrownIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 18 6.5 8l5.5 5 5.5-5L20 18H4Z" />
    <path d="M6 18h12" />
  </Icon>
);

export const DiamondIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m12 3 7 8-7 10L5 11l7-8Z" />
    <path d="M8 8h8" />
  </Icon>
);

export const SparklesIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
    <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    <path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" />
  </Icon>
);

export const ArrowRightIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);

export const CheckIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m5 13 4 4L19 7" />
  </Icon>
);

export const SearchIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.35-4.35" />
  </Icon>
);

export const ChevronDownIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m7 10 5 5 5-5" />
  </Icon>
);

export const UserCircleIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
  </Icon>
);

export const MailIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 7h16v10H4z" />
    <path d="m5 8 7 5 7-5" />
  </Icon>
);

export const ShieldIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12 3 5.5 6v5c0 4.2 2.6 7.4 6.5 10 3.9-2.6 6.5-5.8 6.5-10V6L12 3Z" />
    <path d="m9.5 12 1.8 1.8 3.2-3.6" />
  </Icon>
);

export const SparklineIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 16h3l2.2-6 3.3 8 2.2-5H20" />
  </Icon>
);

export const PackageIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12 3 4.5 7 12 11 19.5 7 12 3Z" />
    <path d="M4.5 7v10L12 21l7.5-4V7" />
    <path d="M12 11v10" />
  </Icon>
);

export const PencilSquareIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 20h4l10-10-4-4L4 16v4Z" />
    <path d="m12.5 7.5 4 4" />
  </Icon>
);

export const LayoutGridIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 4h7v7H4z" />
    <path d="M13 4h7v7h-7z" />
    <path d="M4 13h7v7H4z" />
    <path d="M13 13h7v7h-7z" />
  </Icon>
);

export const ClipboardListIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M9 4h6" />
    <path d="M9 4a2 2 0 0 0-2 2v1h10V6a2 2 0 0 0-2-2" />
    <path d="M7 7H5v13h14V7h-2" />
    <path d="M9 11h6" />
    <path d="M9 15h6" />
    <path d="M9 19h4" />
  </Icon>
);

export const MapPinIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12 21c4-5 6-8.4 6-11a6 6 0 1 0-12 0c0 2.6 2 6 6 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const TruckIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M3 7h11v8H3z" />
    <path d="M14 10h3l2 2v3h-5" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="17.5" cy="17.5" r="1.5" />
  </Icon>
);

export const StoreIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 9h16" />
    <path d="M5 9V7l2-3h10l2 3v2" />
    <path d="M6 9v10h12V9" />
    <path d="M10 19v-4h4v4" />
  </Icon>
);

export const UsersIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="9" cy="9" r="3" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M4 19a5 5 0 0 1 10 0" />
    <path d="M14.5 18a4 4 0 0 1 5.5-3.7" />
  </Icon>
);

export const PhoneIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M7.5 4.5h3l1 3-1.8 1.8a14 14 0 0 0 5.1 5.1l1.8-1.8 3 1v3c0 1-.8 1.8-1.8 1.8C10 19.4 4.6 14 4.6 7.3c0-1 .8-1.8 1.8-1.8Z" />
  </Icon>
);

export const ClockIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 2.5" />
  </Icon>
);

export const HeadsetIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 13a7 7 0 0 1 14 0" />
    <path d="M5 13v3a2 2 0 0 0 2 2h1v-6H7a2 2 0 0 0-2 2Z" />
    <path d="M19 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
    <path d="M12 19h2" />
  </Icon>
);

export const MessageSquareIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 6h14v9H9l-4 4V6Z" />
  </Icon>
);

export const EyeIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </Icon>
);

export const EyeOffIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M3.5 3.5 20.5 20.5" />
    <path d="M10.7 6.1A10.4 10.4 0 0 1 12 6c6 0 9.5 6 9.5 6a16.7 16.7 0 0 1-3.4 4.1" />
    <path d="M6.1 6.8C3.9 8.4 2.5 12 2.5 12s3.5 6 9.5 6c1.4 0 2.6-.3 3.7-.8" />
    <path d="M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9" />
  </Icon>
);

export const SunIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5" />
    <path d="M12 19v2.5" />
    <path d="m4.9 4.9 1.8 1.8" />
    <path d="m17.3 17.3 1.8 1.8" />
    <path d="M2.5 12H5" />
    <path d="M19 12h2.5" />
    <path d="m4.9 19.1 1.8-1.8" />
    <path d="m17.3 6.7 1.8-1.8" />
  </Icon>
);

export const MoonIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M18.5 14.8A7.5 7.5 0 0 1 9.2 5.5 8.5 8.5 0 1 0 18.5 14.8Z" />
  </Icon>
);

export const MenuIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Icon>
);

export const XIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m6 6 12 12" />
    <path d="M18 6 6 18" />
  </Icon>
);
