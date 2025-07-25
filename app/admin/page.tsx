'use client';

import dynamic from 'next/dynamic';

const AdminControls = dynamic(() => import('./AdminControls'), { ssr: false });

export default function AdminPage() {
  return (
    <div className="max-w-xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-300">🛠 Admin Panel</h1>
      <AdminControls />
    </div>
  );
}
