import AdminDemo from '@/components/admin-demo';

export const metadata = { title: 'Administración | Demo local', robots: { index: false, follow: false } };

export default function AdministrationPage() {
  return <div className="admin-page"><AdminDemo /></div>;
}
