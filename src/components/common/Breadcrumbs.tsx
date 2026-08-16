import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
      <Link to="/" className="flex items-center gap-1 hover:text-primary dark:hover:text-primary-light">
        <FaHome size={13} />
        <span>Inicio</span>
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          <FaChevronRight size={10} className="opacity-50" />
          {item.to ? (
            <Link to={item.to} className="hover:text-primary dark:hover:text-primary-light">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-text-primary dark:text-text-primary-dark">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
