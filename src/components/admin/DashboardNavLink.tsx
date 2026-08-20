import Link from 'next/link'

export default function DashboardNavLink() {
  return (
    <Link href="/admin" className="nav__link nusra-admin-dashboard-link">
      <span aria-hidden="true" className="nusra-admin-dashboard-link__icon">⌂</span>
      <span>Dashboard</span>
    </Link>
  )
}
